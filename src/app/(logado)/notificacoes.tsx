import { useState } from 'react'
import { 
    ActivityIndicator, 
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
import { useNotificacoes } from '@/hooks/useNotificacoes'
import { ItemNotificacao } from '@/components/misc/ItemNotificacao'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'
import type { TipoNotificacao } from '@/types/Notificacao'

const filtros: { texto: string; tipo: TipoNotificacao | 'tudo' }[] = [
    { texto: 'Tudo', tipo: 'tudo' },
    { texto: 'Menções', tipo: 'mencao' },
    { texto: 'Seguidores', tipo: 'seguidor' },
    { texto: 'Curtidas', tipo: 'curtida' },
    { texto: 'Comentários', tipo: 'comentario' },
    { texto: 'MariLace', tipo: 'sistema' },
]

export default function Notificacoes() {
    const { notificacoes, carregando, naoLidasCount, marcarComoLida, marcarTodasComoLidas } = useNotificacoes()
    const [filtroAtivo, setFiltroAtivo] = useState<TipoNotificacao | 'tudo'>('tudo')

    const notificacoesFiltradas = filtroAtivo === 'tudo'
        ? notificacoes
        : notificacoes.filter((n) => n.tipo === filtroAtivo)

    const abrirNotificacao = async (id: string, lida: boolean, deQuemUsername?: string) => {
        if (!lida) await marcarComoLida(id)
        if (deQuemUsername) router.push(`/${deQuemUsername}` as any)
    }

    return (
        <SafeAreaView style={styles.tela}>
            <StatusBar style="dark" />

            <View style={styles.cabecalho}>
                <Pressable onPress={() => router.back()} hitSlop={10}>
                    <FontAwesomeFreeSolid name="arrow-left" size={20} color={Cores.preto} />
                </Pressable>
                <Text style={styles.titulo}>Notificações</Text>
                <View style={styles.quantidade}>
                    <Text style={styles.quantidadeTexto}>{naoLidasCount}</Text>
                </View>
            </View>

            {naoLidasCount > 0 && (
                <Pressable style={styles.btnMarcarTodas} onPress={marcarTodasComoLidas}>
                    <Text style={styles.btnMarcarTodasTexto}>Marcar tudo como lido</Text>
                </Pressable>
            )}

            <FlatList
            horizontal
            style={styles.listaFiltros}
            showsHorizontalScrollIndicator={false}
            data={filtros}
            keyExtractor={(item) => item.tipo}
            contentContainerStyle={styles.filtros}
            renderItem={({ item }) => (

                <Pressable
                style={[styles.chip, filtroAtivo === item.tipo && styles.chipAtivo]}
                onPress={() => setFiltroAtivo(item.tipo)}
                >
                    <Text style={[styles.chipTexto, filtroAtivo === item.tipo && styles.chipTextoAtivo]}>
                        {item.texto}
                    </Text>
                </Pressable>

            )}
            />

            <View style={ styles.conteudo }>
                {carregando ? (

                    <ActivityIndicator style={styles.loading} color={Cores.primaria} />

                ) : notificacoesFiltradas.length === 0 ? (

                    <Text style={styles.mensagemVazia}>Nenhuma notificação por aqui ainda.</Text>

                ) : (
                    
                    <FlatList
                    data={notificacoesFiltradas}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.lista}
                    ItemSeparatorComponent={() => <View style={styles.separador} />}
                    renderItem={({ item }) => (

                        <ItemNotificacao
                        notificacao={item}
                        onPress={() => abrirNotificacao(item.id, item.lida, item.deQuemUsername)}
                        />

                    )}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    tela: { 
        flex: 1, 
        backgroundColor: Cores.branco 
    },
    cabecalho: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 12, 
        paddingHorizontal: 16, 
        paddingVertical: 12 
    },
    titulo: { 
        flex: 1, 
        fontFamily: Fontes.base, 
        fontSize: Fontes.G, 
        fontWeight: '700', 
        color: Cores.preto 
    },
    quantidade: { 
        width: 32, 
        height: 32, 
        borderRadius: 16, 
        backgroundColor: Cores.primaria, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    quantidadeTexto: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP, 
        fontWeight: '600', 
        color: Cores.branco 
    },
    btnMarcarTodas: { 
        alignSelf: 'flex-end', 
        paddingHorizontal: 16, 
        marginBottom: 4 
    },
    btnMarcarTodasTexto: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP, 
        fontWeight: '600', 
        color: Cores.primariaEscura, 
        textDecorationLine: 'underline' 
    },
    listaFiltros: {
        flexGrow: 0,
    },
    filtros: {
        height: 48,
        paddingHorizontal: 16,
        alignItems: 'center',
        gap: 8,
    },

    chip: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: Cores.cinza,
        alignSelf: 'center',
    },
    chipAtivo: { 
        backgroundColor: Cores.primaria, 
        borderColor: Cores.primaria 
    },
    chipTexto: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP,
        fontWeight: '600', 
        color: Cores.cinza
    },
    chipTextoAtivo: { 
        color: Cores.branco 
    },
    conteudo: {
        flex: 1,
    },
    loading: { 
        marginTop: 32 
    },
    mensagemVazia: { 
        textAlign: 'center', 
        fontFamily: Fontes.base, 
        fontSize: Fontes.P, 
        color: Cores.cinza, 
        marginTop: 48
    },
    lista: { 
        paddingBottom: 24 
    },
    separador: { 
        height: 1, 
        backgroundColor: Cores.cinza, 
        marginHorizontal: 16 
    },
})