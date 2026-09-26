import { useState } from 'react'
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { useAutenticacao } from '@/hooks/useAutenticacao'
import { usePublicacoes } from '@/hooks/usePublicacoes'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'

export default function NovoPost() {
    const { usuario } = useAutenticacao()
    const { criarPublicacao } = usePublicacoes()

    const [texto, setTexto] = useState('')
    const [imagemUri, setImagemUri] = useState<string | null>(null)
    const [enviando, setEnviando] = useState(false)
    const [erro, setErro] = useState('')

    const fechar = () => {
        router.back()
    }

    const escolherImagem = async () => {
        const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (!permissao.granted) {
            Alert.alert('Permissão necessária', 'Precisamos de acesso às suas fotos para adicionar uma imagem.')
            return
        }

        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        })

        if (!resultado.canceled) {
            setImagemUri(resultado.assets[0].uri)
        }
    }

    const removerImagem = () => {
        setImagemUri(null)
    }

    const postar = async () => {
        if (!texto.trim() && !imagemUri) {
            setErro('Escreva algo ou selecione uma imagem antes de postar.')
            return
        }

        setEnviando(true)
        setErro('')

        try {
            await criarPublicacao(texto.trim(), imagemUri ?? undefined)
            router.back()
        } catch (e) {
            setErro('Não foi possível criar a publicação. Tente novamente.')
        } finally {
            setEnviando(false)
        }
    }

    return (
        <SafeAreaView style={styles.tela}>
            <StatusBar style="dark" />

            <View style={styles.cabecalho}>
                <Pressable onPress={fechar} disabled={enviando} accessibilityLabel="Cancelar">
                    <Text style={styles.btnCancelarTexto}>Cancelar</Text>
                </Pressable>

                <Text style={styles.tituloCabecalho}>Nova publicação</Text>

                <Pressable
                    style={[styles.btnPostar, (enviando || (!texto.trim() && !imagemUri)) && styles.btnPostarDesabilitado]}
                    onPress={postar}
                    disabled={enviando || (!texto.trim() && !imagemUri)}
                >
                    <Text style={styles.btnPostarTexto}>
                        {enviando ? 'Postando...' : 'Postar'}
                    </Text>
                </Pressable>
            </View>

            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.conteudo}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.linhaAutor}>
                        {usuario?.photoURL ? (
                            <Image source={{ uri: usuario.photoURL }} style={styles.avatar} />
                        ) : (
                            <View style={styles.avatarPadrao}>
                                <FontAwesomeFreeSolid name="user" size={18} color={Cores.primaria} />
                            </View>
                        )}
                        <Text style={styles.nomeUsuario}>
                            {usuario?.nome ?? usuario?.username ?? 'Usuário'}
                        </Text>
                    </View>

                    <TextInput
                        style={styles.inputPostagem}
                        multiline
                        maxLength={300}
                        placeholder="O que você está pensando?"
                        placeholderTextColor={Cores.cinza}
                        value={texto}
                        onChangeText={setTexto}
                        editable={!enviando}
                        autoFocus
                    />
                    <Text style={styles.contador}>{texto.length}/300</Text>

                    {imagemUri && (
                        <View style={styles.previewContainer}>
                            <Image source={{ uri: imagemUri }} style={styles.previewImagem} />
                            <Pressable
                                style={styles.removerImagemBtn}
                                onPress={removerImagem}
                                accessibilityLabel="Remover imagem"
                            >
                                <FontAwesomeFreeSolid name="xmark" size={14} color={Cores.branco} />
                            </Pressable>
                        </View>
                    )}

                    {erro ? <Text style={styles.erroTexto}>{erro}</Text> : null}
                </ScrollView>

                <View style={styles.barraAcoes}>
                    <Pressable style={styles.acao} onPress={escolherImagem} disabled={enviando}>
                        <FontAwesomeFreeSolid name="image" size={22} color={Cores.preto} />
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    tela: {
        flex: 1,
        backgroundColor: Cores.branco,
    },
    cabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Cores.cinza,
    },
    tituloCabecalho: {
        fontFamily: Fontes.base,
        fontSize: Fontes.P,
        fontWeight: '700',
        color: Cores.preto,
    },
    btnCancelarTexto: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        color: Cores.cinza,
    },
    btnPostar: {
        backgroundColor: Cores.verde,
        borderWidth: 2,
        borderColor: Cores.preto,
        borderRadius: 999,
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    btnPostarDesabilitado: {
        opacity: 0.5,
    },
    btnPostarTexto: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        fontWeight: '700',
        color: Cores.preto,
    },
    conteudo: {
        flexGrow: 1,
        padding: 16,
        gap: 12,
    },
    linhaAutor: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    avatarPadrao: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: Cores.primaria,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nomeUsuario: {
        fontFamily: Fontes.base,
        fontSize: Fontes.P,
        fontWeight: '600',
        color: Cores.preto,
    },
    inputPostagem: {
        minHeight: 120,
        textAlignVertical: 'top',
        fontFamily: Fontes.base,
        fontSize: Fontes.P,
        color: Cores.preto,
    },
    contador: {
        alignSelf: 'flex-end',
        fontFamily: Fontes.base,
        fontSize: 11,
        color: Cores.cinza,
    },
    previewContainer: {
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
    },
    previewImagem: {
        width: '100%',
        height: 260,
    },
    removerImagemBtn: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    erroTexto: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        fontWeight: '600',
        color: '#e53e3e',
    },
    barraAcoes: {
        flexDirection: 'row',
        gap: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: Cores.cinza,
    },
    acao: {
        padding: 4,
    },
})