import { IHttpGetClient } from "../../../data/protocols/http/get/http-get-client";
import { IHttpClientParams } from "../../../data/protocols/http/post/http-post-client";
import { HttpResponse } from "../../../presentation/protocols/http";
import axios from "axios";

export class AxiosGetClient implements IHttpGetClient {
  async get(params: IHttpClientParams): Promise<HttpResponse> {
    await axios.get(params.url)
    return new Promise(resolve => resolve({statusCode: 200}))
  }
}