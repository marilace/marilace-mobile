export async function enviarImagem(uri: string): Promise<string> {
    const formData = new FormData()

    formData.append('file', {
        uri,
        type: 'image/jpeg',
        name: 'upload.jpg',
    } as any)
    
    formData.append('upload_preset', process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string)

    const resposta = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
    )

    if (!resposta.ok) {
        throw new Error('Falha ao enviar a imagem.')
    }

    const dados = await resposta.json()
    return dados.secure_url
}