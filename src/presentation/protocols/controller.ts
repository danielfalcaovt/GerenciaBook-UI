import { IHttpGetClient } from './http-get-client'
import { IHttpPostClient } from './http-post-client'
import { IHttpPatchClient } from './http-patch-client'
import { IHttpDeleteClient } from './http-delete-client'
import { Authentication } from '../../domain/usecases/login/authentication'

export interface LoginControllerDependencies {
  Authenticator: Authentication
}

export interface SignUpControllerDependencies {
  httpPostClient: IHttpPostClient
  url: string
}

export interface BookControllerDependencies {
  url: string
  httpPostClient: IHttpPostClient | string
  httpPatchClient: IHttpPatchClient | string
  httpGetClient: IHttpGetClient | string
  httpDeleteClient: IHttpDeleteClient | string
}