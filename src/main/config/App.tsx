import React, { useState } from 'react'
import AppRoutes from './routes'
import { HttpClientContext } from '../context/http-client-context'
import { IHttpDeleteClient } from '../../data/protocols/http/delete/http-delete-client'
import { IHttpGetClient } from '../../data/protocols/http/get/http-get-client'
import { IHttpPatchClient } from '../../data/protocols/http/patch/http-patch-client'
import { IHttpPostClient } from '../../data/protocols/http/post/http-post-client'

function App() {
  const [HttpClient, setHttpClient] = useState<IHttpDeleteClient | IHttpGetClient | IHttpPatchClient | IHttpPostClient | undefined>(undefined)

  return (
    <>
      <HttpClientContext.Provider value={{ HttpClient, setHttpClient }}>
        <AppRoutes/>
      </HttpClientContext.Provider>
    </>
  )
}

export default App

