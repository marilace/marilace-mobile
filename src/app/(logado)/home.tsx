import { useState } from 'react'
import { 
    ActivityIndicator, 
    FlatList, 
    Pressable, 
    StyleSheet, 
    Text, 
    View, 
    Image 
} from 'react-native'
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

    const abrirNovoPost = () => router.push("/(logado)/novo-post")
    const abrirPerfil = () => router.push(`/perfil/${usuario?.username}`)
    const abrirNotificacoes = () => router.push('/(logado)/notificacoes')

    return (
        <SafeAreaView style={styles.tela}>
            <StatusBar style="dark" />

            <View style={styles.cabecalho}>

                <Image
                source={require('@/assets/images/logoForum.png')}
                style={styles.logo}
                resizeMode="contain"
                />

                <View style={styles.acoesCabecalho}>

                    <Pressable
                    onPress={abrirNotificacoes}
                    hitSlop={8}
                    accessibilityLabel="Notificações"
                    >
                        <FontAwesomeFreeSolid name="bell" size={20} color={Cores.primaria}/>
                    </Pressable>

                    <Pressable
                    onPress={abrirPerfil}
                    style={styles.btnPerfil} 
                    accessibilityLabel="Perfil"
                    >
                        {usuario?.photoURL ? (
                            <Image source={{ uri: usuario?.photoURL }} style={styles.avatarImg} />
                        ) : (
                            <FontAwesomeFreeSolid name="user" size={16} color={Cores.primaria} />
                        )}
                    </Pressable>

                </View>
                
            </View>

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
        width: 30,
        height: 30,
    },
    acoesCabecalho:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    avatarImg: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    btnPerfil: {
        width: 36,
        height: 36,
        borderRadius: 17,
        borderWidth: 2,
        boxSizing: 'border-box',
        borderColor: Cores.primaria,
        alignItems: 'center',
        justifyContent: 'center',
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