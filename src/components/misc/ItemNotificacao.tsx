import { 
    Pressable, 
    StyleSheet, 
    Text, 
    View 
} from 'react-native'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'
import type { NotificacaoTipo, TipoNotificacao } from '@/types/Notificacao'
import { formatarTempo } from '@/utils/formatarTempo'

type NomeIcone = React.ComponentProps<typeof FontAwesomeFreeSolid>['name']

const iconePorTipo: Record<TipoNotificacao, NomeIcone> = {
    curtida: 'star',
    seguidor: 'user-plus',
    comentario: 'comment',
    mencao: 'at',
    sistema: 'face-smile',
}

const corPorTipo: Record<TipoNotificacao, string> = {
    curtida: Cores.rosa,
    seguidor: Cores.primariaEscura,
    comentario: Cores.verde,
    mencao: Cores.verde,
    sistema: Cores.primaria,
}

interface ItemNotificacaoProps {
    notificacao: NotificacaoTipo
    onPress?: () => void
}

export function ItemNotificacao({ notificacao, onPress }: ItemNotificacaoProps) {
    return (
        <Pressable style={[styles.container, !notificacao.lida && styles.naoLida]} onPress={onPress}>
            <View style={[styles.icone, { backgroundColor: corPorTipo[notificacao.tipo] }]}>
                <FontAwesomeFreeSolid name={iconePorTipo[notificacao.tipo]} size={16} color={Cores.branco} />
            </View>

            <View style={styles.textos}>
                <Text style={styles.titulo}>{notificacao.titulo}</Text>
                <Text style={styles.mensagem}>{notificacao.mensagem}</Text>
                <Text style={styles.tempo}>{formatarTempo(notificacao.createdAt)}</Text>
            </View>

            {!notificacao.lida && <View style={styles.pontoNaoLido} />}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 12, 
        paddingVertical: 14, 
        paddingHorizontal: 16,
        borderRadius: 8 
    },
    naoLida: { 
        backgroundColor: 'rgba(195, 160, 238, .1)' 
    },
    icone: { 
        width: 38, 
        height: 38, 
        borderRadius: 19, 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexShrink: 0 
    },
    textos: { 
        flex: 1 
    },
    titulo: { 
        fontFamily: Fontes.base,
        fontSize: Fontes.P, 
        fontWeight: '700',
        color: Cores.preto },
    mensagem: { 
        fontFamily: Fontes.base,
        fontSize: Fontes.PP, 
        color: Cores.cinza, 
        marginTop: 2 
        },
    tempo: {
        fontFamily: Fontes.base,
        fontSize: 11, 
        color: Cores.cinza,
        marginTop: 4
    },
    pontoNaoLido: {
        width: 8, 
        height: 8, 
        borderRadius: 999,
        backgroundColor: Cores.primaria, 
        flexShrink: 0 
    },
})