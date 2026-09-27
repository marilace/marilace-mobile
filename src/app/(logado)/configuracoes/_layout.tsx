import { Stack } from 'expo-router'

export default function ConfiguracoesLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="acessibilidade" />
            <Stack.Screen name="conta" />
            <Stack.Screen name="notificacoes" />
            <Stack.Screen name="privacidade" />
            <Stack.Screen name="sobre" />
        </Stack>
    )
}