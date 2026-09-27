import { useEffect, useState } from 'react'
import { 
    Image, 
    Modal, 
    Pressable, 
    StyleSheet, 
    Text, 
    TextInput, 
    View 
} from 'react-native'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { usePublicacoes } from '@/hooks/usePublicacoes'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'

type ModalEditarPostagemProps = {
    aberto: boolean;
    postId: string;
    conteudoAtual: string;
    imagemUrl?: string | null;
    fechar: () => void;
};

export function ModalEditarPostagem({ aberto, postId, conteudoAtual, imagemUrl, fechar }: ModalEditarPostagemProps) {
    const { editarPublicacao } = usePublicacoes()

    const [texto, setTexto] = useState(conteudoAtual)
    const [salvando, setSalvando] = useState(false)
    const [erro, setErro] = useState('')

    useEffect(() => {
        if (aberto) {
            setTexto(conteudoAtual)
            setErro('')
        }
    }, [aberto, conteudoAtual])

    const salvar = async () => {
        if (!texto.trim()) {
            setErro('A publicação não pode ficar vazia.')
            return
        }

        setSalvando(true)
        setErro('')

        try {
            await editarPublicacao(postId, texto.trim())
            fechar()
        } catch (e) {
            setErro('Não foi possível salvar as alterações. Tente novamente.')
        } finally {
            setSalvando(false)
        }
    }

    return (
        <Modal visible={aberto} transparent animationType="fade" onRequestClose={fechar}>
            <Pressable style={styles.overlay} onPress={fechar} />

            <View style={styles.container}>
                <View style={styles.cabecalho}>
                    <Text style={styles.titulo}>Editar publicação</Text>
                    <Pressable style={styles.btnFechar} onPress={fechar} accessibilityLabel="Fechar">
                        <FontAwesomeFreeSolid name="xmark" size={18} color={Cores.preto} />
                    </Pressable>
                </View>

                <TextInput
                style={styles.inputEdicao}
                multiline
                maxLength={300}
                value={texto}
                onChangeText={setTexto}
                editable={!salvando}
                placeholder="O que você está pensando?"
                />
                <Text style={styles.contador}>{texto.length}/300</Text>

                {imagemUrl && (
                    <Image source={{ uri: imagemUrl }} style={styles.previewImagem} />
                )}

                {erro ? <Text style={styles.erroTexto}>{erro}</Text> : null}

                <View style={styles.acoes}>
                    <Pressable style={styles.btnCancelar} onPress={fechar} disabled={salvando}>
                        <Text style={styles.btnCancelarTexto}>Cancelar</Text>
                    </Pressable>
                    <Pressable style={styles.btnSalvar} onPress={salvar} disabled={salvando}>
                        <Text style={styles.btnSalvarTexto}>
                            {salvando ? 'Salvando...' : 'Salvar alterações'}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
        position: 'absolute',
        left: 20,
        right: 20,
        top: '20%',
        backgroundColor: Cores.branco,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: Cores.cinza,
        padding: 24,
        gap: 8,
    },
    cabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titulo: {
        fontFamily: Fontes.base,
        fontSize: Fontes.M,
        fontWeight: '800',
        color: Cores.primariaEscura,
    },
    btnFechar: {
        padding: 4,
    },
    inputEdicao: {
        minHeight: 100,
        textAlignVertical: 'top',
        borderWidth: 2,
        borderColor: Cores.cinza,
        borderRadius: 16,
        padding: 12,
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        color: Cores.preto,
    },
    contador: {
        alignSelf: 'flex-end',
        fontFamily: Fontes.base,
        fontSize: 11,
        color: Cores.cinza,
    },
    previewImagem: {
        width: '100%',
        height: 180,
        borderRadius: 16,
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
    acoes: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        marginTop: 8,
    },
    btnCancelar: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    btnCancelarTexto: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        fontWeight: '600',
        color: Cores.cinza,
    },
    btnSalvar: {
        backgroundColor: Cores.verde,
        borderWidth: 2,
        borderColor: Cores.preto,
        borderRadius: 999,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    btnSalvarTexto: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        fontWeight: '700',
        color: Cores.preto,
    },
})