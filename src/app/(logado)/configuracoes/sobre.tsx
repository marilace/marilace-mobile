import { 
    Linking, 
    Pressable, 
    ScrollView, 
    StyleSheet, 
    Text, 
    View 
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { CabecalhoTela } from '@/components/misc/CabecalhoTela'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'
import { IconBrandGithub, IconBrandInstagram, IconMail } from '@tabler/icons-react-native'
import { VERSAO_ATUAL } from '@/types/Versoes'

export default function ConfigSobre() {
    return (
        <SafeAreaView style={configStyles.tela}>
            <StatusBar style="dark" />
            <CabecalhoTela titulo="Sobre o sistema" />

            <ScrollView contentContainerStyle={configStyles.conteudo}>
                <Text style={styles.logo}>marilace</Text>

                <Text style={configStyles.categoria}>Informações do sistema</Text>

                <View style={styles.linhaInfo}>
                    <Text style={styles.label}>Desenvolvido por</Text>
                    <Text style={styles.valor}>Equipe MariLace</Text>
                </View>

                <View style={styles.linhaInfo}>
                    <Text style={styles.label}>Versão</Text>
                    <Text style={styles.valor}>{VERSAO_ATUAL.numero} "{VERSAO_ATUAL.codinome}"</Text>
                </View>

                <View style={styles.linhaInfo}>
                    <Text style={styles.label}>Última atualização</Text>
                    <Text style={styles.valor}>{VERSAO_ATUAL.data}</Text>
                </View>

                <Text style={configStyles.categoria}>Redes sociais</Text>

                <View style={styles.redes}>

                    <Pressable style={[styles.redeItem, styles.github]} onPress={() => Linking.openURL('https://github.com/marilace/marilace-mobile')}>
                        <IconBrandGithub size={16} color={Cores.preto} />
                        <Text style={styles.redeTexto}>GitHub</Text>
                    </Pressable>

                    <Pressable style={[styles.redeItem, styles.instagram]} onPress={() => Linking.openURL('https://www.instagram.com/projetomarilace/')}>
                        <IconBrandInstagram size={16} color={Cores.preto} />
                        <Text style={styles.redeTexto}>Instagram</Text>
                    </Pressable>

                    <Pressable style={[styles.redeItem, styles.email]} onPress={() => Linking.openURL('mailto:projetomarilace@gmail.com')}>
                        <IconMail size={16} color={Cores.preto} />
                        <Text style={styles.redeTexto}>E-mail</Text>
                    </Pressable>

                </View>

                <Text style={configStyles.categoria}>Documentos</Text>

                <Pressable style={styles.linkLegal}>
                    <FontAwesomeFreeSolid name="file-lines" size={16} color={Cores.primariaEscura} />
                    <Text style={styles.linkLegalTexto}>Termos de uso</Text>
                </Pressable>

                <Pressable style={styles.linkLegal}>
                    <FontAwesomeFreeSolid name="bullhorn" size={16} color={Cores.primariaEscura} />
                    <Text style={styles.linkLegalTexto}>Notas de versão</Text>
                </Pressable>

                <Text style={styles.copyright}>© 2026 MariLace Team. Todos os direitos reservados.</Text>

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
    logo: { 
        fontFamily: Fontes.logo, 
        fontSize: 28, 
        color: Cores.primaria, 
        textAlign: 'center', 
        marginBottom: 8 
    },
    linhaInfo: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingVertical: 8 
    },
    label: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP, 
        fontWeight: '600', 
        color: Cores.cinza 
    },
    valor: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP, 
        fontWeight: '600', 
        color: Cores.preto 
    },
    redes: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        gap: 12 
    },
    redeItem: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 8, 
        paddingVertical: 8, 
        paddingHorizontal: 16,
        borderRadius: 999, 
        borderWidth: 2, 
        borderColor: Cores.preto,
    },
    github: { 
        backgroundColor: Cores.primaria,
    }, 
    instagram: { 
        backgroundColor: Cores.rosa,
    }, 
    email: { 
        backgroundColor: Cores.verde, 
    },
    redeTexto: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP, 
        fontWeight: '600', 
        color: Cores.preto
    },
    linkLegal: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 8, paddingVertical: 10 
    },
    linkLegalTexto: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP, 
        fontWeight: '600', 
        color: Cores.primariaEscura 
    },
    copyright: {
        fontFamily: Fontes.base, 
        fontSize: 11, 
        color: Cores.cinza, 
        textAlign: 'center',
        marginTop: 32, 
        paddingTop: 16, 
        borderTopWidth: 1, 
        borderTopColor: Cores.cinza,
    },
})