/**
 * @fileoverview HTTP client
 */
import * as axios from 'axios'

export class HttpClient {
  private readonly client: axios.AxiosInstance

  constructor() {
    this.client = axios.default.create()
  }

  async post<T>(url: string, data: any, headers?: any): Promise<T> {
    let response!: axios.AxiosResponse<T>
    try {
      response = await this.client.post<T>(url, data, {headers})
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        
        console.log(e.response?.data)
        
        throw new Error(e.response?.data)
      }
    }
    return response.data
  }
}
