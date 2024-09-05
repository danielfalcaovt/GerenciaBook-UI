/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { DataContext } from '../../../main/context/data-context'

export default function Book() {
  const { data, setData } = useContext(DataContext)
  return (
    <>
      <h1>Header</h1>
      <div>
        <h1>Main</h1>
        <table>
          <thead>
            <th>nome</th>
            <th>teste</th>
            <th>asdkoad</th>
          </thead>
          <tbody>
            {data.filteredBooks
              ? data.filteredBooks.map((book) => {
                  return (
                    <tr>
                      <td>{book.book_name}</td>
                      <td>{book.student_name}</td>
                      <td>{book.student_class}</td>
                    </tr>
                  )
                })
              : data.books &&
                data.books.length > 0 &&
                data.books?.map((book) => {
                  return (
                    <tr>
                      <td>{book.book_name}</td>
                      <td>{book.student_name}</td>
                      <td>{book.student_class}</td>
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
      <h1>footer</h1>
    </>
  )
}
