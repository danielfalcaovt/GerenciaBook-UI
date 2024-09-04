import { HttpResponse } from './http'
import { IHttpClientParams } from './http-post-client'

export interface IHttpGetByClient {
  getBy(params: IHttpClientParams): Promise<HttpResponse>
}