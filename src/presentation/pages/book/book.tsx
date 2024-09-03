/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Book() {
  return (
    <>
      <h1>Header</h1>
      <div>
        <h1>Main</h1>
        <Outlet/>
      </div>
      <h1>footer</h1>
    </>
  )
}
