/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Outlet } from 'react-router-dom'
import Aside from '../../components/aside'
import BookTable from './table/book-table'

export default function Book() {
  return (
    <>
      <Aside />
      <main id="book-container">
        <section>
          <BookTable />
        </section>
        <article id='book-form'>
          <Outlet />
        </article>
      </main>
    </>
  )
}
