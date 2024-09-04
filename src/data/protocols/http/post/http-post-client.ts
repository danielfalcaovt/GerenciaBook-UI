/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse } from "../../../../presentation/protocols/http"

export interface IHttpPostClient {
  post(params: IHttpClientParams): Promise<HttpResponse>
}

export interface IHttpClientParams {
  url: string
  body?: any
}
