import { useEffect, useState } from 'react'
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { EMBLEMAS_DISPONIVEIS } from '@/constants/Emblemas'
import { useAutenticacao } from '@/hooks/useAutenticacao'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'

export default function EditarPerfil() {
    const { usuario, atualizarPerfil, atualizarFotoPerfil, alterarUsername } = useAutenticacao()

    const [nome, setNome] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [emblemas, setEmblemas] = useState<string[]>([])
    const [fotoUri, setFotoUri] = useState<string | null>(null)

    const [salvando, setSalvando] = useState(false)
    const [erro, setErro] = useState('')

    // preenche o formulário com os dados atuais assim que a usuária chega na tela
    useEffect(() => {
        if (usuario) {
            setNome(usuario.nome ?? '')
            setUsername(usuario.username ?? '')
            setBio(usuario.bio ?? '')
            setEmblemas(usuario.emblemas ?? [])
            setFotoUri(null)
            setErro('')
        }
    }, [usuario])

    const toggleEmblema = (id: string) => {
        setEmblemas((atuais) =>
            atuais.includes(id)
                ? atuais.filter((emblemaId) => emblemaId !== id)
                : [...atuais, id]
        )
    }

    const escolherFoto = async () => {
        const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (!permissao.granted) {
            Alert.alert(
                'Permissão necessária',
                'Precisamos de acesso às suas fotos para trocar o avatar.'
            )
            return
        }

        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            aspect: [1, 1],
            allowsEditing: true,
        })

        if (!resultado.canceled) {
            setFotoUri(resultado.assets[0].uri)
        }
    }

    const fechar = () => {
        router.back()
    }

    const salvar = async () => {
        if (!nome.trim()) {
            setErro('O nome não pode ficar vazio.')
            return
        }
        if (!username.trim()) {
            setErro('O nome de usuário não pode ficar vazio.')
            return
        }

        setSalvando(true)
        setErro('')

        try {
            // 1. Foto
            if (fotoUri) {
                const retornoFoto = await atualizarFotoPerfil(fotoUri)
                if (retornoFoto !== 'sucesso') {
                    setErro(retornoFoto)
                    setSalvando(false)
                    return
                }
            }

            // 2. Username
            const usernameFormatado = username.toLowerCase().trim()
            if (usernameFormatado !== usuario?.username) {
                const retornoUsername = await alterarUsername(usernameFormatado)
                if (retornoUsername !== 'sucesso') {
                    setErro(retornoUsername)
                    setSalvando(false)
                    return
                }
            }

            // 3. Dados de texto
            const retornoPerfil = await atualizarPerfil({
                displayName: nome.trim(),
                bio: bio.trim(),
                emblemas,
            })
            if (retornoPerfil !== 'sucesso') {
                setErro(retornoPerfil)
                setSalvando(false)
                return
            }

            fechar()
        } catch (e) {
            setErro('Não foi possível salvar as alterações. Tente novamente.')
        } finally {
            setSalvando(false)
        }
    }

    return (
        <SafeAreaView style={styles.tela}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.cabecalho}>
                <Pressable onPress={fechar} disabled={salvando} accessibilityLabel="Cancelar">
                    <Text style={styles.btnCancelarTexto}>Cancelar</Text>
                </Pressable>

                <Text style={styles.tituloCabecalho}>Editar perfil</Text>

                <Pressable
                    style={[styles.btnSalvar, salvando && styles.btnSalvarDesabilitado]}
                    onPress={salvar}
                    disabled={salvando}
                >
                    <Text style={styles.btnSalvarTexto}>
                        {salvando ? 'Salvando...' : 'Salvar'}
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
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.containerFoto}>
                        <Pressable onPress={escolherFoto} style={styles.avatarWrapper}>
                            {fotoUri || usuario?.photoURL ? (
                                <Image
                                    source={{ uri: fotoUri ?? usuario?.photoURL }}
                                    style={styles.avatar}
                                />
                            ) : (
                                <View style={styles.avatarPadrao}>
                                    <FontAwesomeFreeSolid name="user" size={32} color={Cores.primaria} />
                                </View>
                            )}
                            <View style={styles.btnTrocarFoto}>
                                <FontAwesomeFreeSolid name="camera" size={14} color={Cores.preto} />
                            </View>
                        </Pressable>
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.rotulo}>Nome</Text>
                        <View style={styles.sombra}>
                            <TextInput
                                style={styles.input}
                                value={nome}
                                onChangeText={setNome}
                                editable={!salvando}
                                maxLength={50}
                            />
                        </View>
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.rotulo}>Nome de usuário</Text>
                        <View style={styles.sombra}>
                            <View style={styles.inputComPrefixo}>
                                <FontAwesomeFreeSolid name="at" size={14} color={Cores.cinza} />
                                <TextInput
                                    style={styles.inputPrefixado}
                                    value={username}
                                    onChangeText={setUsername}
                                    editable={!salvando}
                                    autoCapitalize="none"
                                    maxLength={30}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.rotulo}>Bio</Text>
                        <View style={styles.sombra}>
                            <TextInput
                                style={[styles.input, styles.inputBio]}
                                value={bio}
                                onChangeText={setBio}
                                editable={!salvando}
                                multiline
                                maxLength={160}
                                placeholder="Conte um pouco sobre você..."
                                placeholderTextColor={Cores.cinza}
                            />
                        </View>
                        <Text style={styles.contador}>{bio.length}/160</Text>
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.rotulo}>Áreas de interesse</Text>
                        <View style={styles.listaChips}>
                            {EMBLEMAS_DISPONIVEIS.map((emblema) => {
                                const selecionado = emblemas.includes(emblema.id)
                                return (
                                    <Pressable
                                        key={emblema.id}
                                        onPress={() => !salvando && toggleEmblema(emblema.id)}
                                        style={[
                                            styles.chip,
                                            { backgroundColor: selecionado ? emblema.cor : Cores.branco },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.chipTexto,
                                                { color: selecionado ? Cores.preto : Cores.cinza },
                                            ]}
                                        >
                                            {emblema.texto}
                                        </Text>
                                    </Pressable>
                                )
                            })}
                        </View>
                        <Text style={styles.desc}>
                            As áreas escolhidas aparecem como emblemas do lado do seu nome! :)
                        </Text>
                    </View>

                    {erro ? <Text style={styles.erroTexto}>{erro}</Text> : null}
                </ScrollView>
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
        marginBottom: 72
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
    btnSalvar: {
        backgroundColor: Cores.verde,
        borderWidth: 2,
        borderColor: Cores.preto,
        borderRadius: 999,
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    btnSalvarDesabilitado: {
        opacity: 0.5,
    },
    btnSalvarTexto: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        fontWeight: '700',
        color: Cores.preto,
    },
    conteudo: {
        flexGrow: 1,
        padding: 20,
        gap: 20,
    },
    containerFoto: {
        alignItems: 'center',
        marginBottom: 4,
    },
    avatarWrapper: {
        width: 96,
        height: 96,
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 2,
        borderColor: Cores.primaria,
    },
    avatarPadrao: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 3,
        borderColor: Cores.primaria,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Cores.branco,
    },
    btnTrocarFoto: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Cores.verde,
        borderWidth: 2,
        borderColor: Cores.preto,
        borderRadius: 999,
        padding: 6,
    },
    campo: {
        gap: 6,
    },
    rotulo: {
        fontFamily: Fontes.base,
        fontSize: Fontes.P,
        fontWeight: '700',
        color: Cores.primariaEscura,
    },
    sombra: {
        backgroundColor: Cores.preto,
        borderRadius: 999,
        paddingBottom: 3,
    },
    input: {
        backgroundColor: Cores.branco,
        borderWidth: 2,
        borderColor: Cores.preto,
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontFamily: Fontes.base,
        fontSize: Fontes.M,
        color: Cores.preto,
    },
    inputBio: {
        minHeight: 80,
        textAlignVertical: 'top',
        borderRadius: 20,
    },
    inputComPrefixo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: Cores.branco,
        borderWidth: 2,
        borderColor: Cores.preto,
        borderRadius: 999,
        paddingHorizontal: 16,
    },
    inputPrefixado: {
        flex: 1,
        paddingVertical: 10,
        fontFamily: Fontes.base,
        fontSize: Fontes.M,
        color: Cores.preto,
    },
    contador: {
        alignSelf: 'flex-end',
        fontFamily: Fontes.base,
        fontSize: 11,
        color: Cores.cinza,
    },
    listaChips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        borderWidth: 2,
        borderColor: Cores.cinza,
        borderRadius: 999,
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    chipTexto: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        fontWeight: '700',
    },
    desc: {
        fontFamily: Fontes.base,
        fontSize: 11,
        color: Cores.cinza,
    },
    erroTexto: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        fontWeight: '600',
        color: Cores.rosa,
        backgroundColor: 'rgba(255,203,203,0.3)',
        padding: 10,
        borderRadius: 12,
    },
})