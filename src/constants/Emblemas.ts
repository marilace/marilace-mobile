import { Cores } from './Cores'

export interface Emblema {
    id: string
    texto: string
    cor: string
    letra: string
}

export const EMBLEMAS_DISPONIVEIS: Emblema[] = [
    { id: 'ciencias',   texto: 'Ciências',   cor: Cores.verde, letra: 's' },
    { id: 'tecnologia', texto: 'Tecnologia', cor: Cores.primariaEscura, letra: 't' },
    { id: 'engenharia', texto: 'Engenharia', cor: Cores.primaria, letra: 'e' },
    { id: 'matematica', texto: 'Matemática', cor: Cores.rosa, letra: 'm' },
]