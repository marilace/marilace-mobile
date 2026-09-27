import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Chip } from '@/components/misc/Chip'
import { ArtigoBlog } from '@/components/post/ArtigoBlog'
import { TelaCarregamento } from '@/components/misc/TelaCarregamento'
import { useArtigos } from '@/hooks/useArtigos'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'

const logoComp = require('@/assets/images/logoCompacta.png')
const telefone = require('@/assets/images/telefone.png')
const mulherMegafone = require('@/assets/images/mulhermegafone.png')

const CORES_CATEGORIA: Record<string, string> = {
    'Ciência': Cores.verde,
    'Tecnologia': 'rgba(112, 69, 146, .8)',
    'Engenharia': Cores.primaria,
    'Matemática': Cores.rosa,
    'Questões de Gênero': Cores.primariaEscura,
}
const CATEGORIA_COR_PADRAO = Cores.cinza

function corDaCategoria(categoria: string) {
    return CORES_CATEGORIA[categoria] ?? CATEGORIA_COR_PADRAO
}

export default function Blog() {
    const { artigos, carregando } = useArtigos()
    const { width } = useWindowDimensions()

    const pequeno = width <= 480
    const mobile = width <= 768
    const tablet = width <= 1024

    const destaques = artigos.filter((artigo) => artigo.destaque).slice(0, 3)

    const categorias: string[] = []

    artigos.forEach((artigo) => {
        artigo.categorias?.forEach((categoria) => {
            if (!categorias.includes(categoria)) {
                categorias.push(categoria)
            }
        })
    })

    if (carregando) {
        return <TelaCarregamento />
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            >
                {destaques.length > 0 && (
                    <View
                    style={[
                        styles.destaques,
                        tablet && styles.destaquesTablet,
                        pequeno && styles.destaquesPequeno,
                    ]}
                    >
                        <View style={styles.tituloDestaquesContainer}>
                            <Text
                            style={[
                                styles.tituloDestaques,
                                mobile && styles.tituloDestaquesMobile,
                            ]}
                            >
                                Destaques da{' '}
                                <Text style={styles.tituloDestaquesDestaque}>
                                    semana
                                </Text>
                            </Text>

                            <FontAwesomeFreeSolid
                            name='chevron-right'
                            size={24}
                            color={Cores.primaria}
                            />
                        </View>

                        <View
                        style={[
                            styles.artigosDestaque,
                            mobile && styles.artigosDestaqueMobile,
                        ]}
                        >
                            {destaques[0] && (
                                <View
                                style={[
                                    styles.artigo1,
                                    mobile && styles.artigo1Mobile,
                                ]}
                                >
                                    <Image
                                    source={{ uri: destaques[0].imagemURL }}
                                    style={[
                                        styles.artigo1Imagem,
                                        tablet && styles.artigo1ImagemTablet,
                                        mobile && styles.artigo1ImagemMobile,
                                    ]}
                                    />

                                    <View style={styles.containerChip}>
                                        {destaques[0].categorias?.map(
                                            (categoria) => (
                                                <Chip
                                                key={categoria}
                                                texto={categoria}
                                                cor={corDaCategoria(
                                                    categoria
                                                )}
                                                />
                                            )
                                        )}
                                    </View>

                                    <Text style={styles.artigoTitulo}>
                                        {destaques[0].titulo}
                                    </Text>

                                    <Text style={styles.artigoDescricao}>
                                        {destaques[0].descricao}
                                    </Text>
                                </View>
                            )}

                            {destaques.slice(1, 3).map((artigo) => (
                                <View
                                key={artigo.id}
                                style={[
                                    styles.artigoSecundario,
                                    mobile && styles.artigoSecundarioMobile,
                                ]}
                                >
                                    <Image
                                    source={{ uri: artigo.imagemURL }}
                                    style={[
                                        styles.artigoSecundarioImagem,
                                        mobile && styles.artigoSecundarioImagemMobile,
                                    ]}
                                    />

                                    <View style={styles.conteudoArtigo}>
                                        <View style={styles.containerChip}>
                                            {artigo.categorias?.map(
                                                (categoria) => (
                                                    <Chip
                                                    key={categoria}
                                                    texto={categoria}
                                                    cor={corDaCategoria(
                                                        categoria
                                                    )}
                                                    />
                                                )
                                            )}
                                        </View>

                                        <Text style={styles.artigoTitulo}>
                                            {artigo.titulo}
                                        </Text>

                                        <Text style={styles.artigoDescricao}>
                                            {artigo.descricao}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                <View style={styles.divisoria}>
                    <Image
                    source={logoComp}
                    style={[
                        styles.logoComp,
                        mobile && styles.logoCompMobile,
                    ]}
                    resizeMode="contain"
                    />
                </View>

                <View
                style={[
                    styles.artigos,
                    mobile && styles.artigosMobile,
                ]}
                >
                    <View
                    style={[
                        styles.flexArtigos,
                        mobile && styles.flexArtigosMobile,
                    ]}
                    >
                        {!mobile && (
                            <Image
                            source={mulherMegafone}
                            style={styles.imgMegafone}
                            resizeMode="contain"
                            />
                        )}

                        <View
                        style={[
                            styles.headingArtigos,
                            mobile && styles.headingArtigosMobile,
                        ]}
                        >
                            <View style={styles.tituloArtigos}>
                                <Text style={styles.tituloArtigosPrincipal}>
                                    NOSSOS
                                </Text>

                                <Text style={styles.tituloArtigosSecundario}>
                                    artigos:
                                </Text>
                            </View>

                            <Image
                            source={telefone}
                            style={[
                                styles.imgTelefone,
                                tablet && styles.imgTelefoneTablet,
                                mobile && styles.imgTelefoneMobile,
                                pequeno && styles.imgTelefonePequeno,
                            ]}
                            resizeMode="contain"
                            />

                            {categorias.length === 0 && (
                                <Text style={styles.semArtigos}>
                                    Ainda não temos artigos publicados por
                                    aqui.
                                </Text>
                            )}
                        </View>
                    </View>

                    {categorias.map((categoria) => {
                        const artigosDaCategoria = artigos.filter((artigo) =>
                            artigo.categorias?.includes(categoria)
                        )

                        return (
                            <View
                            key={categoria}
                            style={styles.categoria}
                            >
                                <Text style={styles.tituloCategoria}>
                                    {categoria.toUpperCase()}
                                </Text>

                                <View
                                style={[
                                    styles.artigosCategoria,
                                    mobile && styles.artigosCategoriaMobile,
                                    pequeno && styles.artigosCategoriaPequeno,
                                ]}
                                >
                                    {artigosDaCategoria.map((artigo) => (
                                        <ArtigoBlog
                                        key={artigo.id}
                                        id={artigo.id}
                                        src={artigo.imagemURL}
                                        titulo={artigo.titulo}
                                        descricao={artigo.descricao}
                                        />
                                    ))}
                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Cores.branco,
    },
    scrollContent: {
        flexGrow: 1,
    },
    destaques: {
        minHeight: 700,
        paddingHorizontal: 48,
        paddingTop: 80,
        paddingBottom: 48,
    },
    destaquesTablet: {
        minHeight: 0,
        paddingHorizontal: 32,
        paddingTop: 64,
    },
    destaquesPequeno: {
        paddingHorizontal: 16,
        paddingTop: 48,
        paddingBottom: 24,
    },
    tituloDestaquesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    tituloDestaques: {
        fontSize: 28,
        fontWeight: '600',
        color: Cores.primariaEscura,
    },
    tituloDestaquesMobile: {
        fontSize: 20,
    },
    tituloDestaquesDestaque: {
        color: Cores.primaria,
        fontSize: 38,
        fontWeight: '700',
    },
    artigosDestaque: {
        flex: 1,
        flexDirection: 'row',
        gap: 24,
    },
    artigosDestaqueMobile: {
        flexDirection: 'column',
    },
    artigo1: {
        flex: 3,
        backgroundColor: Cores.branco,
        padding: 16,
        borderRadius: 8,
        overflow: 'hidden',
    },
    artigo1Mobile: {
        flex: 0,
    },
    artigo1Imagem: {
        width: '100%',
        height: 320,
        borderRadius: 8,
        marginBottom: 16,
    },
    artigo1ImagemTablet: {
        height: 280,
    },
    artigo1ImagemMobile: {
        height: 220,
    },
    artigoSecundario: {
        flex: 2,
        minHeight: 220,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
        backgroundColor: Cores.branco,
        padding: 16,
        borderRadius: 8,
    },
    artigoSecundarioMobile: {
        flex: 0,
        minHeight: 0,
        flexDirection: 'column',
    },
    artigoSecundarioImagem: {
        width: 140,
        height: 140,
        borderRadius: 8,
    },
    artigoSecundarioImagemMobile: {
        width: '100%',
        height: 190,
    },
    conteudoArtigo: {
        flex: 1,
    },
    containerChip: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 12,
    },
    artigoTitulo: {
        fontSize: 20,
        fontWeight: '700',
        color: Cores.preto,
    },
    artigoDescricao: {
        marginTop: 8,
        fontSize: 15,
        lineHeight: 21,
        color: Cores.cinza,
    },
    divisoria: {
        backgroundColor: Cores.primaria,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 32,
    },
    logoComp: {
        width: 120,
        height: 50,
    },
    logoCompMobile: {
        width: 100,
    },
    artigos: {
        marginHorizontal: 32,
        marginVertical: 72,
    },
    artigosMobile: {
        marginHorizontal: 16,
        marginVertical: 48,
    },
    flexArtigos: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    flexArtigosMobile: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    imgMegafone: {
        width: '25%',
        height: 220,
        marginRight: 48,
        marginTop: -48,
    },
    headingArtigos: {
        flex: 1,
    },
    headingArtigosMobile: {
        width: '100%',
        alignItems: 'center',
    },
    tituloArtigos: {
        width: 400,
    },
    tituloArtigosPrincipal: {
        fontSize: 42,
        fontWeight: '900',
        color: Cores.primariaEscura,
        marginLeft: 72,
        letterSpacing: 1.1
    },
    tituloArtigosSecundario: {
        fontFamily: Fontes.logo,
        fontSize: 42,
        fontWeight: '400',
        color: Cores.primaria,
        textAlign: 'right',
        marginRight: 72,
        marginTop: -24
    },
    imgTelefone: {
        width: 420,
        height: 180,
        alignSelf: 'flex-end',
        marginTop: -40,
        marginBottom: 32,
        marginRight: 40,
    },
    imgTelefoneTablet: {
        width: 320,
        height: 150,
        alignSelf: 'center',
        marginRight: 0,
    },
    imgTelefoneMobile: {
        width: 220,
        height: 130,
        alignSelf: 'center',
        marginRight: 0,
    },
    imgTelefonePequeno: {
        width: 200,
    },
    semArtigos: {
        fontSize: 16,
        color: Cores.cinza,
        textAlign: 'center',
    },
    categoria: {
        marginTop: 24,
    },
    tituloCategoria: {
        marginVertical: 32,
        marginHorizontal: 32,
        fontSize: 24,
        fontWeight: '600',
        color: Cores.primariaEscura,
    },
    artigosCategoria: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 32,
    },
    artigosCategoriaMobile: {
        gap: 20,
    },
    artigosCategoriaPequeno: {
        flexDirection: 'column',
        alignItems: 'center',
    },
})