import React from "react"
import Login from "../../../../presentation/pages/auth/login"
import env from '../../../config/env'
import { AxiosPostClient } from '../../../../infra/axios-http-client/post/axios-post-client'

export const makeLoginPage = (): React.JSX.Element => {
  return <Login
    url={env.API_URL + '/login'}
    httpPostClient={new AxiosPostClient()}
  />
}