import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Post } from '@/components/Post'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'

export default function Forum() {
    return (
        <SafeAreaView style={styles.tela}>
            <StatusBar style="dark" />
            <View style={styles.cabecalho}>
                <Text style={styles.logo}>ml</Text>

                <View style={styles.btnPerfil} accessibilityLabel="Perfil">
                <FontAwesomeFreeSolid name="user" size={16} color={Cores.primariaEscura} />
                </View>
            </View>
            <Post
            postId='aaa'
            authorId='aaa'
            avatarSrc='aaa'
            nome='emilly'
            username='emilly'
            tempo='1d'
            conteudo='merda'
            curtidas={0}
            comentarios={0}
            compartilhamentos={0}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    tela: { 
        flex: 1, 
        backgroundColor: Cores.branco 
    },
    cabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 12,
    },
    logo: { 
        fontFamily: Fontes.logo, 
        fontSize: 32, 
        color: Cores.primaria 
    },
    btnPerfil: {
        width: 34,
        height: 34,
        borderRadius: 17,
        borderWidth: 2,
        borderColor: Cores.primariaEscura,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lista: { 
        flex: 1 
    },
    separador: { 
        height: 1, backgroundColor: Cores.cinza
    },
})