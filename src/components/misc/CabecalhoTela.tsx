import { 
    Pressable, 
    StyleSheet, 
    Text, 
    View
} from 'react-native'
import { router } from 'expo-router'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'

export function CabecalhoTela({ titulo }: { titulo: string }) {
    return (
        <View style={styles.cabecalho}>

            <Pressable onPress={() => router.back()} hitSlop={12} accessibilityLabel="Voltar">
                <FontAwesomeFreeSolid name="arrow-left" size={20} color={Cores.preto} />
            </Pressable>

            <Text style={styles.titulo}>{titulo}</Text>
            <View style={styles.espaco} />
            
        </View>
    )
}

const styles = StyleSheet.create({
    cabecalho: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: Cores.cinza,
    },
    titulo: {
        fontFamily: Fontes.base,
        fontSize: Fontes.M,
        fontWeight: '700',
        color: Cores.preto,
    },
    espaco: { 
        width: 20 
    },
})