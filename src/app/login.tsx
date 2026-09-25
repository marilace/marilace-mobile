import { Botao } from "@/components/buttons/Botao";
import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";
import { useAutenticacao } from "@/hooks/useAutenticacao";
import { UsuarioTipo } from "@/types/Usuario";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [usuario, setUsuario] = useState<UsuarioTipo>({
    uid: "",
    nome: "",
    email: "",
    senha: "",
  });

  const { validarUsuario, logarContexto } = useAutenticacao();

  const verificarUsuario = async () => {
    if (!usuario.email || !usuario.senha) {
      Alert.alert(
        "Campos obrigatórios",
        "Por favor, informe um e-mail e senha.",
      );
      return;
    }

    let retorno = await validarUsuario(usuario.email, usuario.senha);

    if (retorno == "sucesso") {
      await logarContexto(usuario);

      router.push("/(logado)/home");
    } else {
      Alert.alert("Falha de autenticação", retorno, [{ text: "OK" }], {
        cancelable: false,
      });
    }
  };

  const abrirRegistro = () => {
    router.push("/registro");
  };

  const voltar = () => {
    router.push("/");
  };

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="dark-content" />
      <Pressable style={styles.cabecalho} onPress={voltar}>
        <FontAwesomeFreeSolid
          name="arrow-left"
          color={Cores.branco}
          size={24}
          style={styles.voltar}
        />
      </Pressable>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "android" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.conteudo}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.titulo}>Log-in</Text>

          <Text style={styles.rotulo}>E-mail</Text>
          <View style={styles.sombra}>
            <TextInput
              style={styles.campo}
              value={usuario.email}
              onChangeText={(valor) => setUsuario({ ...usuario, email: valor })}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <Text style={styles.rotulo}>Senha</Text>
          <View style={styles.sombra}>
            <TextInput
              style={styles.campo}
              value={usuario.senha}
              onChangeText={(valor) => setUsuario({ ...usuario, senha: valor })}
              autoCapitalize="none"
              autoComplete="password"
            />
          </View>

          <View style={styles.acoes}>
            <Botao texto="Entrar" onPress={verificarUsuario} />

            <Pressable onPress={abrirRegistro} style={styles.link}>
              <FontAwesomeFreeSolid name="user-plus" color={Cores.branco} />
              <Text style={styles.textoLink}>
                Não tem uma conta? Registre-se
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  tela: {
    flex: 1,
    backgroundColor: Cores.primaria,
  },
  cabecalho: {
    margin: 8,
  },
  voltar: {
    padding: 12,
  },
  conteudo: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 8,
    marginTop: -24,
  },
  titulo: {
    alignSelf: "center",
    marginBottom: 16,
    fontFamily: Fontes.logo,
    fontSize: Fontes.XXG,
    color: Cores.branco,
  },
  rotulo: {
    fontFamily: Fontes.base,
    fontSize: Fontes.P,
    fontWeight: "600",
    color: Cores.branco,
    marginLeft: 24,
  },
  sombra: {
    alignSelf: "center",
    backgroundColor: Cores.preto,
    borderRadius: 999,
    paddingBottom: 4,
    width: 360,
    marginBottom: 4,
  },
  campo: {
    alignItems: "center",
    backgroundColor: Cores.branco,
    borderWidth: 3,
    borderColor: Cores.preto,
    borderRadius: 999,
    paddingHorizontal: 14,
    fontFamily: Fontes.base,
    fontSize: Fontes.M,
    color: Cores.preto,
  },
  acoes: { marginTop: 8, gap: 20 },
  link: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
  },
  textoLink: {
    color: Cores.branco,
    fontFamily: Fontes.base,
    fontSize: Fontes.P,
    fontWeight: 600,
  },
});
