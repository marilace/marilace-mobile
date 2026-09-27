import { 
    Pressable, 
    ScrollView, 
    StyleSheet, 
    Text, 
    View 
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { CabecalhoTela } from '@/components/misc/CabecalhoTela'
import { ItemConfiguracao } from '@/components/misc/ItemConfiguracao'
import { ToggleSwitch } from '@/components/buttons/ToggleSwitch'
import { useAcessibilidade, type TamanhoFonte } from '@/contexts/AcessibilidadeContexto'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'

const OPCOES_FONTE: { valor: TamanhoFonte; label: string }[] = [
    { valor: 'normal', label: 'Normal' },
    { valor: 'grande', label: 'Grande' },
    { valor: 'extra-grande', label: 'Extra grande' },
]

export default function ConfigAcessibilidade() {
    const { tamanhoFonte, altoContraste, reduzirMovimento, modoEscuro, definirTamanhoFonte, alternar, restaurarPadrao } =
        useAcessibilidade()

    return (
        <SafeAreaView style={configStyles.tela}>
            <StatusBar style="dark" />
            <CabecalhoTela titulo="Acessibilidade" />

            <ScrollView contentContainerStyle={configStyles.conteudo}>
                <Text style={configStyles.categoria}>Aparência</Text>
                <ItemConfiguracao icone="moon" titulo="Modo escuro" descricao="Usa um tema com fundo escuro">
                    <ToggleSwitch ativo={modoEscuro} onChange={() => alternar('modoEscuro')} label="Ativar modo escuro" />
                </ItemConfiguracao>
                <ItemConfiguracao icone="circle-half-stroke" titulo="Alto contraste" descricao="Aumenta o contraste de cores">
                    <ToggleSwitch ativo={altoContraste} onChange={() => alternar('altoContraste')} label="Ativar alto contraste" />
                </ItemConfiguracao>

                <Text style={configStyles.categoria}>Leitura</Text>
                <View style={styles.linhaFonte}>
                    <View style={styles.iconWrapper}>
                        <FontAwesomeFreeSolid name="text-height" size={16} color={Cores.primaria} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.tituloLinha}>Tamanho do texto</Text>
                        <Text style={styles.descricaoLinha}>Aumenta o tamanho de todo o texto do app</Text>
                    </View>
                </View>
                <View style={styles.opcoesFonte}>
                    {OPCOES_FONTE.map(({ valor, label }) => (
                        <Pressable
                        key={valor}
                        onPress={() => definirTamanhoFonte(valor)}
                        style={[styles.opcaoFonte, tamanhoFonte === valor && styles.opcaoFonteAtiva]}
                        >
                            <Text style={[styles.letraA, tamanhoFonte === valor && styles.textoAtivo]}>A</Text>
                            <Text style={[styles.labelFonte, tamanhoFonte === valor && styles.textoAtivo]}>{label}</Text>
                        </Pressable>
                    ))}
                </View>

                <Text style={configStyles.categoria}>Movimento</Text>
                <ItemConfiguracao icone="rotate" titulo="Reduzir animações" descricao="Diminui movimentos e transições">
                    <ToggleSwitch ativo={reduzirMovimento} onChange={() => alternar('reduzirMovimento')} label="Reduzir animações" />
                </ItemConfiguracao>

                <Pressable style={styles.btnRestaurar} onPress={restaurarPadrao}>
                    <FontAwesomeFreeSolid name="arrows-rotate" size={14} color={Cores.primariaEscura} />
                    <Text style={configStyles.linkAcao}>Restaurar configurações padrão</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}

export const configStyles = StyleSheet.create({
    tela: { 
        flex: 1, 
        backgroundColor: Cores.branco 
    },
    conteudo: { 
        padding: 20, 
        paddingBottom: 40 
    },
    categoria: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        color: Cores.primaria,
        marginTop: 20,
        marginBottom: 4,
    },
    linkAcao: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        fontWeight: '700',
        color: Cores.primariaEscura,
    },
})

const styles = StyleSheet.create({
    iconWrapper: {
        width: 36, 
        height: 36, 
        borderRadius: 999, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'rgba(195,160,238,0.12)',
    },
    linhaFonte: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 12, 
        paddingVertical: 10 
    },
    tituloLinha: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.P, 
        fontWeight: '600', 
        color: Cores.preto 
    },
    descricaoLinha: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP, 
        color: Cores.cinza, 
        marginTop: 2 
    },
    opcoesFonte: { 
        flexDirection: 'row', 
        gap: 8, 
        marginTop: 8, 
        marginBottom: 12 
    },
    opcaoFonte: {
        flex: 1, 
        alignItems: 'center', 
        gap: 2, 
        paddingVertical: 10, 
        borderRadius: 16,
        borderWidth: 2, 
        borderColor: Cores.cinza,
    },
    opcaoFonteAtiva: { 
        borderColor: Cores.primaria, 
        backgroundColor: Cores.primaria 
    },
    letraA: { 
        fontFamily: Fontes.base, 
        fontWeight: '700', 
        color: Cores.preto 
    },
    labelFonte: { 
        fontFamily: Fontes.base, 
        fontSize: 11, 
        color: Cores.cinza 
    },
    textoAtivo: { 
        color: Cores.branco 
    },
    btnRestaurar: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 8, 
        marginTop: 24 
    },
})