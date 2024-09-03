/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import env from '../../config/env'
import { AxiosGetClient } from '../../../infra/axios-http-client/get/axios-get-client'
import GetBookForm from "../../../presentation/pages/book/get/get-book-form"
import { LocalStorageRepository } from "../../../infra/local-storage/local-storage"
import { DataContext } from "../../context/data-context"

export const makeGetBookPage = (): React.JSX.Element => {
  const itemStorage = new LocalStorageRepository()
  const token = itemStorage.getItem('token')
  return <GetBookForm
    url={env.API_URL + '/books'}
    HttpClient={new AxiosGetClient(token ? token : undefined)}
    context={DataContext}
  />
}