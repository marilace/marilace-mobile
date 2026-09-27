import { 
    Image, 
    StyleSheet, 
    Text, 
    View 
} from 'react-native'
import { Cores } from '@/constants/Cores'

const estrela = require('@/assets/images/estrela1.png')

interface ChipProps {
    texto: string
    cor: string
}

export function Chip({ texto, cor }: ChipProps) {
    return (
        <View style={[ styles.chip, { backgroundColor: cor } ]}>
            
            <Image
            source={estrela}
            style={styles.estrela}
            resizeMode="contain"
            />

            <Text style={styles.texto}>
                {texto}
            </Text>

            <Image
            source={estrela}
            style={styles.estrela}
            resizeMode="contain"
            />

        </View>
    )
}

const styles = StyleSheet.create({
    chip: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        alignSelf: 'flex-start',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 999,
        borderWidth: 3,
        borderColor: Cores.preto,
    },

    texto: {
        fontSize: 14,
        color: Cores.preto,
        fontWeight: '600',
    },

    estrela: {
        width: 12,
        height: 12,
        tintColor: Cores.preto,
    },
})