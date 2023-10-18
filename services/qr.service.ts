import axios from "axios"

export type LinkResponse = {
  url: string
}

export const qrService = {
  async createQR(body: FormData): Promise<LinkResponse> {
    // const { data } = await axios.post<LinkResponse>('localhost:4000/qr', body, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })

    // return data
    return { url: 'https://shikimori.me/' }
  }
}