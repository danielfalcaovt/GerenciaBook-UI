/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react'
import { DataContext } from '../../../../main/context/data-context'
import { IBook } from '../../../../domain/protocols/book/book'

export default function BookTable() {
  const { data, setData } = useContext(DataContext)
  const dataAtual = new Date()
  console.log(data)
  return (
    <table>
      <thead>
        <tr>
          <th>Livro</th>
          <th>Estudante</th>
          <th id='formstudent_class'>Classe</th>
          <th id='formlend_day'>Data do Empréstimo</th>
        </tr>
      </thead>
      <tbody>
        {data.filteredBooks
          ? data.filteredBooks
              ?.sort(
                (x: IBook, y: IBook) => Number(x.lend_day) - Number(y.lend_day)
              )
              .map((book: any) => {
                return (
                  <tr
                    
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
                    <td style={
                      new Date(Number(book.lend_day)) <
                      new Date(
                        dataAtual.getFullYear(),
                        dataAtual.getMonth(),
                        dataAtual.getDate() - 14
                      )
                        ? { background: 'red' }
                        : {}
                    }>
                      {new Date(Number(book.lend_day)).getDate() < 10 ? 0 : ''}
                      {new Date(Number(book.lend_day)).getDate()}/
                      {new Date(Number(book.lend_day)).getMonth() < 10 ? 0 : ''}
                      {new Date(Number(book.lend_day)).getMonth()}/
                      {new Date(Number(book.lend_day)).getFullYear()}
                    </td>
                  </tr>
                )
              })
          : data.books &&
            data.books.length > 0 &&
            data.books
              ?.sort(
                (x: IBook, y: IBook) => Number(x.lend_day) - Number(y.lend_day)
              )
              .map((book: any) => {
                return (
                  <tr
                    
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
                    <td   style={
                      new Date(Number(book.lend_day)) <
                      new Date(
                        dataAtual.getFullYear(),
                        dataAtual.getMonth(),
                        dataAtual.getDate() - 14
                      )
                        ? { background: '#E52A1B' }
                        : {}
                    }>
                      {new Date(Number(book.lend_day)).getDate() < 10 ? 0 : ''}
                      {new Date(Number(book.lend_day)).getDate()}/
                      {new Date(Number(book.lend_day)).getMonth() < 10 ? 0 : ''}
                      {new Date(Number(book.lend_day)).getMonth()}/
                      {new Date(Number(book.lend_day)).getFullYear()}
                    </td>
                  </tr>
                )
              })}
        <tr>
          <td></td>
        </tr>
      </tbody>
    </table>
  )
}