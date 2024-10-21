import React, { useContext } from 'react'
import { IBook } from '../../../domain/protocols/book/book'
import { DataContext } from '../../../main/context/data-context'

const TableRow: React.FC<IBook> = (book: IBook) => {
  const { data, setData } = useContext(DataContext)
  const dataAtual = new Date()

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
        {new Date(Number(book.lend_day)).getMonth() + 1 < 10 ? 0 : ''}
        {new Date(Number(book.lend_day)).getMonth() + 1}/
        {new Date(Number(book.lend_day)).getFullYear()}
      </td>
      <td>
        {book.phone
          ? book.phone?.length > 9
            ? `(${book.phone.slice(0, 2)}) ${book.phone.slice(
                2,
                7
              )} - ${book.phone.slice(7, book.phone.length)}`
            : `${book.phone.slice(0, 5)} - ${book.phone.slice(5, 9)}`
          : '---------'}
      </td>
    </tr>
  )
}

export default TableRow