import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'

type BotaoProps = {
    texto: string
    onPress: () => void
    cor?: string
}

export function Botao({ texto, onPress, cor = Cores.verde }: BotaoProps) {
    return (
        <View style={styles.sombra}>
            <Pressable
                onPress={onPress}
                accessibilityRole="button"
                style={({ pressed }) => [
                styles.botao,
                { backgroundColor: cor },
                pressed && styles.pressionado,
                ]}
            >
                <Text style={styles.texto}>{texto}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    sombra: {
        alignSelf: 'center',
        backgroundColor: Cores.preto,
        borderRadius: 999,
        paddingBottom: 4,
    },
    botao: {
        paddingVertical: 8,
        paddingHorizontal: 56,
        borderWidth: 3,
        borderColor: Cores.preto,
        borderRadius: 999,
        alignItems: 'center',
    },
    pressionado: { transform: [{ translateY: 3 }] },
    texto: {
        fontFamily: Fontes.base,
        fontSize: Fontes.M,
        fontWeight: '700',
        color: Cores.preto,
    },
})