import React, { createContext, useState, useEffect, ReactNode, use } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { type UsuarioTipo } from "@/types/Usuario";
import { autenticacao, banco } from "@/services/Firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

interface AutenticacaoContextoObjeto{
    usuario: UsuarioTipo | null
    carregando: boolean
}

export const AutenticacaoContexto = createContext<AutenticacaoContextoObjeto | undefined>(undefined);

export function AutenticacaoProvider({ children }: { children: ReactNode}){
    
    const [uidAtual, setUidAtual] = useState<string | null>(null)
    const [usuario, setUsuario] = useState<UsuarioTipo | null>(null)
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(autenticacao, (usuarioFirebase) => {
            if (usuarioFirebase) {
                setUidAtual(usuarioFirebase.uid)
            } else {
                setUidAtual(null)
                setUsuario(null)
                setCarregando(false)
            }
        })
        return () => unsubcribe()
    }, [])

    useEffect(() => {
        if (!uidAtual) return

        const usuarioRef = doc(banco, 'users', uidAtual)
        const unsubscribe = onSnapshot(usuarioRef, (snap) => {
            if (snap.exists()) {
                const dados = snap.data()
                setUsuario({
                    uid: uidAtual,
                    username: dados.username,
                    email: dados.email ?? autenticacao.currentUser?.email ?? '',
                    nome: dados.displayName,
                    bio: dados.bio,
                    photoURL: dados.photoURL,
                    followersCount: dados.followersCount,
                    followingCount: dados.followingCount,
                    emblemas: dados.emblemas ?? [],
                })
            } else {
                setUsuario(null)
            }
            setCarregando(false)
        })

        return () => unsubscribe()

    }, [uidAtual])

    return (
        <AutenticacaoContexto.Provider value={{ usuario, carregando }}>
            {children}
        </AutenticacaoContexto.Provider>
    )
}