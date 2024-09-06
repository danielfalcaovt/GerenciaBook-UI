export interface IDeleteBook {
  delete(book: IDeleteBookModel): Promise<boolean>
}

export interface IDeleteBookModel {
  id: 'any_id'
}