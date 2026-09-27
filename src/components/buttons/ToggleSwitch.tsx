import { Pressable, StyleSheet, View } from 'react-native'
import { Cores } from '@/constants/Cores'

interface ToggleSwitchProps {
    ativo: boolean
    onChange: () => void
    label: string
}

export function ToggleSwitch({ ativo, onChange, label }: ToggleSwitchProps) {
    return (
        <Pressable
        onPress={onChange}
        accessibilityRole="switch"
        accessibilityState={{ checked: ativo }}
        accessibilityLabel={label}
        style={[styles.switch, ativo && styles.ativo]}
        >
            <View style={[styles.bolinha, ativo && styles.bolinhaAtiva]} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    switch: {
        width: 48,
        height: 30,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: Cores.preto,
        backgroundColor: Cores.cinza,
        justifyContent: 'center',
        paddingHorizontal: 2,
    },
    ativo: { 
        backgroundColor: Cores.verde
    },
    bolinha: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: Cores.branco,
        borderWidth: 2,
        borderColor: Cores.preto,
    },
    bolinhaAtiva: { alignSelf: 'flex-end' },
})