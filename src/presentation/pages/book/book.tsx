/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { DataContext } from '../../../main/context/data-context'
import { IBook } from '../../../domain/protocols/book/book'
import Aside from '../../components/aside'

export default function Book() {
  const { data, setData } = useContext(DataContext)
  return (
    <>
      <Aside />
      <div>
        <table>
          <thead>
            <th>Livro</th>
            <th>Estudante</th>
            <th>Classe</th>
            <th>Data do Empréstimo</th>
          </thead>
          <tbody>
            {data.filteredBooks
              ? data.filteredBooks?.sort((x: IBook, y:IBook) => Number(x.lend_day) - Number(y.lend_day)).map((book: any) => {
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
                      <td>{new Date(book.lend_day).getDate()}</td>
                    </tr>
                  )
                })
              : data.books &&
                data.books.length > 0 &&
                data.books?.sort((x: IBook, y:IBook) => Number(x.lend_day) - Number(y.lend_day)).map((book: any) => {
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
                      <td>{String(new Date(Number(book.lend_day))).slice(0, 10)}</td>
                    </tr>
                  )
                })}
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
        <Outlet />
      </div>
    </>
  )
}
