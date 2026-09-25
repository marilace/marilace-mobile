import { getApp, getApps, initializeApp, FirebaseError } from 'firebase/app'
import {
    initializeAuth,
    signInWithEmailAndPassword,
    inMemoryPersistence,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { useState } from 'react'

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
}

const conexao = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

const autenticacao = initializeAuth(conexao, {
    persistence: inMemoryPersistence
})

export const banco = getFirestore(conexao)

export type ResultadoConexao = {
    conectado: boolean
    mensagem: string
}

export async function testarConexao(){

    const [mensagemErro, setMensagemErro] = useState('Verificando conexão...');
    const [conectado, setConectado] = useState(false);

    try {

        await signInWithEmailAndPassword(autenticacao, 'email_invalido@email.com', '123456')

    } catch (error) {

        if (error instanceof FirebaseError) {

            switch (error.code) {
                case 'auth/user-not-found':
                case 'auth/invalid-credential':
                    setMensagemErro(`Conexão com o Firebase estabelecida com sucesso! ${error.code}`);
                    setConectado(true);            
                    break;

                case 'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
                    setMensagemErro('Chave de API do Firebase inválida!');
                    setConectado(false);            
                    break;

                case 'auth/network-request-failed':
                    setMensagemErro('Falha de rede! Verifique sua internet');
                    setConectado(false);            
                    break;

                case 'auth/too-many-requests':
                    setMensagemErro('IP bloqueado temporariamente por excesso de tentativas (Aguarde alguns minutos).');
                    setConectado(false);            
                    break;  
            }
        } else {
            setMensagemErro(`Erro imprevisto! (${error})`)
            setConectado(false)
        }
    }
}

export { autenticacao, FirebaseError, signInWithEmailAndPassword }