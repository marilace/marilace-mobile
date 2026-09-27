import { 
    Modal, 
    Pressable, 
    StyleSheet, 
    Text, 
    View } from 'react-native'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'

type ModalConfirmacaoProps = {
    aberto: boolean;
    titulo: string;
    mensagem: string;
    textoConfirmar?: string;
    textoCancelar?: string;
    confirmando?: boolean;
    confirmar: () => void;
    cancelar: () => void;
};

export function ModalConfirmacao({
    aberto,
    titulo,
    mensagem,
    textoConfirmar = 'Excluir',
    textoCancelar = 'Cancelar',
    confirmando = false,
    confirmar,
    cancelar,
}: ModalConfirmacaoProps) {
    return (
        <Modal visible={aberto} transparent animationType="fade" onRequestClose={cancelar}>
            <Pressable style={styles.overlay} onPress={cancelar} />

            <View style={styles.modal}>
                <FontAwesomeFreeSolid name="triangle-exclamation" size={48} color={Cores.rosa} />

                <Text style={styles.titulo}>{titulo}</Text>
                <Text style={styles.mensagem}>{mensagem}</Text>

                <View style={styles.acoes}>
                    <Pressable
                    style={styles.btnCancelar}
                    onPress={cancelar}
                    disabled={confirmando}
                    >
                        <Text style={styles.btnCancelarTexto}>{textoCancelar}</Text>
                    </Pressable>
                    <Pressable
                    style={styles.btnConfirmar}
                    onPress={confirmar}
                    disabled={confirmando}
                    >
                        <Text style={styles.btnConfirmarTexto}>
                            {confirmando ? 'Excluindo...' : textoConfirmar}
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
    modal: {
        position: 'absolute',
        left: 24,
        right: 24,
        top: '30%',
        backgroundColor: Cores.branco,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: Cores.cinza,
        padding: 32,
        alignItems: 'center',
        gap: 8,
    },
    titulo: {
        fontFamily: Fontes.base,
        fontSize: Fontes.M,
        fontWeight: '800',
        color: Cores.primariaEscura,
        textAlign: 'center',
    },
    mensagem: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        fontWeight: '500',
        color: Cores.cinza,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 8,
    },
    acoes: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
        marginTop: 8,
    },
    btnCancelar: {
        flex: 1,
        borderWidth: 2,
        borderColor: Cores.cinza,
        borderRadius: 999,
        paddingVertical: 10,
        alignItems: 'center',
    },
    btnCancelarTexto: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        fontWeight: '700',
        color: Cores.cinza,
    },
    btnConfirmar: {
        flex: 1,
        backgroundColor: Cores.rosa,
        borderWidth: 2,
        borderColor: Cores.preto,
        borderRadius: 999,
        paddingVertical: 10,
        alignItems: 'center',
    },
    btnConfirmarTexto: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        fontWeight: '700',
        color: Cores.preto,
    },
})