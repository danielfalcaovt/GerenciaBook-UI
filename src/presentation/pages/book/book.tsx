import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Aside from '../../components/aside'
import BookTable from './table/book-table'
import UpArrow from '../../components/up-arrow'

export default function Book() {
  const [mobileMenuVisibility, setMobileMenuVisibility] = useState(false)
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
      <Aside setMobileMenuVisibility={setMobileMenuVisibility} mobileMenuVisibility={mobileMenuVisibility} setStyle={setBookStyle} />
      <main style={bookStyle.bookContainer} id="book-container">
        <div id="drag-menu" onDrag={(evt) => {
          if (evt.pageX >= 100) {
            setMobileMenuVisibility(true)
          }
        }}></div>
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
