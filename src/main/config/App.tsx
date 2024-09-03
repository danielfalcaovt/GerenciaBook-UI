import React, { useState } from 'react'
import AppRoutes from './routes'
import { DataContext } from '../context/data-context'

function App() {
  const [data, setData] = useState({})

  return (
    <>
      <DataContext.Provider value={{ data, setData }}>
        <AppRoutes />
      </DataContext.Provider>
    </>
  )
}

export default App
