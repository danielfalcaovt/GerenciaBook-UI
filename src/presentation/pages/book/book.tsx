/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { BookControllerDependencies } from '../../protocols/controller'
import PostBookForm from './post/post-book-form'
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
