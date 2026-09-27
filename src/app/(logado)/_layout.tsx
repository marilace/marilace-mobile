import { Stack, usePathname } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { View, StyleSheet } from 'react-native'
import { NavBar } from '@/components/links/NavBar'

export default function AuthLayout() {

    const pathname = usePathname()
    const mostrarNavBar = pathname !== '/novo-post'

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="home" />
                    <Stack.Screen name="perfil/[username]" />
                    <Stack.Screen name="blog" />
                    <Stack.Screen name="notificacoes" />
                    <Stack.Screen name="salvos" />
                    <Stack.Screen name="novo-post" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="editar-perfil" options={{ presentation: 'modal' }} />
                </Stack>
                {mostrarNavBar && <NavBar />}
            </View>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})