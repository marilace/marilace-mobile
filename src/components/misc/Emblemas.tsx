import { StyleSheet, Text, View } from 'react-native'
import { Fontes } from '@/constants/Fontes'
import { EMBLEMAS_DISPONIVEIS } from '@/constants/Emblemas'

interface EmblemasProps {
    ids?: string[]
}

export function Emblemas({ ids }: EmblemasProps) {
    if (!ids || ids.length === 0) return null

    return (
        <View style={styles.linha}>
            {EMBLEMAS_DISPONIVEIS
            .filter((emblema) => ids.includes(emblema.id))
            .map((emblema) => (
                <Text 
                key={emblema.id} 
                style={[styles.letra, { color: emblema.cor }]} 
                accessibilityLabel={emblema.texto}
                >
                    {emblema.letra}
                </Text>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    linha: { 
        flexDirection: 'row', 
        gap: 4 
    },
    letra: { 
        fontFamily: Fontes.logo, 
        fontSize: Fontes.P 
    },
})