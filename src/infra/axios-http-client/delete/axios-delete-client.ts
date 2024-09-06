import axios from "axios";
import { IHttpDeleteClient } from "../../../data/protocols/http/delete/http-delete-client";
import { IHttpClientParams } from "../../../data/protocols/http/post/http-post-client";
import { HttpResponse } from "../../../presentation/protocols/http";

export class AxiosDeleteClient implements IHttpDeleteClient {
  constructor (private readonly token?: string) {}
  async delete(params: IHttpClientParams): Promise<HttpResponse> {
    const headers = this.token ? {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    } : {}
    let url = params.url
    url += '?'
    const bookParams = [
      'id'
    ]
    let queryLength = 0
    bookParams.forEach((pos: string) => {
      if (params.body && params.body[pos]) {
        url += queryLength>0 ? '&' : ''
        queryLength++
        url += `${pos}=${params.body[pos]}`
      }
    });
    await axios.delete(url, headers)
    return new Promise(resolve=> resolve({statusCode: 200}))
  }
}