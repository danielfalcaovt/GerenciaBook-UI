/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function AuthRoutes({ children }: any) {
  const token = localStorage.getItem('token')
  if (token) {
    return children
  }else {
    return (
      <Navigate to={'/login'}/>
    )
  }
}