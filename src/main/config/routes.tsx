import React from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import AuthRoutes from '../middleware/auth-routes'
import make404Page from '../factory/pages/error/404'
import { makeLoginPage, makeSignUpPage, makeBookPage, makePostBookPage, makeGetBookPage } from './config-protocols'

export default function AppRoutes() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={makeLoginPage()}/>
        <Route path='/signup' element={makeSignUpPage()} />
        <Route path='/book' element={<AuthRoutes>{makeBookPage()}</AuthRoutes>}>
          <Route path='/book/cadastrar' element={makePostBookPage()}/>
          <Route path='/book/atualizar' element={<h1>Atualização</h1>}/>
          <Route path='/book/remover' element={<h1>Remoção</h1>}/>
          <Route path='/book/consultar' element={makeGetBookPage()}/>
        </Route>
        <Route path='/' element={<AuthRoutes><Navigate to='/book'/></AuthRoutes>} />
        <Route path='*' element={make404Page()} />
      </Routes>
    </BrowserRouter>
  )
}