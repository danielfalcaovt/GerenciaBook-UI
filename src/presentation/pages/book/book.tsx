/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Aside from '../../components/aside'
import BookTable from './table/book-table'
import UpArrow from '../../components/up-arrow'

export default function Book() {
  const [bookStyle, setBookStyle] = useState({
    bookContainer: {
      gridTemplateRows: '1fr'
    },
    bookSection: {
      gridArea: '1 / 1 / 1 / 1'
    }
  })
  return (
    <>
      <Aside setStyle={setBookStyle} />
      <main style={bookStyle.bookContainer} id="book-container">
        <article
          style={
            bookStyle.bookContainer.gridTemplateRows === '1fr'
              ? { display: 'none' }
              : {}
          }
          id="book-form"
        >
          <UpArrow
            onClick={() => {
              setBookStyle({
                bookContainer: {
                  gridTemplateRows: '1fr'
                },
                bookSection: {
                  gridArea: '1 / 1 / 1 / 1'
                }
              })
            }}
          />
          <Outlet />
        </article>
        <section style={bookStyle.bookSection}>
          <BookTable />
        </section>
      </main>
    </>
  )
}
