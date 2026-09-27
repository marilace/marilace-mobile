import { 
    Modal, 
    Pressable, 
    StyleSheet, 
    Text, 
    View 
} from 'react-native'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'

type ModalAcoesPostagemProps = {
    aberto: boolean
    fechar: () => void
    onEditar: () => void
    onExcluir: () => void
}

export function ModalAcoesPostagem({ aberto, fechar, onEditar, onExcluir }: ModalAcoesPostagemProps) {
    return (
        <Modal visible={aberto} transparent animationType="fade" onRequestClose={fechar}>
            <Pressable style={styles.overlay} onPress={fechar} />

            <View style={styles.folha}>
                <View style={styles.puxador} />

                <Pressable style={styles.item} onPress={onEditar}>
                    <FontAwesomeFreeSolid name="pen" size={16} color={Cores.primariaEscura} />
                    <Text style={styles.itemTexto}>Editar</Text>
                </Pressable>

                <Pressable style={styles.item} onPress={onExcluir}>
                    <FontAwesomeFreeSolid name="trash" size={16} color={Cores.rosa} />
                    <Text style={[styles.itemTexto, { color: Cores.rosa }]}>Excluir</Text>
                </Pressable>

                <Pressable style={styles.btnCancelar} onPress={fechar}>
                    <Text style={styles.btnCancelarTexto}>Cancelar</Text>
                </Pressable>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    folha: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Cores.branco,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 16,
        paddingBottom: 32,
        gap: 4,
    },
    puxador: {
        alignSelf: 'center',
        width: 40,
        height: 4,
        borderRadius: 999,
        backgroundColor: Cores.cinza,
        marginBottom: 12,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 14,
        paddingHorizontal: 8,
    },
    itemTexto: {
        fontFamily: Fontes.base,
        fontSize: Fontes.P,
        fontWeight: '600',
        color: Cores.preto,
    },
    btnCancelar: {
        marginTop: 8,
        paddingVertical: 14,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Cores.cinza,
    },
    btnCancelarTexto: {
        fontFamily: Fontes.base,
        fontSize: Fontes.P,
        fontWeight: '600',
        color: Cores.cinza,
    },
})