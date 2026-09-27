import { 
    createContext, 
    useContext, 
    useEffect, 
    useState, 
    type ReactNode 
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type TamanhoFonte = 'normal' | 'grande' | 'extra-grande'

interface AcessibilidadeConfig {
    tamanhoFonte: TamanhoFonte
    altoContraste: boolean
    reduzirMovimento: boolean
    modoEscuro: boolean
}

type ChaveBooleana = Exclude<keyof AcessibilidadeConfig, 'tamanhoFonte'>

interface AcessibilidadeContextoTipo extends AcessibilidadeConfig {
    definirTamanhoFonte: (tamanho: TamanhoFonte) => void
    alternar: (chave: ChaveBooleana) => void
    restaurarPadrao: () => void
    escalarFonte: (base: number) => number
}

const CONFIG_PADRAO: AcessibilidadeConfig = {
    tamanhoFonte: 'normal',
    altoContraste: false,
    reduzirMovimento: false,
    modoEscuro: false,
}

const ESCALAS: Record<TamanhoFonte, number> = {
    normal: 1,
    grande: 1.125,
    'extra-grande': 1.25,
}

const CHAVE_STORAGE = '@marilace:acessibilidade'

const AcessibilidadeContexto = createContext<AcessibilidadeContextoTipo | undefined>(undefined)

export function AcessibilidadeProvider({ children }: { children: ReactNode }) {
    const [config, setConfig] = useState<AcessibilidadeConfig>(CONFIG_PADRAO)
    const [carregado, setCarregado] = useState(false)

    useEffect(() => {
        AsyncStorage.getItem(CHAVE_STORAGE)
            .then((salvo) => {
                if (salvo) setConfig({ ...CONFIG_PADRAO, ...JSON.parse(salvo) })
            })
            .catch(() => {})
            .finally(() => setCarregado(true))
    }, [])

    useEffect(() => {
        if (!carregado) return
        AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(config)).catch(() => {})
    }, [config, carregado])

    const definirTamanhoFonte = (tamanho: TamanhoFonte) =>
        setConfig((atual) => ({ ...atual, tamanhoFonte: tamanho }))

    const alternar = (chave: ChaveBooleana) =>
        setConfig((atual) => ({ ...atual, [chave]: !atual[chave] }))

    const restaurarPadrao = () => setConfig(CONFIG_PADRAO)

    const escalarFonte = (base: number) => Math.round(base * ESCALAS[config.tamanhoFonte])

    return (
        <AcessibilidadeContexto.Provider
            value={{ ...config, definirTamanhoFonte, alternar, restaurarPadrao, escalarFonte }}
        >
            {children}
        </AcessibilidadeContexto.Provider>
    )
}

export function useAcessibilidade() {
    const contexto = useContext(AcessibilidadeContexto)
    if (contexto === undefined) {
        throw new Error('useAcessibilidade precisa estar dentro de um <AcessibilidadeProvider>')
    }
    return contexto
}