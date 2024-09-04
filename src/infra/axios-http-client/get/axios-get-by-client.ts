/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { IHttpGetByClient } from '../../../data/protocols/http/get/http-get-by-client'
import { IHttpClientParams } from '../../../data/protocols/http/post/http-post-client'
import { HttpResponse } from '../../../presentation/protocols/http'

export class AxiosGetByClient implements IHttpGetByClient {
  async getBy(params: IHttpClientParams): Promise<HttpResponse> {
    let url = params.url
    url += '?'
    for (const pos of [
      'book_name',
      'student_name',
      'student_class',
      'lend_day'
    ]) {
      if (params.body && params.body[pos]) {
        url += `${pos}=${params.body[pos]}`
      }
    }
    try {
      const axiosResponse = await axios.get(url)
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
