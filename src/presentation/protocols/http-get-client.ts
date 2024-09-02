import { HttpResponse } from './http'
import { IHttpClientParams } from './http-post-client'

export interface IHttpGetClient {
  get(params: IHttpClientParams): Promise<HttpResponse>
}