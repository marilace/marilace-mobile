import { useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Post } from '@/components/post/Post'
import { useFeed } from '@/hooks/usePublicacoes'
import { useAutenticacao } from '@/hooks/useAutenticacao'
import { formatarTempo } from '@/utils/formatarTempo'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'
import { router } from 'expo-router'

export default function Forum() {
    const { usuario } = useAutenticacao()
    const { publicacoes, carregando } = useFeed()
    const [modalAberto, setModalAberto] = useState(false)

    const abrirNovoPost = () => {
        router.push("/(logado)/novo-post")
    }

    return (
        <SafeAreaView style={styles.tela}>
            <StatusBar style="dark" />

            <View style={styles.cabecalho}>
                <Text style={styles.logo}>ml</Text>

                <View style={styles.btnPerfil} accessibilityLabel="Perfil">
                    <FontAwesomeFreeSolid name="user" size={16} color={Cores.primariaEscura} />
                </View>
            </View>

            <Pressable style={styles.inputPost} onPress={abrirNovoPost}>
                <View style={styles.avatarPerfil}>
                    <FontAwesomeFreeSolid name="user" size={16} color={Cores.primaria} />
                </View>
                <Text style={styles.inputPostTexto}>O que você está pensando?</Text>
            </Pressable>

            {carregando ? (
                <ActivityIndicator style={styles.loading} color={Cores.primaria} />
            ) : (
                <FlatList
                    data={publicacoes}
                    keyExtractor={(post) => post.id}
                    contentContainerStyle={styles.lista}
                    ItemSeparatorComponent={() => <View style={styles.separador} />}
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
        backgroundColor: Cores.branco
    },
    cabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 12,
    },
    logo: {
        fontFamily: Fontes.logo,
        fontSize: 32,
        color: Cores.primaria
    },
    btnPerfil: {
        width: 34,
        height: 34,
        borderRadius: 17,
        borderWidth: 2,
        borderColor: Cores.primariaEscura,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputPost: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginHorizontal: 16,
        marginBottom: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: Cores.cinza,
    },
    avatarPerfil: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: Cores.primaria,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputPostTexto: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        color: Cores.cinza,
    },
    lista: {
        paddingBottom: 24,
    },
    separador: {
        height: 1,
        backgroundColor: Cores.cinza,
    },
    loading: {
        marginTop: 32,
    },
})