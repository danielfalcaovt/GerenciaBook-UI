import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { makeLoginPage } from '../factory/pages/login'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={makeLoginPage()}/>
      </Routes>
    </BrowserRouter>
  )
}