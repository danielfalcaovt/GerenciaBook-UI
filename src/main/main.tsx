import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './config/App.tsx'
import { LoadingProvider } from './context/loader-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </StrictMode>
)
