import React from "react"
import Login from "../../../../presentation/pages/auth/login"
import env from '../../../config/env'
import { AxiosPostClient } from '../../../../infra/axios-http-client/post/axios-post-client'
import { RemoteAuthentication } from "../../../../data/usecases/authentication/remote-authentication"

export const makeLoginPage = (): React.JSX.Element => {
  return <Login
    Authenticator={new RemoteAuthentication(env.API_URL + '/login', new AxiosPostClient())}
  />
}