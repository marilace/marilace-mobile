import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar'

export default function AuthLayout(){
    return(
        <SafeAreaProvider>
            <StatusBar style='light'/>
                <Stack screenOptions={{headerShown: false}}>
            </Stack>
        </SafeAreaProvider>
    )
}