import React, { useContext } from 'react'
import Routes from './routes'
import { LoaderContext } from '../context/loader-context'
import Loader from '../../presentation/components/loader'

function App() {
  const { loading } = useContext(LoaderContext)
  return (
    <>
      {loading && <Loader />}
      <Routes />
    </>
  )
}

export default App
