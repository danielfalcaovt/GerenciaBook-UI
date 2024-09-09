/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { LoaderContext } from './loader-context'

export const LoadingProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false)

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  )
}
