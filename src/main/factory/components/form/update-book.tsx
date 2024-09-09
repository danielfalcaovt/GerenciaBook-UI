/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import env from '../../../config/env'
import UpdateBookForm from "../../../../presentation/pages/book/form/update/update-book-form"
import { LocalStorageRepository } from "../../../../infra/local-storage/local-storage"
import { DataContext } from "../../../context/data-context"
import { AxiosUpdateClient } from "../../../../infra/axios-http-client/update/axios-update-client"
import { RemoteUpdateBook } from "../../../../data/usecases/book/update/update-book"

export const makeUpdateBookPage = (): React.JSX.Element => {
  const itemStorage = new LocalStorageRepository()
  const token = itemStorage.getItem('token')
  return <UpdateBookForm
    updateBook={new RemoteUpdateBook(env.API_URL + '/books', new AxiosUpdateClient(token ? token : undefined))}
    context={DataContext}
  />
}