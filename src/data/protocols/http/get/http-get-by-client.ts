import { HttpResponse } from '../../../../presentation/protocols/http'
import { IHttpClientParams } from '../post/http-post-client'

export interface IHttpGetByClient {
  getBy(params: IHttpClientParams): Promise<HttpResponse>
}