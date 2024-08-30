import React from "react"
import Login from "../../../presentation/pages/login"
import env from '../../config/env'
import { AxiosPostClient } from '../../../infra/axios-http-client/axios-post-client'

export const makeLoginPage = (): React.JSX.Element => {
  return <Login
    url={env.API_URL + '/login'}
    httpPostClient={new AxiosPostClient()}
  />
}