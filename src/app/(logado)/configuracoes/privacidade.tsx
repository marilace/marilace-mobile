import { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { CabecalhoTela } from '@/components/misc/CabecalhoTela'
import { ItemConfiguracao } from '@/components/misc/ItemConfiguracao'
import { ToggleSwitch } from '@/components/buttons/ToggleSwitch'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'

export default function ConfigPrivacidade() {
    const [perfilPublico, setPerfilPublico] = useState(true)
    const [mostrarEmail, setMostrarEmail] = useState(false)
    const [permitirMensagens, setPermitirMensagens] = useState(true)

    return (
        <SafeAreaView style={configStyles.tela}>
            <StatusBar style="dark" />
            <CabecalhoTela titulo="Privacidade" />

            <ScrollView contentContainerStyle={configStyles.conteudo}>

                <ItemConfiguracao icone="eye" titulo="Perfil público" descricao="Qualquer pessoa pode ver o seu perfil">
                    <ToggleSwitch ativo={perfilPublico} onChange={() => setPerfilPublico((v) => !v)} label="Perfil público" />
                </ItemConfiguracao>

                <ItemConfiguracao icone="envelope" titulo="Mostrar e-mail no perfil" descricao="Exibe seu e-mail para outras usuárias">
                    <ToggleSwitch ativo={mostrarEmail} onChange={() => setMostrarEmail((v) => !v)} label="Mostrar e-mail no perfil" />
                </ItemConfiguracao>

                <ItemConfiguracao icone="comment" titulo="Permitir mensagens" descricao="Outras usuárias podem te enviar mensagens">
                    <ToggleSwitch ativo={permitirMensagens} onChange={() => setPermitirMensagens((v) => !v)} label="Permitir mensagens diretas" />
                </ItemConfiguracao>

            </ScrollView>
            
        </SafeAreaView>
    )
}

export const configStyles = StyleSheet.create({
    tela: { 
        flex: 1, 
        backgroundColor: Cores.branco 
    },
    conteudo: { 
        padding: 20, 
        paddingBottom: 40 
    },
    categoria: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        color: Cores.primaria,
        marginTop: 20,
        marginBottom: 4,
    },
    linkAcao: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        fontWeight: '700',
        color: Cores.primariaEscura,
    },
})