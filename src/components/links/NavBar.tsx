import { Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Cores } from '@/constants/Cores'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'
import { router, usePathname } from 'expo-router'

export function NavBar() {
    const insets = useSafeAreaInsets()
    const pathname = usePathname()

    const abrirInicio = () => router.push('/(logado)/home')
    const abrirNovoPost = () => router.push('/(logado)/novo-post')
    const abrirBlog = () => router.push('/(logado)/blog')
    const abrirSalvos = () => router.push('/(logado)/salvos')
    const abrirConfiguracoes = () => router.push('/(logado)/configuracoes')

    return (
        <View style={[ styles.barra, { paddingBottom: insets.bottom } ]} >

            <Pressable
            onPress={abrirInicio}
            hitSlop={10}
            accessibilityLabel="Início"
            >
                <FontAwesomeFreeSolid
                name="house"
                size={20}
                color={
                    pathname === '/home'
                        ? Cores.branco
                        : Cores.preto
                }
                />
            </Pressable>

            <Pressable
            onPress={abrirBlog}
            hitSlop={10}
            accessibilityLabel="Blog"
            >
                <FontAwesomeFreeSolid
                name="book-open"
                size={20}
                color={
                    pathname === '/blog'
                        ? Cores.branco
                        : Cores.preto
                }
                />
            </Pressable>

            <View style={styles.sombra}>
                <Pressable
                onPress={abrirNovoPost}
                style={({ pressed }) => [ styles.botaoNovo, pressed && { transform: [{ scale: 0.95 }] }]}
                accessibilityLabel="Nova publicação"
                >
                    <FontAwesomeFreeSolid
                    name="pen"
                    size={20}
                    />
                </Pressable>
            </View>

            <Pressable
            onPress={abrirSalvos}
            hitSlop={10}
            accessibilityLabel="Salvos"
            >
                <FontAwesomeFreeSolid
                name="bookmark"
                size={20}
                color={
                    pathname === '/salvos'
                        ? Cores.branco
                        : Cores.preto
                }
                />
            </Pressable>

            <Pressable
            onPress={abrirConfiguracoes}
            hitSlop={10}
            accessibilityLabel="Configurações"
            >
                <FontAwesomeFreeSolid
                name="gear"
                size={20}
                color={
                    pathname === '/configuracoes'
                        ? Cores.branco
                        : Cores.preto
                }
                />
            </Pressable>
            
        </View>
    )
}

const styles = StyleSheet.create({
    barra: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 14,
        backgroundColor: Cores.primaria,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    botaoNovo: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: Cores.verde,
        borderWidth: 3,
        borderColor: Cores.preto,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sombra: {
        alignSelf: 'center',
        backgroundColor: Cores.preto,
        borderRadius: 999,
        paddingBottom: 4,
        width: 'auto',
        marginBottom: 4,
    },
})