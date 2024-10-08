import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import AuthRoutes from '../../middleware/auth-routes'
import make404Page from '../../factory/pages/error/404'
import {
  makeBookPage,
  makePostBookPage,
  makeGetBookPage,
  makeUpdateBookPage,
  makeLoginPage,
  makeSignUpPage
} from '../config-protocols'
import { makeDeleteBookPage } from '../../factory/components/form/delete-book'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={makeLoginPage()} />
      <Route path="/signup" element={makeSignUpPage()} />
      <Route path="/book" element={<AuthRoutes>{makeBookPage()}</AuthRoutes>}>
        <Route path="/book/cadastrar" element={makePostBookPage()} />
        <Route path="/book/atualizar" element={makeUpdateBookPage()} />
        <Route path="/book/devolver" element={makeDeleteBookPage()} />
        <Route path="/book/consultar" element={makeGetBookPage()} />
      </Route>
      <Route
        path="/"
        element={
          <AuthRoutes>
            <Navigate to="/book" />
          </AuthRoutes>
        }
      />
      <Route path="*" element={make404Page()} />
    </Routes>
  )
}
