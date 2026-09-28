/**
 * DIFERENÇA EM RELAÇÃO À VERSÃO WEB:
 * No React Native o objeto `File` do navegador não existe, então, as
 * imagens que são selecionadas serão representadas por uma `uri` local
 * (caminho no sistema de arquivos do celular). Por isso, ao montar o
 * FormData, precisamos descrever manualmente o arquivo em um objeto com
 *  `uri`, `type` e `name`
 */

export async function enviarImagem(uri: string): Promise<string> {
    const formData = new FormData()

    // no React Native, a imagem é identificada pela sua uri no dispositivo
    formData.append('file', {
        uri,  // caminho local do arquivo no celular
        type: 'image/jpeg', // tipo do arquivo
        name: 'upload.jpg', // nome do arquivo
    } as any)
    
    // define o preset usado para permitir o upload sem assinatura no back-end
    formData.append('upload_preset', process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string)

    // envia a imagem para o Cloudinary
    const resposta = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
    )

    // caso o upload falhe, interrompe a função e devolve o erro
    if (!resposta.ok) {
        throw new Error('Falha ao enviar a imagem.')
    }

    // o Cloudinary retorna os dados da imagem após o upload na mesma estrutura
    // JSON da versão web
    const dados = await resposta.json()

    // retorna a URL segura para ser salva no Firestore
    return dados.secure_url
}