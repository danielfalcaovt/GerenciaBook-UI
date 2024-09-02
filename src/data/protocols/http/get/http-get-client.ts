
import { HttpResponse } from '../../../../presentation/protocols/http'
import { IHttpClientParams } from '../post/http-post-client'

export interface IHttpGetClient {
  get(params: IHttpClientParams): Promise<HttpResponse>
}