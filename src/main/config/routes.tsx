import React from 'react'
import { Route, Routes, BrowserRouter, Outlet, Navigate } from 'react-router-dom'
import { makeLoginPage } from '../factory/pages/login'
import AuthRoutes from '../middleware/auth-routes'

export default function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={makeLoginPage()}/>
        <Route path='/' element={<AuthRoutes><Navigate to='/book'/></AuthRoutes>} />
        <Route path='/book' element={<AuthRoutes><div><h1>hello mundo</h1><Outlet/></div></AuthRoutes>}>
          <Route path='/book/cadastrar' element={<h1>Cadastro</h1>}/>
          <Route path='/book/atualizar' element={<h1>Atualização</h1>}/>
          <Route path='/book/remover' element={<h1>Remoção</h1>}/>
          <Route path='/book/consultar' element={<h1>Consulta</h1>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}