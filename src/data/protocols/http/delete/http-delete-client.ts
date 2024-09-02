import { HttpResponse } from '../../../../presentation/protocols/http'
import { IHttpClientParams } from '../post/http-post-client'

export interface IHttpDeleteClient {
  delete(params: IHttpClientParams): Promise<HttpResponse>
}