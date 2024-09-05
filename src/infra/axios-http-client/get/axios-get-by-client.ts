/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { IHttpGetByClient } from '../../../data/protocols/http/get/http-get-by-client'
import { IHttpClientParams } from '../../../data/protocols/http/post/http-post-client'
import { HttpResponse } from '../../../presentation/protocols/http'

export class AxiosGetByClient implements IHttpGetByClient {
  constructor (private readonly token?: string) {}
  async getBy(params: IHttpClientParams): Promise<HttpResponse> {
    const headers = this.token ? {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    } : {}
    let url = params.url
    url += '?'
    const bookParams = [
      'book_name',
      'student_name',
      'student_class'
    ]
    let queryLength = 0
    bookParams.forEach((pos: string) => {
      if (params.body && params.body[pos]) {
        url += queryLength>0 ? '&' : ''
        queryLength++
        url += `${pos}=${params.body[pos]}`
      }
    });
    try {
      const axiosResponse = await axios.get(url, headers)
      return new Promise((resolve) =>
        resolve({
          statusCode: axiosResponse.status,
          body: axiosResponse.data
        })
      )
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
