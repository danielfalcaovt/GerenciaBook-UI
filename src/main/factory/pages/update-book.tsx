/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import env from '../../config/env'
import UpdateBookForm from "../../../presentation/pages/book/update/update-book-form"
import { LocalStorageRepository } from "../../../infra/local-storage/local-storage"
import { DataContext } from "../../context/data-context"
import { AxiosUpdateClient } from "../../../infra/axios-http-client/update/axios-update-client"

export const makeUpdateBookPage = (): React.JSX.Element => {
  const itemStorage = new LocalStorageRepository()
  const token = itemStorage.getItem('token')
  return <UpdateBookForm
    url={env.API_URL + '/books'}
    HttpClient={new AxiosUpdateClient(token ? token : undefined)}
    context={DataContext}
  />
}