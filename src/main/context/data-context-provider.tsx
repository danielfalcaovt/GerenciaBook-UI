/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from './data-context'
import Loader from '../../presentation/components/loader'
import { AxiosGetClient } from '../../infra/axios-http-client/get/axios-get-client'
import { LocalStorageRepository } from '../../infra/local-storage/local-storage'
import env from '../config/env'
import { HttpResponse } from '../../presentation/protocols/http'
import { LoaderContext } from './loader-context'

export default function DataContextProvider({ children }: any) {
  const [data, setData] = useState({ books: [] })
  const {loading, setLoading} = useContext(LoaderContext)

  useEffect(() => {
    const localStorageRepo = new LocalStorageRepository()
    const token = localStorageRepo.getItem('token')
    setLoading(true)
    const httpClient = new AxiosGetClient(token ? token : undefined)
    httpClient.get({ url: env.API_URL + '/books' })
      .then((result: HttpResponse) => {
        setData((oldValue: any) => ({
          ...oldValue,
          books: result.body
        }))
      })
      .catch((err: any) => {
        console.log(err)
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <>
      {loading && <Loader />}
      <DataContext.Provider value={{ data, setData }}>
        {children}
      </DataContext.Provider>
    </>
  )
}
