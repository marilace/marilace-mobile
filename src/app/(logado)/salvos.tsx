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
import { useItensSalvos } from '@/hooks/useSalvos'
import { Post } from '@/components/post/Post'
import { ArtigoBlog } from '@/components/post/ArtigoBlog'
import { formatarTempo } from '@/utils/formatarTempo'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'
import type { ItemSalvo } from '@/types/Salvo'

type Filtro = 'todos' | 'post' | 'artigo'

const filtros: { texto: string; tipo: Filtro }[] = [
    { texto: 'Todos', tipo: 'todos' },
    { texto: 'Posts', tipo: 'post' },
    { texto: 'Artigos', tipo: 'artigo' },
]

export default function Salvos() {
    const { itens, carregando } = useItensSalvos()
    const [filtro, setFiltro] = useState<Filtro>('todos')

    const itensFiltrados = itens.filter((item) => filtro === 'todos' || item.tipo === filtro)

    const renderItem = ({ item }: { item: ItemSalvo }) => {
        if (item.tipo === 'post') {
            return (
                <Post
                postId={item.dados.id}
                authorId={item.dados.authorId}
                avatarSrc={item.dados.authorPhotoURL}
                nome={item.dados.authorDisplayName}
                username={item.dados.authorUsername}
                emblemas={item.dados.authorEmblemas}
                tempo={formatarTempo(item.dados.createdAt)}
                conteudo={item.dados.text}
                imagemUrl={item.dados.imageURL}
                curtidas={item.dados.likesCount}
                comentarios={item.dados.commentsCount}
                compartilhamentos={0}
                />
            )
        }

        return (
            <ArtigoBlog
            id={item.dados.id}
            src={item.dados.imagemURL}
            titulo={item.dados.titulo}
            descricao={item.dados.descricao}
            />
        )
    }

    return (
        <SafeAreaView style={styles.tela}>
            <StatusBar style="dark" />

            <View style={styles.cabecalho}>
                <Pressable onPress={() => router.back()} hitSlop={10}>
                    <FontAwesomeFreeSolid name="arrow-left" size={20} color={Cores.preto} />
                </Pressable>
                <Text style={styles.titulo}>Salvos</Text>
                <View style={{ width: 20 }} />
            </View>

            <FlatList
            horizontal
            style={styles.listaFiltros}
            showsHorizontalScrollIndicator={false}
            data={filtros}
            keyExtractor={(item) => item.tipo}
            contentContainerStyle={styles.filtros}
            renderItem={({ item }) => (

                <Pressable
                style={[styles.chip, filtro === item.tipo && styles.chipAtivo]}
                onPress={() => setFiltro(item.tipo)}
                >
                    <Text style={[styles.chipTexto, filtro === item.tipo && styles.chipTextoAtivo]}>
                        {item.texto}
                    </Text>

                </Pressable>

            )}
            />

            {carregando ? (

                <ActivityIndicator style={styles.loading} color={Cores.primaria} />
                
            ) : itensFiltrados.length === 0 ? (

                <View style={styles.vazio}>
                    <FontAwesomeFreeSolid name="bookmark" size={40} color={Cores.primaria} />
                    <Text style={styles.vazioTitulo}>Nada por aqui ainda...</Text>
                    <Text style={styles.vazioTexto}>
                        Toque no ícone de salvar em um post ou artigo para vê-lo aqui depois.
                    </Text>
                </View>

            ) : (

                <FlatList
                data={itensFiltrados}
                keyExtractor={(item) => `${item.tipo}-${item.dados.id}`}
                renderItem={renderItem}
                contentContainerStyle={styles.lista}
                ItemSeparatorComponent={() => <View style={styles.separador} />}
                />

            )}
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
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    titulo: {
        fontFamily: Fontes.base,
        fontSize: Fontes.G,
        fontWeight: '700',
        color: Cores.primariaEscura,
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
        color: Cores.cinza,
    },
    chipTextoAtivo: { 
        color: Cores.branco
    },
    loading: { 
        marginTop: 32
    },
    vazio: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 32,
        marginTop: 32,
    },
    vazioTitulo: {
        fontFamily: Fontes.base,
        fontSize: Fontes.P,
        fontWeight: '700',
        color: Cores.preto,
    },
    vazioTexto: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        color: Cores.cinza,
        textAlign: 'center',
    },
    lista: { 
        paddingBottom: 24 
    },
    separador: { 
        height: 18 
    },
})