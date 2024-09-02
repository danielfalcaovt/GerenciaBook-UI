import { InvalidCredentialsError } from '../../../domain/errors/invalid-credentials-error'
import { UnexpectedError } from '../../../domain/errors/unexpected-error'
import { AccountModel } from '../../../domain/protocols/login/account-model'
import {
  Authentication,
  AuthParams
} from '../../../domain/usecases/login/authentication'
import { IHttpPostClient } from '../../protocols/http/post/http-post-client'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient
  ) {}
  async auth(account: AuthParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: account
    })
    switch (httpResponse.statusCode) {
      case 200:
        return Promise.resolve(httpResponse.body)
        break
      case 401:
        throw new InvalidCredentialsError()
        break
      case 400:
        throw new UnexpectedError()
        break
      default:
        throw new UnexpectedError()
        break
    }
  }
}
