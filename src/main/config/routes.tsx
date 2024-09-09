import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/app-routes'
import DataContextProvider from '../context/data-context-provider'

export default function MakeRoutes() {
  return (
    <BrowserRouter>
      <DataContextProvider>
        <AppRoutes />
      </DataContextProvider>
    </BrowserRouter>
  )
}
