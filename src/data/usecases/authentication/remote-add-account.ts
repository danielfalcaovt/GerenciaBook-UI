import { Account } from '../../../domain/protocols/signup/account'
import {
  IAddAccount,
  IAddAccountModel
} from '../../../domain/protocols/signup/add-account'
import { IHttpPostClient } from '../../protocols/http/post/http-post-client'

export class RemoteAddAccount implements IAddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpPostClient
  ) {}
  async add(account: IAddAccountModel): Promise<Account> {
    const response = await this.httpClient.post({ url: this.url, body: account })
    return Promise.resolve(response.body)
  }
}
