import { useFonts } from 'expo-font'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'

export default function RootLayout(){

  const [fontes] = useFonts({
    MoonbaseAlpha: require("@/assets/fonts/MoonbaseAlpha-Regular.otf"),
    Outfit: require("@/assets/fonts/Outfit-VariableFont_wght.ttf"),
  })

  if (!fontes) {
    console.log('Carregando fontes...')
    return null
  }

  return (
    <SafeAreaProvider>
      <StatusBar style='light'/>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='index'/>
      </Stack>
    </SafeAreaProvider>
  )

}