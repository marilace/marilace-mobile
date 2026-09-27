import { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { Emblemas } from '../misc/Emblemas'
import { useAutenticacao } from '@/hooks/useAutenticacao'
import { useCurtida } from '@/hooks/useCurtidas'
import { usePublicacoes } from '@/hooks/usePublicacoes'
import { useSalvo } from '@/hooks/useSalvos'
import { ModalAcoesPostagem } from '../modais/ModalAcoesPostagem'
import { ModalEditarPostagem } from '../modais/ModalEditarPostagem'
import { ModalConfirmacao } from '../modais/ModalConfirmacao'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'
import { ModalComentarios } from '../modais/ModalComentarios'
import { router } from 'expo-router'

interface PostProps {
    postId: string;
    authorId: string;
    avatarSrc?: string;
    nome: string;
    username: string;
    tempo: string;
    imagemUrl?: string | null;
    conteudo: string;
    curtidas: number;
    comentarios: number;
    compartilhamentos: number;
    verificado?: boolean;
    emblemas?: string[];
}

export function Post({
    postId,
    authorId,
    avatarSrc,
    nome,
    username,
    tempo,
    imagemUrl,
    conteudo,
    curtidas,
    comentarios,
    compartilhamentos,
    verificado = false,
    emblemas
}: PostProps){

    const { curtido, alternarCurtida } = useCurtida(postId, authorId)
    const { usuario } = useAutenticacao()
    const { excluirPublicacao } = usePublicacoes()

    const {salvo, alternarSalvo, salvando} = useSalvo(postId, 'post')

    const [menuAberto, setMenuAberto] = useState(false)
    const [modalEditarAberto, setModalEditarAberto] = useState(false)
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false)
    const [excluindo, setExcluindo] = useState(false)
    const [modalComentariosAberto, setModalComentariosAberto] = useState(false)

    const souAutor = usuario?.uid === authorId

    const excluir = async () => {
        setExcluindo(true)
        try {
            await excluirPublicacao(postId)
            setModalExcluirAberto(false)
        } catch (e) {
            console.error('Erro ao excluir publicação:', e)
        } finally {
            setExcluindo(false)
        }
    }

    const abrirPerfil = () => router.push(`/(logado)/perfil/${username}`)

    return (
        <View style={styles.card}>
            <Pressable
            onPress={abrirPerfil}
            style={styles.cabecalho}
            >
                {avatarSrc ? (
                    <Image source={{ uri: avatarSrc }} style={styles.avatarImg} />
                ) : (
                    <View style={styles.avatar}>
                        <Text style={styles.avatarTexto}>ml</Text>
                    </View>
                )}

                <View style={styles.info}>
                    <View style={styles.nomeLinha}>
                        <Text style={styles.nome}>{nome}</Text>
                        {verificado && <FontAwesomeFreeSolid name="circle-check" size={13} color={Cores.verde} />}
                        <Emblemas ids={emblemas} />
                    </View>
                    <Text style={styles.usuario}>@{username} • {tempo}</Text>
                </View>

                {souAutor && (
                    <Pressable
                    hitSlop={10}
                    onPress={() => setMenuAberto(true)}
                    accessibilityLabel="Opções da publicação"
                    >
                        <FontAwesomeFreeSolid name="ellipsis" size={16} color={Cores.preto} />
                    </Pressable>
                )}
            </Pressable>

            <Text style={styles.conteudo}>{conteudo}</Text>

            {imagemUrl && (
                <Image source={{ uri: imagemUrl }} style={styles.imagemPost} />
            )}

            <View style={styles.rodape}>
                <View style={styles.acoes}>
                    <Pressable style={styles.acao} onPress={alternarCurtida} accessibilityLabel="Curtir">
                        <FontAwesomeFreeSolid
                        name="star"
                        size={18}
                        color={curtido ? Cores.primaria : Cores.preto}
                        />
                        <Text style={styles.numero}>{curtidas}</Text>
                    </Pressable>

                    <Pressable style={styles.acao} onPress={() => setModalComentariosAberto(true)}>
                        <FontAwesomeFreeSolid name="comment" size={18} color={Cores.preto} />
                        <Text style={styles.numero}>{comentarios}</Text>
                    </Pressable>

                    <View style={styles.acao}>
                        <FontAwesomeFreeSolid name="share-nodes" size={18} color={Cores.preto} />
                        <Text style={styles.numero}>{compartilhamentos}</Text>
                    </View>
                </View>

                <Pressable onPress={alternarSalvo} hitSlop={10} accessibilityLabel="Salvar">
                    <FontAwesomeFreeSolid
                    name="bookmark"
                    size={18}
                    color={salvo ? Cores.primariaEscura : Cores.preto}
                    />
                </Pressable>
            </View>

            <ModalAcoesPostagem
            aberto={menuAberto}
            fechar={() => setMenuAberto(false)}
            onEditar={() => {
                setMenuAberto(false)
                setModalEditarAberto(true)
            }}
            onExcluir={() => {
                setMenuAberto(false)
                setModalExcluirAberto(true)
            }}
            />

            <ModalEditarPostagem
            aberto={modalEditarAberto}
            postId={postId}
            conteudoAtual={conteudo}
            imagemUrl={imagemUrl}
            fechar={() => setModalEditarAberto(false)}
            />

            <ModalConfirmacao
            aberto={modalExcluirAberto}
            titulo="Excluir publicação"
            mensagem="Tem certeza que deseja excluir esta publicação? Essa ação não pode ser desfeita."
            confirmando={excluindo}
            confirmar={excluir}
            cancelar={() => setModalExcluirAberto(false)}
            />

            <ModalComentarios
            aberto={modalComentariosAberto}
            postId={postId}
            authorId={authorId}
            fechar={() => setModalComentariosAberto(false)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: Cores.branco,
    },
    cabecalho: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Cores.primaria,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    avatarTexto: {
        fontFamily: Fontes.logo,
        fontSize: Fontes.M,
        color: Cores.branco
    },
    info: {
        flex: 1
    },
    nomeLinha: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    nome: {
        fontFamily: Fontes.base,
        fontSize: Fontes.P,
        fontWeight: '600',
        color: Cores.preto
    },
    usuario: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        color: Cores.cinza
    },
    conteudo: {
        marginLeft: 50,
        marginTop: 6,
        marginBottom: 12,
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        color: Cores.preto,
    },
    imagemPost: {
        marginLeft: 50,
        width: '85%',
        height: 200,
        borderRadius: 12,
        marginBottom: 12,
    },
    rodape: {
        marginLeft: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    acoes: {
        flexDirection: 'row',
        gap: 18
    },
    acao: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    numero: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        color: Cores.preto
    },
})