import { IBook } from "../../protocols/book/book";

export interface IGetBook {
  getBy(book: IGetBookModel): Promise<IBook[]>
}

export interface IGetBookModel {
  id?: string
  book_name?: string
  student_name?: string
  student_class?: string
  lend_day?: string
}