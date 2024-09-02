import React, { useState } from 'react'
import AppRoutes from './routes'
import { HttpClientContext } from '../context/http-client-context'
import { IHttpDeleteClient } from '../../data/protocols/http/delete/http-delete-client'
import { IHttpGetClient } from '../../data/protocols/http/get/http-get-client'
import { IHttpPatchClient } from '../../data/protocols/http/patch/http-patch-client'
import { IHttpPostClient } from '../../data/protocols/http/post/http-post-client'
import { DataContext } from '../context/data-context'

function App() {
  const [HttpClient, setHttpClient] = useState<IHttpDeleteClient | IHttpGetClient | IHttpPatchClient | IHttpPostClient | undefined>(undefined)
  const [data, setData] = useState(DataContext)

  return (
    <>
      <HttpClientContext.Provider value={{ HttpClient, setHttpClient }}>
        <DataContext.Provider value={{ data, setData }}>
          <AppRoutes/>
        </DataContext.Provider>
      </HttpClientContext.Provider>
    </>
  )
}

export default App

