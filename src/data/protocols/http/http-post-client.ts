import { HttpResponse } from './http-protocol'

export interface IHttpPostClient {
  post(params: IHttpClientParams): Promise<HttpResponse>
}

export interface IHttpClientParams {
  url: string
  body?: object
}
