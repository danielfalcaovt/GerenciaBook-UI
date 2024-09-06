import { InvalidCredentialsError } from '../../../domain/errors/invalid-credentials-error'
import { UnexpectedError } from '../../../domain/errors/unexpected-error'
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
    switch (response.statusCode) {
      case 200:
        return Promise.resolve(response.body)
        break
      case 400:
        throw new InvalidCredentialsError()
        break
      default:
        throw new UnexpectedError()
        break
    }
  }
}
