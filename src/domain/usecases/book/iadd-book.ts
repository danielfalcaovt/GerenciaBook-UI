import { IBook } from "../../protocols/book/book"

export interface IAddBookModel {
  book_name: string
  student_name: string
  lend_day: string
  student_class: number
}

export interface IAddBook {
  add(book: IAddBookModel): Promise<IBook>
}