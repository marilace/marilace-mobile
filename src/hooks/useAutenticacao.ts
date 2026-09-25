import { AutenticacaoContexto } from "@/contexts/AutenticacaoContexto";
import { autenticacao } from "@/services/Firebase";
import { FirebaseError } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { useContext } from "react";

export function useAutenticacao() {
  const autenticacaoContexto = useContext(AutenticacaoContexto);

  if (autenticacaoContexto === undefined) {
    throw new Error("Falta o <AutenticacaoProvider> na aplicação!");
  }

  const { usuarioContexto, carregando, logarContexto, deslogarContexto } =
    autenticacaoContexto;

  const criarAutenticacaoUsuario = async (
    nome: string,
    username: string,
    email: string,
    senha: string,
  ): Promise<string> => {
    let retorno = "sucesso";
    try {
      await createUserWithEmailAndPassword(autenticacao, email, senha);
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            retorno = `E-mail já utilizado por outra conta. ${error.code}`;
            break;

          default:
            retorno = `Erro na criação da autenticação do usuário! (${error.code}: ${error.message})`;
            break;
        }
      } else {
        retorno = `Erro imprevisto! (${error})`;
      }
    }
    return retorno;
  };

  const validarUsuario = async (
    email: string,
    senha: string,
  ): Promise<string> => {
    let retorno = "sucesso";
    try {
      await signInWithEmailAndPassword(autenticacao, email, senha);
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          default:
            retorno = `Erro na autenticação do usuário! (${error.code}: ${error.message})`;
            break;
        }
      } else {
        retorno = `Erro imprevisto! (${error})`;
      }
    }
    return retorno;
  };

  const deslogar = async (): Promise<string> => {
    let retorno = "sucesso";
    try {
      await signOut(autenticacao);
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          default:
            retorno = `Erro ao deslogar o usuário! (${error.code}: ${error.message})`;
            break;
        }
      } else {
        retorno = `Erro imprevisto! (${error})`;
      }
    }
    return retorno;
  };

  return {
    criarAutenticacaoUsuario,
    validarUsuario,
    deslogar,
    logarContexto,
    deslogarContexto,
    usuarioContexto,
    carregando,
  };
}
