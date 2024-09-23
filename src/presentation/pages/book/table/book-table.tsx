/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react'
import { DataContext } from '../../../../main/context/data-context'
import { IBook } from '../../../../domain/protocols/book/book'

export default function BookTable() {
  const { data, setData } = useContext(DataContext)
  const dataAtual = new Date()

  return (
    <table>
      <thead>
        <tr>
          <th id="formbook_name">Livro</th>
          <th id="formstudent_name">Estudante</th>
          <th id="formstudent_class">Classe</th>
          <th id="formlend_day">Data do Empréstimo</th>
          <th id="formphone">Celular</th>
        </tr>
      </thead>
      <tbody>
        {data && data.filteredBooks
          ? data.filteredBooks
              ?.sort(
                (x: IBook, y: IBook) => Number(x.lend_day) - Number(y.lend_day)
              )
              .map((book: any) => {
                return (
                  <tr
                    style={
                      data && data.selectedBook?.id === book.id
                        ? { background: '#C2E1FF' }
                        : new Date(Number(book.lend_day)) <
                          new Date(
                            dataAtual.getFullYear(),
                            dataAtual.getMonth(),
                            dataAtual.getDate() - 14
                          )
                        ? { background: '#F9CCC8' }
                        : {}
                    }
                    key={book.id}
                    onClick={() => {
                      setData((oldValue: any) => {
                        return {
                          ...oldValue,
                          selectedBook: book
                        }
                      })
                    }}
                  >
                    <td>{book.book_name}</td>
                    <td>{book.student_name}</td>
                    <td>{book.student_class}</td>
                    <td>
                      {new Date(Number(book.lend_day)).getDate() < 10 ? 0 : ''}
                      {new Date(Number(book.lend_day)).getDate()}/
                      {new Date(Number(book.lend_day)).getMonth() + 1 < 10
                        ? 0
                        : ''}
                      {new Date(Number(book.lend_day)).getMonth() + 1}/
                      {new Date(Number(book.lend_day)).getFullYear()}
                    </td>
                    <td>{book.phone ? book.phone?.length > 9 ? `(${book.phone.slice(0,2)}) ${book.phone.slice(2, 7)} - ${book.phone.slice(7, book.phone.length)}` : book.phone.slice(0, 4) - book.phone.slice(4, 8) : '---------'}</td>
                  </tr>
                )
              })
          : data &&
            data.books &&
            data.books?.length > 0 &&
            data.books
              ?.sort(
                (x: IBook, y: IBook) => Number(x.lend_day) - Number(y.lend_day)
              )
              .map((book: any) => {
                return (
                  <tr
                    style={
                      data && data.selectedBook?.id === book.id
                        ? { background: '#C2E1FF' }
                        : new Date(Number(book.lend_day)) <
                          new Date(
                            dataAtual.getFullYear(),
                            dataAtual.getMonth(),
                            dataAtual.getDate() - 14
                          )
                        ? { background: '#F9CCC8' }
                        : {}
                    }
                    key={book.id}
                    onClick={() => {
                      setData((oldValue: any) => {
                        return {
                          ...oldValue,
                          selectedBook: book
                        }
                      })
                    }}
                  >
                    <td>{book.book_name}</td>
                    <td>{book.student_name}</td>
                    <td>{book.student_class}</td>
                    <td>
                      {new Date(Number(book.lend_day)).getDate() < 10 ? 0 : ''}
                      {new Date(Number(book.lend_day)).getDate()}/
                      {new Date(Number(book.lend_day)).getMonth() + 1 < 10
                        ? 0
                        : ''}
                      {new Date(Number(book.lend_day)).getMonth() + 1}/
                      {new Date(Number(book.lend_day)).getFullYear()}
                    </td>
                    <td>{book.phone ? book.phone?.length > 9 ? `(${book.phone.slice(0,2)}) ${book.phone.slice(2, 7)} - ${book.phone.slice(7, book.phone.length)}` : book.phone.slice(0, 4) - book.phone.slice(4, 8) : '---------'}</td>
                  </tr>
                )
              })}
      </tbody>
    </table>
  )
}
