import { useState } from 'react'
import {
    ActivityIndicator, 
    FlatList, 
    Image, 
    KeyboardAvoidingView, 
    Modal,
    Platform, 
    Pressable, 
    StyleSheet, 
    Text, 
    TextInput, 
    View,
} from 'react-native'
import { router } from 'expo-router'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { useComentarios, useCriarComentario } from '@/hooks/useComentarios'
import { useAutenticacao } from '@/hooks/useAutenticacao'
import { formatarTempo } from '@/utils/formatarTempo'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'
import type { ComentarioTipo } from '@/types/Comentario'

type ModalComentariosProps = {
    aberto: boolean
    postId: string
    authorId: string
    fechar: () => void
}

export function ModalComentarios({ aberto, postId, authorId, fechar }: ModalComentariosProps) {
    const { usuario } = useAutenticacao()
    const { comentarios, carregando } = useComentarios(aberto ? postId : undefined)
    const { criarComentario, enviando } = useCriarComentario(postId, authorId)

    const [texto, setTexto] = useState('')
    const [erro, setErro] = useState('')

    const fecharModal = () => {
        setTexto('')
        setErro('')
        fechar()
    }

    const enviar = async () => {
        if (!texto.trim()) return
        setErro('')
        try {
            await criarComentario(texto)
            setTexto('')
        } catch (e) {
            setErro('Não foi possível enviar o comentário. Tente novamente.')
        }
    }

    const abrirPerfil = (username: string) => {
        fecharModal()
        router.push(`/${username}` as any)
    }

    const renderComentario = ({ item }: { item: ComentarioTipo }) => (
        <View style={styles.comentario}>
            <Pressable onPress={() => abrirPerfil(item.authorUsername)}>
                {item.authorPhotoURL ? (
                    <Image source={{ uri: item.authorPhotoURL }} style={styles.avatar} />
                ) : (
                    <View style={styles.avatarDefault}>
                        <FontAwesomeFreeSolid name="user" size={14} color={Cores.primaria} />
                    </View>
                )}
            </Pressable>

            <View style={styles.bolha}>
                <View style={styles.linhaAutor}>
                    <Text style={styles.nome}>{item.authorDisplayName}</Text>
                    <Text style={styles.meta}>@{item.authorUsername} • {formatarTempo(item.createdAt)}</Text>
                </View>
                <Text style={styles.texto}>{item.text}</Text>
            </View>
        </View>
    )

    return (
        <Modal visible={aberto} transparent animationType="slide" onRequestClose={fecharModal}>
            <Pressable style={styles.overlay} onPress={fecharModal} />

            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View style={styles.puxador} />

                <View style={styles.cabecalho}>
                    <Text style={styles.titulo}>Comentários</Text>
                    <Pressable onPress={fecharModal} accessibilityLabel="Fechar" hitSlop={10}>
                        <FontAwesomeFreeSolid name="xmark" size={20} color={Cores.preto} />
                    </Pressable>
                </View>

                {carregando ? (
                    <ActivityIndicator style={styles.loading} color={Cores.primaria} />
                ) : comentarios.length === 0 ? (
                    <View style={styles.vazio}>
                        <FontAwesomeFreeSolid name="comment" size={32} color={Cores.cinza} />
                        <Text style={styles.mensagemVazio}>Ainda não há comentários. Seja a primeira a comentar!</Text>
                    </View>
                ) : (
                    <FlatList
                    data={comentarios}
                    keyExtractor={(item) => item.id}
                    renderItem={renderComentario}
                    contentContainerStyle={styles.lista}
                    />
                )}

                {erro ? <Text style={styles.erroTexto}>{erro}</Text> : null}

                <View style={styles.containerInput}>
                    {usuario?.photoURL ? (
                        <Image source={{ uri: usuario.photoURL }} style={styles.avatarUsuario} />
                    ) : (
                        <View style={styles.avatarDefault}>
                            <FontAwesomeFreeSolid name="user" size={14} color={Cores.primaria} />
                        </View>
                    )}

                    <TextInput
                    style={styles.inputComentario}
                    placeholder="Escreva um comentário..."
                    placeholderTextColor={Cores.cinza}
                    value={texto}
                    onChangeText={setTexto}
                    editable={!enviando}
                    multiline
                    maxLength={300}
                    />

                    <Pressable
                    style={[styles.btnEnviar, (enviando || !texto.trim()) && styles.btnEnviarDesabilitado]}
                    onPress={enviar}
                    disabled={enviando || !texto.trim()}
                    accessibilityLabel="Enviar comentário"
                    >
                        <FontAwesomeFreeSolid name="paper-plane" size={16} color={Cores.preto} />
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: { 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.5)' 
    },
    container: {
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0, 
        maxHeight: '80%',
        backgroundColor: Cores.branco, 
        borderTopLeftRadius: 24, 
        borderTopRightRadius: 24,
        paddingHorizontal: 20, 
        paddingTop: 10, 
        paddingBottom: 16,
    },
    puxador: { 
        alignSelf: 'center', 
        width: 40, 
        height: 4, 
        borderRadius: 999, 
        backgroundColor: Cores.cinza, 
        marginBottom: 12 
    },
    cabecalho: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingBottom: 12, 
        borderBottomWidth: 2, 
        borderBottomColor: Cores.cinza, 
        marginBottom: 8 
    },
    titulo: { 
        fontFamily: Fontes.logo, 
        fontSize: Fontes.G, 
        color: Cores.primariaEscura 
    },
    loading: { 
        marginVertical: 24
    },
    vazio: { 
        alignItems: 'center', 
        gap: 8, 
        paddingVertical: 24
    },
    mensagemVazio: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP, 
        color: Cores.cinza, 
        textAlign: 'center', 
        maxWidth: 260 
    },
    lista: { 
        gap: 14, 
        paddingVertical: 8
    },
    comentario: { 
        flexDirection: 'row', 
        gap: 10, 
        alignItems: 'flex-start'
    },
    avatar: { 
        width: 34, 
        height: 34, 
        borderRadius: 17 
    },
    avatarUsuario: { 
        width: 34, 
        height: 34, 
        borderRadius: 17
    },
    avatarDefault: { 
        width: 34, 
        height: 34, 
        borderRadius: 17, 
        borderWidth: 2, 
        borderColor: Cores.primaria, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    bolha: { 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.035)', 
        borderRadius: 14, 
        padding: 10 
    },
    linhaAutor: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        gap: 6, 
        marginBottom: 2 
    },
    nome: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP, 
        fontWeight: '600', 
        color: Cores.preto
    },
    meta: { 
        fontFamily: Fontes.base, 
        fontSize: 11, 
        color: Cores.cinza 
    },
    texto: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP, 
        color: Cores.preto 
    },
    erroTexto: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP, 
        color: Cores.erro, 
        marginBottom: 6 
    },
    containerInput: { 
        flexDirection: 'row', 
        alignItems: 'flex-end', 
        gap: 10, 
        paddingTop: 10, 
        borderTopWidth: 2, 
        borderTopColor: Cores.cinza 
    },
    inputComentario: { 
        flex: 1, 
        maxHeight: 90, 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP, 
        color: Cores.preto, 
        borderWidth: 2, 
        borderColor: Cores.cinza, 
        borderRadius: 14, 
        paddingHorizontal: 12, 
        paddingVertical: 8 
    },
    btnEnviar: { 
        width: 38, 
        height: 38, 
        borderRadius: 19, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: Cores.verde, 
        borderWidth: 2, 
        borderColor: Cores.preto 
    },
    btnEnviarDesabilitado: { 
        opacity: 0.5
    },
})