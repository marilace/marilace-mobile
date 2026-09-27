import { useState } from 'react'
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'
import { useSalvo } from '@/hooks/useSalvos'
import { Cores } from '@/constants/Cores'

interface ArtigoBlogProps {
    id: string
    src: string
    titulo: string
    descricao: string
}

export function ArtigoBlog({
    id,
    src,
    titulo,
    descricao,
}: ArtigoBlogProps) {
    const { salvo, alternarSalvo, salvando } = useSalvo(id, 'artigo')

    const [favorito, setFavorito] = useState(false)

    return (
        <View style={styles.card}>
            <Image
            source={{ uri: src }}
            style={styles.cardImg}
            resizeMode="cover"
            />

            <View style={styles.cardInfo}>
                <View style={styles.cardTexto}>
                    <Text
                    style={styles.titulo}
                    numberOfLines={3}
                    >
                        {titulo}
                    </Text>

                    <Text
                    style={styles.descricao}
                    numberOfLines={5}
                    >
                        "{descricao}"
                    </Text>
                </View>

                <View style={styles.cardIcones}>
                    <Pressable
                    style={({ pressed }) => [
                        styles.iconBtn,
                        pressed && styles.iconBtnPressed,
                    ]}
                    onPress={alternarSalvo}
                    disabled={salvando}
                    accessibilityLabel="Salvar artigo"
                    accessibilityRole="button"
                    >
                        <FontAwesomeFreeSolid
                        name="bookmark"
                        size={24}
                        color={
                            salvo
                            ? Cores.primariaEscura
                            : Cores.preto
                        }
                        />
                    </Pressable>

                    <Pressable
                    style={({ pressed }) => [
                        styles.iconBtn,
                        pressed && styles.iconBtnPressed,
                    ]}
                    onPress={() => setFavorito(!favorito)}
                    accessibilityLabel="Favoritar artigo"
                    accessibilityRole="button"
                    >
                        <FontAwesomeFreeSolid
                        name="star"
                        size={20}
                        color={
                            favorito
                                ? Cores.primaria
                                : Cores.preto
                        }
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 400,
        maxWidth: '100%',
        backgroundColor: Cores.branco,
        borderRadius: 16,
        padding: 8,
        overflow: 'hidden',
    },

    cardImg: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },

    cardInfo: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 8,
        padding: 16,
    },

    cardTexto: {
        flex: 1,
    },

    titulo: {
        marginBottom: 6,
        fontSize: 16,
        fontWeight: '700',
        color: Cores.preto,
    },

    descricao: {
        fontSize: 13,
        lineHeight: 18,
        color: Cores.cinza,
    },

    cardIcones: {
        flexDirection: 'column',
        gap: 10,
        flexShrink: 0,
    },

    iconBtn: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },

    iconBtnPressed: {
        opacity: 0.6,
        transform: [{ scale: 0.92 }],
    },
})