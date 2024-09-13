import React from "react"
import SignUp from "../../../../presentation/pages/auth/signup"
import env from '../../../config/env'
import { AxiosPostClient } from '../../../../infra/axios-http-client/post/axios-post-client'
import { RemoteAddAccount } from "../../../../data/usecases/authentication/remote-add-account"
import { LocalStorageRepository } from "../../../../infra/local-storage/local-storage"

export const makeSignUpPage = (): React.JSX.Element => {
  const itemStorage = new LocalStorageRepository()
  const token = itemStorage.getItem('admin')
  return <SignUp
    AddAccount={new RemoteAddAccount(env.ADMIN_URL + '/signup', new AxiosPostClient(token ? token : undefined))}
  />
}