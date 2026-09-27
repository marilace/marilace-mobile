import { useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useLocalSearchParams } from 'expo-router'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { usePerfil } from '@/hooks/usePerfil'
import { usePublicacoesDoUsuario } from '@/hooks/usePublicacoes'
import { useAutenticacao } from '@/hooks/useAutenticacao'
import { useSeguir } from '@/hooks/useSeguir'
import { formatarTempo } from '@/utils/formatarTempo'
import { Post } from '@/components/post/Post'
import { Emblemas } from '@/components/misc/Emblemas'
import { router } from 'expo-router'

const FUNDO_PADRAO = 'https://i.imgur.com/6vAOHB9.png'

type Aba = 'postagens' | 'sobre'

export default function Perfil() {
    const { username } = useLocalSearchParams<{ username: string }>()
    const { perfil, carregando, naoEncontrado } = usePerfil(username)
    const { publicacoes, carregando: carregandoPosts } = usePublicacoesDoUsuario(perfil?.uid)
    const { seguindo, alternarSeguir, atualizando, ehMeuProprioPerfil } = useSeguir(perfil?.uid)

    const [aba, setAba] = useState<Aba>('postagens')

    const abrirEdicao = () => router.push('/(logado)/editar-perfil')

    if (carregando) {
        return (
            <SafeAreaView style={styles.tela}>
                <ActivityIndicator style={styles.loading} color={Cores.primaria} />
            </SafeAreaView>
        )
    }

    if (naoEncontrado || !perfil) {
        return (
            <SafeAreaView style={styles.tela}>
                <View style={styles.vazio}>
                    <FontAwesomeFreeSolid name="circle-question" size={48} color={Cores.primaria} />
                    <Text style={styles.vazioTexto}>Perfil não encontrado.</Text>
                </View>
            </SafeAreaView>
        )
    }

    const Cabecalho = () => (
        <View>
            <Image source={{ uri: FUNDO_PADRAO }} style={styles.fundo} />

            <View style={styles.avatarLinha}>
                {perfil.photoURL ? (
                    <Image source={{ uri: perfil.photoURL }} style={styles.avatar} />
                ) : (
                    <View style={styles.avatarPadrao}>
                        <FontAwesomeFreeSolid name="user" size={40} color={Cores.primaria} />
                    </View>
                )}

                <View style={styles.seguidores}>
                    <Text style={styles.seguidoresTexto}>
                        <Text style={styles.seguidoresNumero}>{perfil.followersCount ?? 0}</Text> seguidores
                    </Text>
                    <Text style={styles.seguidoresTexto}>
                        <Text style={styles.seguidoresNumero}>{perfil.followingCount ?? 0}</Text> seguindo
                    </Text>
                </View>
            </View>

            <View style={styles.infoPerfil}>
                <View style={styles.nomeEmblemas}>
                    <Text style={styles.nome}>{perfil.nome}</Text>
                    <Emblemas ids={perfil.emblemas} />
                </View>
                <Text style={styles.username}>@{perfil.username}</Text>

                {!!perfil.bio && <Text style={styles.bio}>{perfil.bio}</Text>}

                {ehMeuProprioPerfil ? (
                    <Pressable style={styles.btnEditar} onPress={abrirEdicao}>
                        <FontAwesomeFreeSolid name="user-pen" size={16} color={Cores.preto} />
                        <Text style={styles.btnSeguirTexto}>Editar perfil</Text>
                    </Pressable>
                ) : (
                    <Pressable
                    style={[styles.btnSeguir, seguindo && styles.btnSeguirAtivo]}
                    onPress={alternarSeguir}
                    disabled={atualizando}
                    >
                        <FontAwesomeFreeSolid
                        name={seguindo ? 'user-check' : 'user-plus'}
                        size={16}
                        color={Cores.preto}
                        />
                        <Text style={styles.btnSeguirTexto}>
                            {seguindo ? 'Seguindo' : 'Seguir'}
                        </Text>
                    </Pressable>
                )}
            </View>

            <View style={styles.abas}>
                <Pressable onPress={() => setAba('postagens')}>
                    <Text style={[styles.aba, aba === 'postagens' && styles.abaAtiva]}>
                        Postagens
                    </Text>
                </Pressable>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={styles.tela}>
            <StatusBar style="dark" />

            {carregandoPosts ? (
                <>
                    <Cabecalho />
                    <ActivityIndicator style={styles.loading} color={Cores.primaria} />
                </>
            ) : (
                <FlatList
                data={publicacoes}
                keyExtractor={(post) => post.id}
                ListHeaderComponent={Cabecalho}
                ItemSeparatorComponent={() => <View style={styles.separador} />}
                ListEmptyComponent={
                    <View style={styles.vazio}>
                        <FontAwesomeFreeSolid name="face-frown" size={40} color={Cores.cinza} />
                        <Text style={styles.vazioTexto}>Nada aqui ainda!</Text>
                    </View>
                }
                renderItem={({ item: post }) => (
                    <Post
                    postId={post.id}
                    authorId={post.authorId}
                    avatarSrc={post.authorPhotoURL}
                    nome={post.authorDisplayName}
                    username={post.authorUsername}
                    emblemas={post.authorEmblemas}
                    tempo={formatarTempo(post.createdAt)}
                    conteudo={post.text}
                    imagemUrl={post.imageURL}
                    curtidas={post.likesCount}
                    comentarios={post.commentsCount}
                    compartilhamentos={0}
                    />
                )}
                />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    tela: { 
        flex: 1, 
        backgroundColor: Cores.branco,
        marginBottom: 72,
    },
    loading: { 
        marginTop: 32
    },
    fundo: { 
        width: '100%', 
        height: 140 
    },
    avatarLinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: -48,
        paddingHorizontal: 16,
    },
    avatar: { 
        width: 96, 
        height: 96, 
        borderRadius: 48, 
        borderWidth: 4, 
        borderColor: Cores.branco 
    },
    avatarPadrao: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 4,
        borderColor: Cores.branco,
        backgroundColor: Cores.branco,
        alignItems: 'center',
        justifyContent: 'center',
    },
    seguidores: { 
        alignItems: 'flex-end', 
        gap: 2, 
        paddingBottom: 8 
    },
    seguidoresTexto: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP, 
        color: Cores.primaria 
    },
    seguidoresNumero: { 
        color: Cores.preto, 
        fontWeight: '700' 
    },
    infoPerfil: { 
        paddingHorizontal: 16, 
        marginTop: 12, 
        gap: 6 
    },
    nomeEmblemas: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 6 
    },
    nome: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.M, 
        fontWeight: '700', 
        color: Cores.preto 
    },
    username: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.P, 
        color: Cores.cinza 
    },
    bio: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.P, 
        color: Cores.preto, 
        marginTop: 4 
    },
    btnSeguir: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 8,
        alignSelf: 'flex-start', 
        marginTop: 12, 
        paddingVertical: 8, 
        paddingHorizontal: 24,
        borderRadius: 999, 
        borderWidth: 2, 
        borderColor: Cores.preto, 
        backgroundColor: Cores.verde,
    },
    btnSeguirAtivo: { 
        backgroundColor: Cores.cinza 
    },
    btnEditar: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 8,
        alignSelf: 'flex-start', 
        marginTop: 12, 
        paddingVertical: 8, 
        paddingHorizontal: 24,
        borderRadius: 999, 
        borderWidth: 2, 
        borderColor: Cores.preto, 
        backgroundColor: Cores.cinza,
    },
    btnSeguirTexto: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP, 
        fontWeight: '700', 
        color: Cores.preto 
    },
    abas: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        marginTop: 20, 
        marginBottom: 12,
        borderBottomWidth: 1, 
        borderBottomColor: Cores.cinza, 
        paddingBottom: 10,
    },
    aba: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.P, 
        fontWeight: '600', 
        color: Cores.primaria 
    },
    abaAtiva: { 
        color: Cores.primariaEscura 
    },
    separador: { 
        height: 1, 
        backgroundColor: Cores.cinza 
    },
    vazio: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 8, 
        paddingVertical: 48 
    },
    vazioTexto: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.P, 
        color: Cores.cinza
    },
    sobre: {
        paddingHorizontal: 16, 
        paddingBottom: 32 
    },
    sobreTitulo: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.M, 
        fontWeight: '700', 
        color: Cores.preto, 
        marginBottom: 12 
    },
    listaEmblemas: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        gap: 8 
    },
})