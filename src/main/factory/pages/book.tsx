import React from "react"
import env from '../../config/env'
import { AxiosPostClient } from '../../../infra/axios-http-client/axios-post-client'
import Book from "../../../presentation/pages/book/book"

export const makeBookPage = (): React.JSX.Element => {
  return <Book
    url={env.API_URL + '/book'}
    httpPostClient={new AxiosPostClient()}
    httpGetClient={'get'}
    httpDeleteClient={'delete'}
    httpPatchClient={'patch'}
  />
}