import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import logo from './assets/logo.jpg'
import App from './App.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import AmcPlansPage from './pages/AmcPlansPage.jsx'

function setFavicon(href) {
  let link = document.querySelector('link[rel="icon"]')

  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }

  link.type = 'image/jpeg'
  link.href = href

  let appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]')

  if (!appleTouchIcon) {
    appleTouchIcon = document.createElement('link')
    appleTouchIcon.rel = 'apple-touch-icon'
    document.head.appendChild(appleTouchIcon)
  }

  appleTouchIcon.href = href
}

setFavicon(logo)

const isProductsPage = window.location.pathname.startsWith(`${import.meta.env.BASE_URL}products`)
const isAmcPlansPage = window.location.pathname.startsWith(`${import.meta.env.BASE_URL}amc-plans`)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isProductsPage ? <ProductsPage /> : isAmcPlansPage ? <AmcPlansPage /> : <App />}
  </StrictMode>,
)
