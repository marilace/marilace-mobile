import { useEffect, useRef } from 'react'
import {
    Animated,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { Cores } from '@/constants/Cores'
const estrela = require('@/assets/images/estrelaCarregamento.png')

export function TelaCarregamento() {
    const rotacao = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const animacao = Animated.loop(
            Animated.timing(rotacao, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            })
        )

        animacao.start()

        return () => {
            animacao.stop()
        }
    }, [rotacao])

    const rotacaoInterpolada = rotacao.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    })

    return (
        <View style={styles.telaCarregamento}>
            <Animated.View
                style={[
                    styles.estrelaContainer,
                    {
                        transform: [
                            {
                                rotate: rotacaoInterpolada,
                            },
                        ],
                    },
                ]}
            >
                <Image
                source={estrela}
                style={styles.estrela}
                resizeMode="contain"
                />
            </Animated.View>

            <Text style={styles.texto}>
                Carregando...
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    telaCarregamento: {
        flex: 1,
        backgroundColor: Cores.branco,
        alignItems: 'center',
        justifyContent: 'center',
    },

    estrelaContainer: {
        width: 80,
        height: 80,
    },

    estrela: {
        width: '100%',
        height: '100%',
        tintColor: Cores.primaria,
    },

    texto: {
        marginTop: 24,
        fontSize: 20,
        color: Cores.primaria,
        fontWeight: '600',
    },
})