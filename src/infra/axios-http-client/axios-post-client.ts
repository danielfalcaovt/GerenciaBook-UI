 
import {
  IHttpClientParams,
  IHttpPostClient
} from '../../data/protocols/http/http-post-client'
import { HttpResponse } from '../../data/protocols/http/http-protocol'
import axios from 'axios'

export class AxiosPostClient implements IHttpPostClient {
  async post(params: IHttpClientParams): Promise<HttpResponse> {
    const axiosResponse = await axios.post(params.url, params.body)
    return Promise.resolve({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  }
}
