import { HttpResponse } from './http'
import { IHttpClientParams } from './http-post-client'

export interface IHttpPatchClient {
  patch(params: IHttpClientParams): Promise<HttpResponse>
}