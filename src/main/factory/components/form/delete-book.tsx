import React from "react"
import env from '../../../config/env'
import { LocalStorageRepository } from "../../../../infra/local-storage/local-storage"
import { DataContext } from "../../../context/data-context"
import DeleteBookForm from "../../../../presentation/pages/book/delete/delete-book-form"
import { RemoteDeleteBook } from "../../../../data/usecases/book/delete/remote-delete-book"
import { AxiosDeleteClient } from "../../../../infra/axios-http-client/delete/axios-delete-client"

export const makeDeleteBookPage = (): React.JSX.Element => {
  const itemStorage = new LocalStorageRepository()
  const token = itemStorage.getItem('token')
  return <DeleteBookForm
    deleteBook={new RemoteDeleteBook(env.API_URL + '/books/query', new AxiosDeleteClient(token ? token : undefined))}
    context={DataContext}
  />
}