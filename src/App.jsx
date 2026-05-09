import './styles/site.css'
import Navbar from './components/Navbar.jsx'
import { Hero } from './components/Hero.jsx'
import { PremiumServices } from './components/PremiumServices.jsx'
import { FeaturedServices } from './components/FeaturedServices.jsx'
import { OurItems } from './components/OurItems.jsx'
import QuantityModal from './components/QuantityModal.jsx'
import { WhyChooseUs } from './components/WhyChooseUs.jsx'
import { ContactForm } from './components/ContactForm.jsx'
import { Footer } from './components/Footer.jsx'
import { useCartState } from './hooks/useCartState.js'
import { useFadeInObserver } from './hooks/useFadeInObserver.js'
import { useState } from 'react'

function App() {
  const { cartItems, toasts, addToCart, addToCartWithQuantity, removeFromCart, clearCart, calculateTotalCost } = useCartState()
  const totalCost = calculateTotalCost()
  useFadeInObserver()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalItem, setModalItem] = useState(null)

  const openQuantityModal = (item) => {
    setModalItem(item)
    setIsModalOpen(true)
  }

  const closeQuantityModal = () => {
    setIsModalOpen(false)
    setModalItem(null)
  }

  const handleAddWithQuantity = (quantity) => {
    if (typeof addToCartWithQuantity === 'function') {
      addToCartWithQuantity(modalItem, quantity)
    } else if (typeof addToCart === 'function') {
      addToCart(modalItem, quantity)
    }
  }


  return (
    <div className="remake-wrap">

      {/* ── Toast Portal ── */}
      <div className="toast-container" aria-live="polite" aria-atomic="false">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast--${toast.type}`}>
            <span className="toast-icon" aria-hidden="true">
              {toast.type === 'add' && '✓'}
              {toast.type === 'remove' && '✕'}
              {toast.type === 'warn' && '!'}
            </span>
            <span className="toast-message">{toast.message}</span>
          </div>
        ))}
      </div>

      <div className="mobile-card">
        <Navbar />

        <main>
          <Hero />

          <div className="wave" aria-hidden="true" />

          <PremiumServices />

          <FeaturedServices cartItems={cartItems} addToCart={addToCart} />

          <OurItems cartItems={cartItems} addToCart={addToCart} onRequestAdd={openQuantityModal} />

          <QuantityModal
            isOpen={isModalOpen}
            item={modalItem}
            onClose={closeQuantityModal}
            onConfirm={(qty) => { handleAddWithQuantity(qty); closeQuantityModal() }}
          />

          <WhyChooseUs />

          <ContactForm
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            totalCost={totalCost}
          />
        </main>

        <Footer />

        <button className="floating-help" type="button" aria-label="Get help">?</button>
      </div>
    </div>
  )
}

export default App