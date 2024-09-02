/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { BookControllerDependencies } from '../../protocols/controller'
import { Outlet } from 'react-router-dom'
import { HttpClientContext } from '../../../main/context/http-client-context'

export default function Book(dependencies: BookControllerDependencies) {
  const { HttpClient, setHttpClient } = useContext<any>(HttpClientContext)

  useEffect(() => {
    const path = window.location.pathname
      if (path.includes('cadastrar')) {
        console.log('book')
        setHttpClient(dependencies.httpPostClient)
      } else if (path.includes('remover')) {
        setHttpClient(dependencies.httpDeleteClient)
      } else if (path.includes('atualizar')) {
        setHttpClient(dependencies.httpPatchClient)
      } else if (path.includes('consultar')) {
        setHttpClient(dependencies.httpGetClient)
    }
  }, [])

  return (
    <>
      <h1>Header</h1>
      <div>
        <h1>Main</h1>
        <Outlet />
      </div>
      <h1>footer</h1>
    </>
  )
}
