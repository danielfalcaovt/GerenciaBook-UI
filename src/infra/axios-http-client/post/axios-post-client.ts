/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IHttpClientParams,
  IHttpPostClient
} from '../../../data/protocols/http/post/http-post-client'
import { HttpResponse } from '../../../presentation/protocols/http'
import axios from 'axios'

export class AxiosPostClient implements IHttpPostClient {
  constructor(private readonly token?: string) {}
  async post(params: IHttpClientParams): Promise<HttpResponse> {
    const headers = this.token
      ? {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      : {}
    try {
      const axiosResponse = await axios.post(params.url, params.body, headers)
      if (axiosResponse.status === 200) {
        return Promise.resolve({
          statusCode: axiosResponse.status,
          body: axiosResponse.data
        })
      }
      const axiosError: any = axiosResponse
      return Promise.resolve({
        statusCode: axiosError.response.status,
        body: axiosError.response.data
      })
    } catch (err: any) {
      if (err.response) {
        const axiosError = err
        return new Promise((resolve) =>
          resolve({
            statusCode: axiosError.response.status,
            body: axiosError.response.data
          })
        )
      } else {
        console.log(err)
        return new Promise((resolve) => {
          resolve({ statusCode: 500, body: 'Internal Server Error' })
        })
      }
    }
  }
}
