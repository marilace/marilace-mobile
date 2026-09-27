import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Pressable,
    Linking,
} from 'react-native'
import { router } from 'expo-router'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid'
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin } from '@tabler/icons-react-native'

const equipe = 'https://i.imgur.com/DF0I82T.jpeg'
const ana = 'https://i.imgur.com/6lcZcHJ.jpeg'
const fefe = 'https://i.imgur.com/N3tjHOJ.jpeg'
const gui = 'https://i.imgur.com/cwHd3Oo.jpeg'
const emilly = 'https://i.imgur.com/YIsEJeq.jpeg'

type MulherInspiradora = {
    nome: string
    idade: string
    profissao: string
    src: string
}

const MULHERES: MulherInspiradora[] = [
    {
        nome: 'Grace Hopper',
        idade: '(1906 - 1992)',
        profissao: 'Almirante e analista de sistemas',
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Commodore_Grace_M._Hopper%2C_USN_%28covered%29.jpg/960px-Commodore_Grace_M._Hopper%2C_USN_%28covered%29.jpg',
    },
    {
        nome: 'Margaret Hamilton',
        idade: '(1906 - 1992)',
        profissao: 'Cientista da computação e engenheira',
        src: 'https://www.brasildefato.com.br/wp-content/uploads/2024/09/image_processing20200201-29235-1xqup4t.jpg',
    },
    {
        nome: 'Katherine Johnson',
        idade: '(1918 - 2020)',
        profissao: 'Matemática, física e cientista espacial',
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Katherine_Johnson_1983.jpg/960px-Katherine_Johnson_1983.jpg',
    },
    {
        nome: 'Emily Roebling',
        idade: '(1843 - 1903)',
        profissao: 'Engenheira civil',
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRhcCn53Mgm4nf6XZrdwowwL58Wdb-NuH7xJgd4uZ0FFDrxZepbkAevzvseCld0fue3kwBlYqusS3-0LNgQZ6NUcrxNl6FP4v_aSu2SGs&s=10',
    },
]

type MembroEquipe = {
    nome: string
    sobrenome: string
    cargo: string
    foto: string
    bio: string
    github: string
    linkedin: string
    instagram: string
}

const EQUIPE: MembroEquipe[] = [
    {
        nome: 'Ana',
        sobrenome: 'Clara Fernandes da Silva',
        cargo: 'Dev Back-end',
        foto: ana,
        bio: 'Curiosa, dedicada e sempre em busca de aprender coisas novas. Sonha em viajar o mundo e pretende cursar Química.',
        github: 'https://github.com/sfclara',
        linkedin: 'https://www.linkedin.com/',
        instagram: 'https://www.instagram.com/fclaraana_/',
    },
    {
        nome: 'Emilly',
        sobrenome: ' de Sousa Brito ',
        cargo: 'Dev Front-end',
        foto: emilly,
        bio: 'Ama criar e expressar sua criatividade. Quer cursar Design Gráfico e se tornar UI/UX Designer.',
        github: 'https://github.com/emillysbrito',
        linkedin: 'https://www.linkedin.com/in/emillydesousabrito/',
        instagram: 'https://www.instagram.com/esbluet/',
    },
    {
        nome: 'Fernanda',
        sobrenome: 'Clara Leal Silva',
        cargo: 'Banco de Dados',
        foto: fefe,
        bio: 'Alegre, focada e apaixonada por esportes. Quer cursar Educação Física e se tornar atleta profissional.',
        github: 'https://github.com/fernandaleals',
        linkedin: 'https://www.linkedin.com/',
        instagram: 'https://www.instagram.com/nandalealz/',
    },
    {
        nome: 'Guilherme',
        sobrenome: 'de Oliveira Martins',
        cargo: 'Banco de Dados',
        foto: gui,
        bio: 'Espontâneo, instintivo e explorador. Pretende cursar Psicologia para ajudar quem precisar.',
        github: 'https://github.com/GuilhermeMartins2008',
        linkedin: 'https://www.linkedin.com/in/',
        instagram: 'https://www.instagram.com/mart1ns_gui/',
    },
]

export default function Sobre() {
    const voltar = () => router.back()

    return (
        <SafeAreaView style={styles.tela}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.cabecalho}>
                <Pressable onPress={voltar} hitSlop={12} accessibilityLabel="Voltar">
                    <FontAwesomeFreeSolid name="arrow-left" size={20} color={Cores.primariaEscura} />
                </Pressable>
                <Text style={styles.cabecalhoTitulo}>Sobre</Text>
                <View style={{ width: 20 }} />
            </View>

            <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
                <Text style={styles.subtitulo}>CONHEÇA NOSSA</Text>
                <Text style={styles.titulo}>história</Text>

                <Image
                    source={{ uri: equipe }}
                    style={styles.imgMoldura}
                    accessibilityLabel="Foto do grupo MariLace"
                />

                <Text style={styles.paragrafo}>
                    Somos um grupo formado por quatro estudantes do 3º ano do curso Técnico em
                    Desenvolvimento de Sistemas da ETEC de Hortolândia, sendo três meninas e um
                    menino. Esta plataforma foi desenvolvida como nosso Trabalho de Conclusão de
                    Curso (TCC) e nasceu com o propósito de criar um espaço colaborativo voltado
                    para mulheres.
                    {'\n\n'}
                    A ideia surgiu ao percebermos a grande diferença entre a quantidade de homens
                    e mulheres em nossa turma. Essa realidade nos fez refletir sobre os desafios
                    enfrentados por muitas mulheres, especialmente na área da tecnologia, e
                    despertou em nós o desejo de desenvolver um projeto que pudesse incentivar a
                    conexão, a troca de experiências e o apoio entre elas.
                    {'\n\n'}
                    Com este projeto, buscamos contribuir para a construção de um ambiente mais
                    acolhedor, onde a colaboração e a representatividade possam incentivar cada
                    vez mais mulheres a compartilhar conhecimentos, encontrar oportunidades e
                    fortalecer umas às outras.
                </Text>

                <View style={styles.linhaDivisoria} />

                <Text style={styles.subtitulo}>QUAL O NOSSO</Text>
                <Text style={styles.titulo}>objetivo?</Text>

                <Text style={styles.paragrafo}>
                    Queremos incentivar a conscientização, a troca de informações e o apoio mútuo
                    entre mulheres interessadas em seguir carreiras científicas e tecnológicas,
                    ajudando a construir um ambiente mais inclusivo e diverso em STEM.
                </Text>

                <View style={styles.linhaDivisoria} />

                <Text style={styles.subtitulo}>MULHERES</Text>
                <Text style={styles.titulo}>inspiradoras</Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listaMulheres}
                >
                    {MULHERES.map((mulher) => (
                        <View key={mulher.nome} style={styles.cardMulher}>
                            <Image source={{ uri: mulher.src }} style={styles.fotoMulher} />
                            <Text style={styles.nomeMulher}>
                                {mulher.nome} <Text style={styles.idadeMulher}>{mulher.idade}</Text>
                            </Text>
                            <Text style={styles.profissaoMulher}>{mulher.profissao}</Text>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.linhaDivisoria} />

                <Text style={styles.subtitulo}>NOSSA</Text>
                <Text style={styles.titulo}>equipe</Text>

                {EQUIPE.map((membro) => (
                    <View key={membro.nome} style={styles.cardMembro}>
                        <Image source={{ uri: membro.foto }} style={styles.fotoMembro} />

                        <View style={styles.infoMembro}>
                            <View style={styles.nomeLinhaMembro}>
                                <Text style={styles.nomeMembro}>{membro.nome}</Text>
                                <Text style={styles.sobrenomeMembro}>{membro.sobrenome}</Text>
                                <View style={styles.cargoChip}>
                                    <Text style={styles.cargoTexto}>{membro.cargo}</Text>
                                </View>
                            </View>

                            <View style={styles.linksMembro}>
                                <Pressable
                                    onPress={() => Linking.openURL(membro.github)}
                                    hitSlop={8}
                                    accessibilityLabel={`GitHub de ${membro.nome}`}
                                >
                                    <IconBrandGithub size={16} color={Cores.primariaEscura} />
                                </Pressable>
                                <Pressable
                                    onPress={() => Linking.openURL(membro.linkedin)}
                                    hitSlop={8}
                                    accessibilityLabel={`LinkedIn de ${membro.nome}`}
                                >
                                    <IconBrandLinkedin size={16} color={Cores.primaria} />
                                </Pressable>
                                <Pressable
                                    onPress={() => Linking.openURL(membro.instagram)}
                                    hitSlop={8}
                                    accessibilityLabel={`Instagram de ${membro.nome}`}
                                >
                                    <IconBrandInstagram size={16} color={Cores.rosa} />
                                </Pressable>
                            </View>

                            <Text style={styles.bioMembro}>{membro.bio}</Text>
                        </View>
                    </View>
                ))}

                <View style={{ height: 32 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: Cores.branco,
    },
    cabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    cabecalhoTitulo: {
        fontFamily: Fontes.base,
        fontSize: Fontes.M,
        fontWeight: '700',
        color: Cores.primariaEscura,
    },
    conteudo: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        gap: 4,
    },
    chipTexto: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        color: Cores.preto,
        fontWeight: '700',
    },
    subtitulo: {
        fontFamily: Fontes.base,
        fontWeight: '900',
        fontSize: Fontes.G,
        color: Cores.primariaEscura,
        textAlign: 'center',
    },
    titulo: {
        fontFamily: Fontes.logo,
        fontSize: Fontes.XG,
        color: Cores.primaria,
        textAlign: 'center',
        marginBottom: 16,
    },
    imgMoldura: {
        width: '100%',
        height: 200,
        borderRadius: 24,
        borderWidth: 4,
        borderColor: Cores.primariaEscura,
        marginBottom: 20,
    },
    paragrafo: {
        fontFamily: Fontes.base,
        fontSize: Fontes.P,
        fontWeight: '500',
        color: Cores.preto,
        lineHeight: 22,
        textAlign: 'left',
        marginBottom: 20,
    },
    linhaDivisoria: {
        height: 2,
        backgroundColor: Cores.verde,
        marginBottom: 20,
        borderRadius: 999,
    },
    listaMulheres: {
        gap: 16,
        paddingBottom: 8,
        marginBottom: 20,
    },
    cardMulher: {
        width: 160,
    },
    fotoMulher: {
        width: 160,
        height: 200,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: Cores.preto,
        marginBottom: 8,
    },
    nomeMulher: {
        fontFamily: Fontes.base,
        fontSize: Fontes.P,
        fontWeight: '700',
        color: Cores.preto,
    },
    idadeMulher: {
        fontSize: Fontes.PP,
        fontWeight: '400',
        color: Cores.primaria,
    },
    profissaoMulher: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        fontWeight: '500',
        color: Cores.cinza,
        marginTop: 2,
    },
    cardMembro: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    fotoMembro: {
        width: 84,
        height: 84,
        borderRadius: 18,
        borderWidth: 3,
        borderColor: Cores.rosa,
    },
    infoMembro: {
        flex: 1,
        gap: 4,
    },
    nomeLinhaMembro: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 6,
    },
    nomeMembro: {
        fontFamily: Fontes.base,
        fontSize: Fontes.M,
        fontWeight: '700',
        color: Cores.primariaEscura,
    },
    sobrenomeMembro: {
        fontFamily: Fontes.base,
        fontSize: Fontes.M,
        fontWeight: '300',
        color: Cores.primaria,
    },
    cargoChip: {
        backgroundColor: Cores.rosa,
        borderRadius: 999,
        paddingVertical: 2,
        paddingHorizontal: 10,
    },
    cargoTexto: {
        fontFamily: Fontes.base,
        fontSize: 10,
        fontWeight: '700',
        color: Cores.preto,
    },
    linksMembro: {
        flexDirection: 'row',
        gap: 14,
        marginVertical: 2,
    },
    bioMembro: {
        fontFamily: Fontes.base,
        fontSize: Fontes.PP,
        fontWeight: '500',
        color: Cores.preto,
        lineHeight: 18,
    },
})