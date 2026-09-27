import { useState } from 'react'
import { 
    Alert, 
    ScrollView, 
    StyleSheet, 
    Text, 
    View 
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { CabecalhoTela } from '@/components/misc/CabecalhoTela'
import { ItemConfiguracao } from '@/components/misc/ItemConfiguracao'
import { Botao } from '@/components/buttons/Botao'
import { useAutenticacao } from '@/hooks/useAutenticacao'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'

export default function ConfigConta() {
    const { usuario, deslogar, recuperarSenha } = useAutenticacao()
    const [enviandoSenha, setEnviandoSenha] = useState(false)

    const sair = async () => {
        await deslogar()
        router.replace('/')
    }

    const alterarSenha = async () => {
        if (!usuario?.email || enviandoSenha) return
        setEnviandoSenha(true)
        const resultado = await recuperarSenha(usuario.email)
        setEnviandoSenha(false)
        Alert.alert(
            resultado === 'Sucesso!' ? 'E-mail enviado' : 'Algo deu errado',
            resultado === 'Sucesso!' ? 'Link de redefinição enviado para o seu e-mail!' : resultado
        )
    }

    return (
        <SafeAreaView style={configStyles.tela}>
            <StatusBar style="dark" />
            <CabecalhoTela titulo="Conta" />

            <ScrollView contentContainerStyle={configStyles.conteudo}>
                <ItemConfiguracao icone="envelope" titulo="E-mail" descricao={usuario?.email || 'Não informado'}>
                    <Text style={configStyles.linkAcao}>Alterar</Text>
                </ItemConfiguracao>

                <ItemConfiguracao icone="lock" titulo="Senha" descricao="Mantenha uma senha forte e exclusiva">
                    <Text style={configStyles.linkAcao} onPress={alterarSenha}>
                        {enviandoSenha ? 'Enviando...' : 'Alterar'}
                    </Text>
                </ItemConfiguracao>

                <View style={styles.acoes}>
                    <Botao texto="Sair da conta" cor={Cores.rosa} onPress={sair} />
                    <Text
                    style={styles.excluir}
                    onPress={() =>
                        Alert.alert('Excluir conta', 'Essa função ainda não está disponível.')
                    }
                    >
                        Excluir conta
                    </Text>
                </View>
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
    acoes: { 
        marginTop: 32, 
        gap: 16, 
        alignItems: 'center' 
    },
    excluir: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP, 
        color: Cores.cinza, 
        fontWeight: '600' 
    },
})