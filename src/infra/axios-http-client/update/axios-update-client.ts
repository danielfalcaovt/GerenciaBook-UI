import axios from 'axios';
import { IHttpPatchClient } from '../../../data/protocols/http/patch/http-patch-client'
import { IHttpClientParams } from '../../../data/protocols/http/post/http-post-client';
import { HttpResponse } from '../../../presentation/protocols/http';

export class AxiosUpdateClient implements IHttpPatchClient {
  constructor(private readonly token?: string) {}
  async patch(params: IHttpClientParams): Promise<HttpResponse> {
    await axios.patch(params.url, params.body)
    return new Promise(resolve => resolve({ statusCode: 200 }))
  }
}