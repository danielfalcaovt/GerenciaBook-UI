import React from "react"
import env from '../../../config/env'
import GetBookForm from "../../../../presentation/pages/book/get/get-book-form"
import { LocalStorageRepository } from "../../../../infra/local-storage/local-storage"
import { DataContext } from "../../../context/data-context"
import { AxiosGetByClient } from "../../../../infra/axios-http-client/get/axios-get-by-client"
import { RemoteGetBook } from "../../../../data/usecases/book/get/get-book"

export const makeGetBookPage = (): React.JSX.Element => {
  const itemStorage = new LocalStorageRepository()
  const token = itemStorage.getItem('token')
  return <GetBookForm
    getBook={new RemoteGetBook(env.API_URL + '/books/query', new AxiosGetByClient(token ? token : undefined))}
    context={DataContext}
  />
}