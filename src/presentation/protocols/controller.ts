import { IHttpGetClient } from './http-get-client'
import { IHttpPostClient } from './http-post-client'
import { IHttpPatchClient } from './http-patch-client'
import { IHttpDeleteClient } from './http-delete-client'
import { Authentication } from '../../domain/usecases/login/authentication'
import { IAddAccount } from '../../domain/protocols/signup/add-account'

export interface LoginControllerDependencies {
  Authenticator: Authentication
}

export interface SignUpControllerDependencies {
  AddAccount: IAddAccount
}

export interface BookControllerDependencies {
  url: string
  httpPostClient: IHttpPostClient | string
  httpPatchClient: IHttpPatchClient | string
  httpGetClient: IHttpGetClient | string
  httpDeleteClient: IHttpDeleteClient | string
}