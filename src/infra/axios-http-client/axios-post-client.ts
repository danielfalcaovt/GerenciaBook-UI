/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IHttpClientParams,
  IHttpPostClient
} from '../../data/protocols/http/http-post-client'
import { HttpResponse } from '../../data/protocols/http/http-protocol'
import axios from 'axios'

export class AxiosPostClient implements IHttpPostClient {
  async post(params: IHttpClientParams): Promise<HttpResponse> {
    console.log(params)
    const axiosResponse = await axios.post(params.url, params.body) // refatorar, ele está dando throw invés de retornar o erro
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
  }
}
