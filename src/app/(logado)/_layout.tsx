import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar'

export default function AuthLayout(){
    return(
        <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="home" />
                <Stack.Screen
                    name="novo-post"
                    options={{ presentation: 'modal' }}
                />
            </Stack>
        </SafeAreaProvider>
    )
}