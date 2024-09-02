import { HttpResponse } from "./http";
import { IHttpClientParams } from "./http-post-client";

export interface IHttpDeleteClient {
  delete(params: IHttpClientParams): Promise<HttpResponse>
}