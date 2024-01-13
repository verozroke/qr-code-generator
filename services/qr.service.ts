import axios from "axios"

export type LinkResponse = {
  qr_url: string
}

export const qrService = {
  async createQR(body: FormData): Promise<LinkResponse> {
    const config = useRuntimeConfig()
    const { data } = await axios.post<LinkResponse>(`${config.public.backendBase}/api/v1/evac/address/`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    // return data
    return data
  }
}