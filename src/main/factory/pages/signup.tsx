import React from "react"
import SignUp from "../../../presentation/pages/signup"
import env from '../../config/env'
import { AxiosPostClient } from '../../../infra/axios-http-client/axios-post-client'

export const makeSignUpPage = (): React.JSX.Element => {
  return <SignUp
    url={env.API_URL + '/signup'}
    httpPostClient={new AxiosPostClient()}
  />
}