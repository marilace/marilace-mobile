import { useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Botao } from '@/components/Botao'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'
import { UsuarioTipo } from '@/types/Usuario'
import { useAutenticacao } from '@/hooks/useAutenticacao'

export default function Registro() {
    const [usuario, setUsuario] = useState<UsuarioTipo>(
        {uid: '', nome: '', username:'', email: '', senha: '',}
    )

    const autenticacao = useAutenticacao()

    const salvar = async () => {

        if (!usuario.email || !usuario.senha) {
            Alert.alert(
                "Erro no Cadastro", 
                "Por favor, preencha os campos obrigatórios."
            )
            return
        }

        let retorno = await autenticacao.criarAutenticacaoUsuario(usuario.email, usuario.senha)

        if (retorno == 'sucesso') {

            Alert.alert(
                'Novo usuário',
                `Boas-vindas ${usuario.nome}!`,
                [
                    {
                        text: 'Ok',
                        onPress: () => router.push('/')
                    },
                ]
            );

        }else {

            Alert.alert(
                'Novo usuário',
                retorno,
                [{ text: 'OK' }],
                { cancelable: false }
            )
        }

    }

    const voltar = () => {
        router.push('/')
    }

    const abrirLogin = () => {
        router.push('/login')
    }


    return (
        <SafeAreaView style={styles.tela}>
                <StatusBar barStyle="dark-content" />
                <Pressable style={ styles.cabecalho } onPress={voltar}>
                    <FontAwesomeFreeSolid name='arrow-left' color={Cores.branco} size={24} style={styles.voltar}/>
                </Pressable>
                <KeyboardAvoidingView
                    style={styles.flex}
                    behavior={Platform.OS === 'android' ? 'padding' : undefined}
                >
                    <ScrollView
                        contentContainerStyle={styles.conteudo}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={styles.titulo}>Registro</Text>

                        <Text style={ styles.rotulo }>Nome</Text>
                        <View style={ styles.sombra }>
                            <TextInput
                                style={ styles.campo }
                                autoCapitalize="sentences"
                                value={usuario.nome}
                                onChangeText={(valor) => setUsuario({...usuario, nome: valor})}
                            />
                        </View>

                        <Text style={ styles.rotulo }>Nome de usuário</Text>
                        <View style={ styles.sombra }>
                            <TextInput
                                style={ styles.campo }
                                autoCapitalize="none"
                                value={usuario.username}
                                onChangeText={(valor) => setUsuario({...usuario, username: valor})}
                            />
                        </View>

                        <Text style={ styles.rotulo }>E-mail</Text>
                        <View style={ styles.sombra }>
                            <TextInput
                                style={ styles.campo }
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                                value={usuario.email}
                                onChangeText={(valor) => setUsuario({...usuario, email: valor})}
                            />
                        </View>

                        <Text style={ styles.rotulo }>Senha</Text>
                        <View style={styles.sombra}>
                            <TextInput
                                style={ styles.campo }
                                placeholderTextColor={Cores.cinza}
                                autoCapitalize="none"
                                autoComplete="password"
                                value={usuario.senha}
                                onChangeText={(valor) => setUsuario({...usuario, senha: valor})}
                            />
                        </View>

                        <Text style={ styles.rotulo }>Confirmar senha</Text>
                        <View style={styles.sombra}>
                            <TextInput
                                style={ styles.campo }
                                placeholderTextColor={Cores.cinza}
                                autoCapitalize="none"
                                autoComplete="password"
                            />
                        </View>

                        <View style={styles.acoes}>
                            <Botao texto="Entrar" onPress={salvar} />

                            <Pressable onPress={ abrirLogin } style={ styles.link }>
                                <FontAwesomeFreeSolid name="right-to-bracket" color={Cores.branco}/>
                                <Text style={ styles.textoLink }>Não tem uma conta? Registre-se</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    tela: { 
        flex: 1, 
        backgroundColor: Cores.primaria 
    },
        cabecalho:{
        margin: 8,
    },
    voltar:{
        padding: 12,
    },
    conteudo: {
        flexGrow: 1,
        justifyContent: 'center', // no login o conteúdo fica centralizado na vertical
        paddingHorizontal: 16,
        paddingVertical: 32,
        gap: 8,
    },
    titulo: {
        alignSelf: 'center',
        marginBottom: 16,
        fontFamily: Fontes.logo,
        fontSize: Fontes.XXG,
        color: Cores.branco,
    },
    rotulo: {
        fontFamily: Fontes.base,
        fontSize: Fontes.P,
        fontWeight: '600',
        color: Cores.branco,
        marginLeft: 24
    },
    sombra: {
        alignSelf: 'center',
        backgroundColor: Cores.preto,
        borderRadius: 999,
        paddingBottom: 4,
        width: 400,
        marginBottom: 4
    },
    campo: {
        alignItems: 'center',
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
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        justifyContent: 'center'
    },
    textoLink: {
        color: Cores.branco,
        fontFamily: Fontes.base,
        fontSize: Fontes.P,
        fontWeight: 600,
    }
})