import React from "react"
import SignUp from "../../../../presentation/pages/auth/signup"
import env from '../../../config/env'
import { AxiosPostClient } from '../../../../infra/axios-http-client/post/axios-post-client'
import { RemoteAddAccount } from "../../../../data/usecases/authentication/remote-add-account"

export const makeSignUpPage = (): React.JSX.Element => {
  return <SignUp
    AddAccount={new RemoteAddAccount(env.API_URL + '/signup', new AxiosPostClient())}
  />
}