import { AccountModel } from '../../protocols/login/account-model'

export interface AuthParams {
  email: string
  password: string
}

export interface Authentication {
  auth(account: AuthParams): Promise<AccountModel>
}
