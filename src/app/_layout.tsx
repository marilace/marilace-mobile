import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";
import { AutenticacaoProvider } from "@/contexts/AutenticacaoContexto";
import { useAutenticacao } from "@/hooks/useAutenticacao";
import {
    autenticacao,
    FirebaseError,
    signInWithEmailAndPassword,
} from "@/services/Firebase";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

function Validacoes() {
  const { usuarioContexto, carregando } = useAutenticacao();
  const segments = useSegments();
  const router = useRouter();

  const [mensagemErro, setMensagemErro] = useState("");
  const [conectadoFirebase, setConectadoFirebase] = useState(false);

  const [fontes] = useFonts({
    MoonbaseAlpha: require("@/assets/fonts/MoonbaseAlpha-Regular.otf"),
    Outfit: require("@/assets/fonts/Outfit-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    signInWithEmailAndPassword(
      autenticacao,
      "email_invalido@email.com",
      "123456",
    )
      .then(() => {
        //bloco nao executado
      })
      .catch((error) => {
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case "auth/user-not-found":
            case "auth/invalid-credential":
              console.log(
                `Conexão com o Firebase estabelecida com sucesso! ${error.code}`,
              );
              setConectadoFirebase(true);
              break;

            case "auth/api-key-not-valid.-please-pass-a-valid-api-key.":
              setMensagemErro("Chave de API do Firebase inválida!");
              break;

            case "auth/network-request-failed":
              setMensagemErro("Falha de rede! Verifique sua internet");
              break;

            case "auth/too-many-requests":
              setMensagemErro(
                "IP bloqueado temporariamente por excesso de tentativas.",
              );
              break;

            default:
              setMensagemErro(`Erro imprevisto! ${error.code}`);
              break;
          }
        } else {
          setMensagemErro(`Erro imprevisto! ${error.code}`);
        }
      });
  }, []);

  useEffect(() => {
    if ((conectadoFirebase && fontes && !carregando) || mensagemErro) {
      SplashScreen.hideAsync();
    }
  }, [conectadoFirebase, fontes, carregando, mensagemErro]);

  useEffect(() => {
    if (!conectadoFirebase || !fontes || !carregando) return;

    const grupoProtegido = segments[0] === "(logado)";

    if (!usuarioContexto && grupoProtegido) {
      router.replace("/"); //usuario nao logado: redireciona p/ login
    } else if (usuarioContexto && !grupoProtegido) {
      router.replace("/(logado)/home"); //usuario logado: forum
    }
  }, [usuarioContexto, conectadoFirebase, fontes, carregando, segments]);

  if (mensagemErro) {
    return (
      <SafeAreaView style={styles.tela}>
        <View style={styles.erro}>
          <FontAwesomeFreeSolid
            name="circle-exclamation"
            size={56}
            color={Cores.rosa}
          />
          <Text style={styles.erroMensagem}>{mensagemErro}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="registro" />
      </Stack>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <AutenticacaoProvider>
      <Validacoes />
    </AutenticacaoProvider>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    padding: 50,
    backgroundColor: Cores.branco,
  },
  erro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 8,
  },
  erroMensagem: {
    color: Cores.preto,
    fontFamily: Fontes.base,
    fontSize: Fontes.G,
    textAlign: "center",
    maxWidth: 400,
  },
});
