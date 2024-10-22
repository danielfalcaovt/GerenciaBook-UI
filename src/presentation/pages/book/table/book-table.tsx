import { useContext } from 'react'
import { DataContext } from '../../../../main/context/data-context'
import { IBook } from '../../../../domain/protocols/book/book'
import TableRow from '../../../elements/table/table-row'

export default function BookTable() {
  const { data } = useContext(DataContext)

  return (
    <table>
      <thead>
        <tr id="booktable-header">
          <th id="tablebook_name">Livro</th>
          <th id="tablestudent_name">Estudante</th>
          <th id="tablestudent_class">Classe</th>
          <th id="tablelend_day">Data do Empréstimo</th>
          <th id="tablephone">Celular</th>
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
                  <TableRow
                    book_name={book.book_name}
                    id={book.id}
                    lend_day={book.lend_day}
                    student_class={book.student_class}
                    student_name={book.student_name}
                    key={book.id}
                    phone={book.phone}
                  />
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
                  <TableRow
                    book_name={book.book_name}
                    id={book.id}
                    lend_day={book.lend_day}
                    student_class={book.student_class}
                    student_name={book.student_name}
                    key={book.id}
                    phone={book.phone}
                  />
                )
              })}
      </tbody>
    </table>
  )
}
