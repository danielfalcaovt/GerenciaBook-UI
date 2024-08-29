import { AxiosPostClient } from '../../infra/axios-http-client/axios-post-client'
import Login from '../../presentation/pages/login'
import env from './env'

function App() {
  return (
    <>
      <Login
        url={env.API_URL || 'any_url'}
        httpPostClient={new AxiosPostClient()}
      />
    </>
  )
}

export default App

