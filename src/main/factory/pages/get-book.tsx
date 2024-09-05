/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import env from '../../config/env'
import GetBookForm from "../../../presentation/pages/book/get/get-book-form"
import { LocalStorageRepository } from "../../../infra/local-storage/local-storage"
import { DataContext } from "../../context/data-context"
import { AxiosGetByClient } from "../../../infra/axios-http-client/get/axios-get-by-client"

export const makeGetBookPage = (): React.JSX.Element => {
  const itemStorage = new LocalStorageRepository()
  const token = itemStorage.getItem('token')
  return <GetBookForm
    url={env.API_URL + '/books/query'}
    HttpClient={new AxiosGetByClient(token ? token : undefined)}
    context={DataContext}
  />
}