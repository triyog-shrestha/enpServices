import { useEffect, useState } from 'react'

const CART_STORAGE_KEY = 'elec-cart-items'

function loadCartItems() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedItems = window.localStorage.getItem(CART_STORAGE_KEY)
    const parsedItems = storedItems ? JSON.parse(storedItems) : []
    return parsedItems.map((item) => ({
      ...item,
      quantity: Number.isInteger(item.quantity) && item.quantity > 0 ? item.quantity : 1,
    }))
  } catch {
    return []
  }
}

export function useCartState() {
  const [cartItems, setCartItems] = useState(loadCartItems)
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const showToast = (message, type = 'add') => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  const addToCart = (item) => {
    // legacy single-arg support: default to quantity 1
    return addToCartWithQuantity(item, 1)
  }

  const addToCartWithQuantity = (item, quantity) => {
    const qty = Number.parseInt(quantity, 10)
    if (!Number.isInteger(qty) || qty <= 0) {
      showToast('Please enter a valid quantity greater than 0.', 'warn')
      return
    }

    setCartItems((prev) => {
      const nextItems = prev.filter((cartItem) => cartItem.title !== item.title)
      return [...nextItems, { ...item, quantity: qty }]
    })
    showToast(`Added ${qty} x ${item.title}`, 'add')
  }

  const removeFromCart = (title) => {
    setCartItems((prev) => prev.filter((item) => item.title !== title))
    showToast(`Removed: ${title}`, 'remove')
  }

  const clearCart = () => {
    setCartItems([])
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(CART_STORAGE_KEY)
    }
  }

  const calculateTotalCost = () => {
    const total = cartItems.reduce((sum, item) => {
      const rawPrice = item.price
      let n = Number.NaN

      if (typeof rawPrice === 'number') {
        n = rawPrice
      } else if (typeof rawPrice === 'string') {
        const normalizedPrice = rawPrice.replace(/,/g, '')
        const match = normalizedPrice.match(/-?\d+(?:\.\d+)?/)
        n = match ? Number.parseFloat(match[0]) : Number.NaN
      }

      const quantity = Number.isInteger(item.quantity) && item.quantity > 0 ? item.quantity : 1
      return Number.isNaN(n) ? sum : sum + n * quantity
    }, 0)
    const rounded = Math.round(total * 100) / 100
    const formatted = rounded % 1 === 0 ? rounded.toLocaleString('en-US') : rounded.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return `Rs ${formatted}`
  }

  return { cartItems, toasts, addToCart, addToCartWithQuantity, removeFromCart, clearCart, calculateTotalCost }
}
