import React from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import { makeLoginPage } from '../factory/pages/login'
import { makeSignUpPage } from '../factory/pages/signup'
import AuthRoutes from '../middleware/auth-routes'
import make404Page from '../factory/pages/404'
import { makeBookPage } from '../factory/pages/book'
import PostBookForm from '../../presentation/pages/book/post/post-book-form'

export default function AppRoutes() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={makeLoginPage()}/>
        <Route path='/signup' element={makeSignUpPage()} />
        <Route path='/book' element={<AuthRoutes>{makeBookPage()}</AuthRoutes>}>
          <Route path='/book/cadastrar' element={<PostBookForm/>}/>
          <Route path='/book/atualizar' element={<h1>Atualização</h1>}/>
          <Route path='/book/remover' element={<h1>Remoção</h1>}/>
          <Route path='/book/consultar' element={<h1>Consulta</h1>}/>
        </Route>
        <Route path='/' element={<AuthRoutes><Navigate to='/book'/></AuthRoutes>} />
        <Route path='*' element={make404Page()} />
      </Routes>
    </BrowserRouter>
  )
}