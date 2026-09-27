import { 
    Pressable, 
    StyleSheet, 
    Text, 
    View, 
    Image
} from 'react-native'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'

const estrela = require('@/assets/images/estrela1.png')

interface ChipClicavelProps {
    texto: string
    cor: string
    selecionado?: boolean
    onPress?: () => void
}

export function ChipClicavel({
    texto,
    cor,
    selecionado,
    onPress,
}: ChipClicavelProps) {
    return (

        <Pressable
        onPress={onPress}
        style={({ pressed }) => [ styles.chip, {
                backgroundColor: selecionado
                    ? cor
                    : Cores.branco,
            },
            selecionado && styles.ativo,
            pressed && styles.pressionado,
        ]}
        >
            <Image
            source={estrela}
            style={styles.estrela}
            resizeMode="contain"
            />

            <Text style={[ styles.texto, selecionado && styles.textoAtivo ]} >
                {texto}
            </Text>

            <Image
            source={estrela}
            style={styles.estrela}
            resizeMode="contain"
            />

        </Pressable>
        
    )
}

const styles = StyleSheet.create({
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 24,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 3,
        borderColor: Cores.cinza,
    },

    ativo: {
        borderColor: Cores.preto,
        transform: [{ translateY: -1 }],
    },

    pressionado: {
        opacity: 0.7,
    },

    texto: {
        fontFamily: Fontes.base,
        fontSize: 16,
        fontWeight: '700',
        color: Cores.cinza,
    },

    textoAtivo: {
        color: Cores.preto,
    },
    estrela: {
        width: 12,
        height: 12,
        tintColor: Cores.preto,
    },
})