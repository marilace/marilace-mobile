import { 
    FlatList, 
    Pressable, 
    StyleSheet, 
    Text, 
    View 
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { CabecalhoTela } from '@/components/misc/CabecalhoTela'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'

const SECOES = [
    { rota: 'acessibilidade', icone: 'universal-access', titulo: 'Acessibilidade', descricao: 'Personalize o MariLace do seu jeito' },
    { rota: 'conta', icone: 'user-gear', titulo: 'Conta', descricao: 'Dados de acesso e segurança' },
    { rota: 'notificacoes', icone: 'bell', titulo: 'Notificações', descricao: 'Como você quer ser avisada' },
    { rota: 'privacidade', icone: 'shield-halved', titulo: 'Privacidade', descricao: 'Quem pode ver suas informações' },
    { rota: 'sobre', icone: 'circle-info', titulo: 'Sobre o sistema', descricao: 'Versão, redes e documentos' },
] as const

export default function ConfiguracoesIndex() {
    return (
        <SafeAreaView style={styles.tela}>
            <StatusBar style="dark" />
            <CabecalhoTela titulo="Configurações" />

            <FlatList
            data={SECOES}
            keyExtractor={(item) => item.rota}
            contentContainerStyle={styles.lista}
            ItemSeparatorComponent={() => <View style={styles.separador} />}
            renderItem={({ item }) => (
                <Pressable
                style={styles.item}
                onPress={() => router.push(`/(logado)/configuracoes/${item.rota}`)}
                >
                    <View style={styles.iconWrapper}>
                        <FontAwesomeFreeSolid name={item.icone} size={18} color={Cores.branco} />
                    </View>
                    <View style={styles.textos}>
                        <Text style={styles.itemTitulo}>{item.titulo}</Text>
                        <Text style={styles.itemDescricao}>{item.descricao}</Text>
                    </View>
                    <FontAwesomeFreeSolid name="chevron-right" size={14} color={Cores.cinza} />
                </Pressable>
            )}
            />
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
    tela: { 
        flex: 1, 
        backgroundColor: Cores.branco 
    },
    lista: { 
        padding: 16 
    },
    separador: { 
        height: 8 
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 14,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'rgba(174,170,178,0.3)',
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Cores.primaria,
    },
    textos: { 
        flex: 1
    },
    itemTitulo: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.P, 
        fontWeight: '600', 
        color: Cores.preto 
    },
    itemDescricao: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP, 
        color: Cores.cinza, 
        marginTop: 2 
    },
})