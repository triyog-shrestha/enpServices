import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductsPage from './pages/ProductsPage.jsx'

const isProductsPage = window.location.pathname.startsWith(`${import.meta.env.BASE_URL}products`)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isProductsPage ? <ProductsPage /> : <App />}
  </StrictMode>,
)
