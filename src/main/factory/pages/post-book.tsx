import React from "react"
import env from '../../config/env'
import { AxiosPostClient } from '../../../infra/axios-http-client/axios-post-client'
import PostBookForm from "../../../presentation/pages/book/post/post-book-form"

export const makePostBookPage = (): React.JSX.Element => {
  return <PostBookForm
    url={env.API_URL + '/books'}
    HttpClient={new AxiosPostClient()}
  />
}