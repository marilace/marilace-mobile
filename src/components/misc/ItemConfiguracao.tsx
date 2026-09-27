import { StyleSheet, Text, View } from 'react-native'
import type { ReactNode } from 'react'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { FontAwesomeFreeSolid, type FontAwesomeFreeSolidIconName } from '@react-native-vector-icons/fontawesome-free-solid'

interface ItemConfiguracaoProps {
    icone: FontAwesomeFreeSolidIconName
    titulo: string
    descricao?: string
    children: ReactNode
}

export function ItemConfiguracao({ icone, titulo, descricao, children }: ItemConfiguracaoProps) {
    return (
        <View style={styles.item}>
            <View style={styles.info}>
                <View style={styles.iconWrapper}>
                    <FontAwesomeFreeSolid name={icone} size={16} color={Cores.primaria} />
                </View>
                <View style={styles.textos}>
                    <Text style={styles.titulo}>{titulo}</Text>
                    {descricao && <Text style={styles.descricao}>{descricao}</Text>}
                </View>
            </View>
            <View style={styles.controle}>{children}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(174,170,178,0.3)',
    },
    info: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        flex: 1,
    },
    iconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(195,160,238,0.12)',
    },
    textos: { flex: 1 },
    titulo: {
        fontFamily: Fontes.base,
        fontSize: Fontes.P,
        fontWeight: '600',
        color: Cores.preto,
    },
    descricao: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        color: Cores.cinza,
        marginTop: 2,
    },
    controle: { flexShrink: 0 },
})