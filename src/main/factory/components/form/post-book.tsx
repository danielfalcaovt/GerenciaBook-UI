/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import env from '../../../config/env'
import { AxiosPostClient } from '../../../../infra/axios-http-client/post/axios-post-client'
import PostBookForm from "../../../../presentation/pages/book/post/post-book-form"
import { LocalStorageRepository } from "../../../../infra/local-storage/local-storage"
import { DataContext } from "../../../context/data-context"
import { AddBook } from "../../../../data/usecases/book/add/add-book"

export const makePostBookPage = (): React.JSX.Element => {
  const itemStorage = new LocalStorageRepository()
  const token = itemStorage.getItem('token')
  return <PostBookForm
    addBook={new AddBook(env.API_URL + '/books', new AxiosPostClient(token ? token : undefined))}
    context={DataContext}
  />
}