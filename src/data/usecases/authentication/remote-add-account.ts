import {
  IAddAccount,
  IAddAccountModel
} from '../../../domain/protocols/signup/add-account'
import { HttpResponse } from '../../../presentation/protocols/http'
import { IHttpPostClient } from '../../protocols/http/post/http-post-client'

export class RemoteAddAccount implements IAddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpPostClient
  ) {}
  async add(account: IAddAccountModel): Promise<HttpResponse> {
    await this.httpClient.post({ url: this.url, body: account })
    return Promise.resolve({statusCode: 200})
  }
}
