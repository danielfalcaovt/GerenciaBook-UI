/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccountModel } from '../../../domain/protocols/login/account-model';
import { Authentication, AuthParams } from '../../../domain/usecases/login/authentication'
import { IHttpPostClient } from '../../protocols/http/http-post-client'

export class RemoteAuthentication implements Authentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: IHttpPostClient
    ) {}
    async auth(account: AuthParams): Promise<AccountModel> {
        await this.httpPostClient.post(this.url)
        return new Promise(resolve => resolve({ token: 'any' }))
    }
}