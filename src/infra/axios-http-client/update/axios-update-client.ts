/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { IHttpPatchClient } from '../../../data/protocols/http/patch/http-patch-client'
import { IHttpClientParams } from '../../../data/protocols/http/post/http-post-client'
import { HttpResponse } from '../../../presentation/protocols/http'

export class AxiosUpdateClient implements IHttpPatchClient {
  constructor(private readonly token?: string) {}
  async patch(params: IHttpClientParams): Promise<HttpResponse> {
    const headers = this.token
      ? {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      : {}
    try {
      const axiosResponse = await axios.patch(params.url, params.body, headers)
        return new Promise((resolve) =>
          resolve({
            statusCode: axiosResponse.status,
            body: axiosResponse.data
          })
        )
    } catch (err: any) {
      const axiosError = err
      if (axiosError.response) {
        return new Promise((resolve) =>
          resolve({
            statusCode: axiosError.response.status,
            body: axiosError.response.data
          })
        )
      } else {
        return new Promise(resolve => resolve({
          statusCode: 500,
          body: 'Internal Server Error'
        }))
      }
    }
  }
}
