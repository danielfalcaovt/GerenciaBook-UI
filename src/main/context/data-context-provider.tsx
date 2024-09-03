/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { DataContext } from './data-context'
import Loader from '../../presentation/components/loader'

export default function DataContextProvider({ children }: any) {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  
  return (
    <>
      {loading && <Loader />}
      <DataContext.Provider value={{ data, setData }}>
        {children}
      </DataContext.Provider>
    </>
  )
}
