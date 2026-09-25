import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { Emblemas } from '../misc/Emblemas'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'

interface PostProps {
    postId: string;
    authorId: string;
    avatarSrc?: string;
    nome: string;
    username: string;
    tempo: string;
    imagemUrl?: string | null;
    conteudo: string;
    curtidas: number;
    comentarios: number;
    compartilhamentos: number;
    verificado?: boolean;
    emblemas?: string[];
}

export function Post({
    postId,
    authorId,
    avatarSrc,
    nome,
    username,
    tempo,
    imagemUrl,
    conteudo,
    curtidas,
    comentarios,
    compartilhamentos,
    verificado = false,
    emblemas
}: PostProps){

    const [curtido, setCurtido] = useState(false)
    const [salvo, setSalvo] = useState(false)

    const totalCurtidas = curtidas + (curtido ? 1 : 0)

    return (
        <View style={styles.card}>
            <View style={styles.cabecalho}>
                {/* Avatar padrão: círculo roxo com a marca */}
                <View style={styles.avatar}>
                    <Text style={styles.avatarTexto}>ml</Text>
                </View>

                <View style={styles.info}>
                    <View style={styles.nomeLinha}>
                        <Text style={styles.nome}>{nome}</Text>
                        {verificado && <FontAwesomeFreeSolid name="circle-check" size={13} color={Cores.verde} />}
                        <Emblemas ids={emblemas} />
                    </View>
                    <Text style={styles.usuario}>@{username} • {tempo}</Text>
                </View>

                <Pressable hitSlop={10} accessibilityLabel="Opções da publicação">
                    <FontAwesomeFreeSolid name="ellipsis" size={16} />
                </Pressable>
            </View>

            <Text style={styles.conteudo}>{conteudo}</Text>

            <View style={styles.rodape}>
                <View style={styles.acoes}>
                    <Pressable style={styles.acao} onPress={() => setCurtido((v) => !v)} accessibilityLabel="Curtir">
                        <FontAwesomeFreeSolid
                        name="star"
                        size={18}
                        color={curtido ? Cores.primaria : Cores.preto}
                        />
                        <Text style={styles.numero}>{totalCurtidas}</Text>
                    </Pressable>

                    <View style={styles.acao}>
                        <FontAwesomeFreeSolid name="comment" size={18} />
                        <Text style={styles.numero}>{comentarios}</Text>
                    </View>

                    <View style={styles.acao}>
                        <FontAwesomeFreeSolid name="share-nodes" size={18} />
                        <Text style={styles.numero}>{compartilhamentos}</Text>
                    </View>
                </View>

                <Pressable onPress={() => setSalvo((v) => !v)} hitSlop={10} accessibilityLabel="Salvar">
                    <FontAwesomeFreeSolid
                        name="bookmark"
                        size={18}
                        color={salvo ? Cores.primariaEscura : Cores.preto}
                    />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: Cores.branco,
    },
    cabecalho: { 
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        gap: 10 
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Cores.primaria,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarTexto: { 
        fontFamily: Fontes.logo, 
        fontSize: Fontes.M, 
        color: Cores.branco 
    },
    info: { 
        flex: 1 
    },
    nomeLinha: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 4 
    },
    nome: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.P, 
        fontWeight: '600', 
        color: Cores.preto 
    },
    usuario: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP, 
        color: Cores.cinza 
    },
    conteudo: {
        marginLeft: 50,
        marginTop: 6,
        marginBottom: 12,
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        color: Cores.preto,
    },
    rodape: {
        marginLeft: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    acoes: { 
        flexDirection: 'row', 
        gap: 18 
    },
    acao: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 6 
    },
    numero: { 
        fontFamily: Fontes.base, 
        fontSize: Fontes.PP, 
        color: Cores.preto 
    },
})