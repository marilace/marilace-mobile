import { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { CabecalhoTela } from '@/components/misc/CabecalhoTela'
import { ItemConfiguracao } from '@/components/misc/ItemConfiguracao'
import { ToggleSwitch } from '@/components/buttons/ToggleSwitch'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'

export default function ConfigNotificacoes() {
    const [notifPush, setNotifPush] = useState(true)
    const [notifEmail, setNotifEmail] = useState(true)
    const [notifSom, setNotifSom] = useState(false)

    return (
        <SafeAreaView style={configStyles.tela}>
            <StatusBar style="dark" />
            <CabecalhoTela titulo="Notificações" />

            <ScrollView contentContainerStyle={configStyles.conteudo}>

                <ItemConfiguracao icone="bell" titulo="Notificações push" descricao="Avisos em tempo real no aparelho">
                    <ToggleSwitch ativo={notifPush} onChange={() => setNotifPush((v) => !v)} label="Notificações push" />
                </ItemConfiguracao>

                <ItemConfiguracao icone="envelope" titulo="Notificações por e-mail" descricao="Receba um resumo por e-mail">
                    <ToggleSwitch ativo={notifEmail} onChange={() => setNotifEmail((v) => !v)} label="Notificações por e-mail" />
                </ItemConfiguracao>

                <ItemConfiguracao icone="volume-high" titulo="Som de notificação" descricao="Toca um som ao receber notificações">
                    <ToggleSwitch ativo={notifSom} onChange={() => setNotifSom((v) => !v)} label="Som de notificação" />
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