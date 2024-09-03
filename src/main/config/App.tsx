import React from 'react'
import AppRoutes from './routes'
import DataContextProvider from '../context/data-context-provider'

function App() {
  return (
    <DataContextProvider>
      <AppRoutes />
    </DataContextProvider>
  )
}

export default App
