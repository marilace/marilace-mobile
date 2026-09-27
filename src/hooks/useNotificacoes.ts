import { useEffect, useState } from 'react'
import {
    collection, 
    query, 
    orderBy, 
    limit, 
    onSnapshot,
    doc, 
    updateDoc, 
    writeBatch,
} from 'firebase/firestore'
import { banco } from '@/services/Firebase'
import { useAutenticacao } from '@/hooks/useAutenticacao'
import type { NotificacaoTipo } from '@/types/Notificacao'

export function useNotificacoes() {
    const { usuario } = useAutenticacao()
    const [notificacoes, setNotificacoes] = useState<NotificacaoTipo[]>([])
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        if (!usuario) {
            setNotificacoes([])
            setCarregando(false)
            return
        }

        setCarregando(true)

        const q = query(
            collection(banco, 'users', usuario.uid, 'notificacoes'),
            orderBy('createdAt', 'desc'),
            limit(50)
        )

        const unsubscribe = onSnapshot(q, (snap) => {
            const lista = snap.docs.map((docSnap) => ({
                id: docSnap.id,
                ...docSnap.data(),
            })) as NotificacaoTipo[]
            setNotificacoes(lista)
            setCarregando(false)
        })

        return () => unsubscribe()
    }, [usuario])

    const naoLidasCount = notificacoes.filter((n) => !n.lida).length

    const marcarComoLida = async (notificacaoId: string) => {
        if (!usuario) return
        await updateDoc(doc(banco, 'users', usuario.uid, 'notificacoes', notificacaoId), { lida: true })
    }

    const marcarTodasComoLidas = async () => {
        if (!usuario) return
        const naoLidas = notificacoes.filter((n) => !n.lida)
        if (naoLidas.length === 0) return

        const batch = writeBatch(banco)
        naoLidas.forEach((n) => {
            batch.update(doc(banco, 'users', usuario.uid, 'notificacoes', n.id), { lida: true })
        })
        await batch.commit()
    }

    return { notificacoes, carregando, naoLidasCount, marcarComoLida, marcarTodasComoLidas }
}