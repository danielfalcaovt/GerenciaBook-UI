
import { HttpResponse } from '../../../../presentation/protocols/http'
import { IHttpClientParams } from '../post/http-post-client'

export interface IHttpPatchClient {
  patch(params: IHttpClientParams): Promise<HttpResponse>
}