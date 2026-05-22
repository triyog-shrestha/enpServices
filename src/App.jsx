import './styles/site.css'
import Navbar from './components/Navbar.jsx'
import { Hero } from './components/Hero.jsx'
import { MeetOurDirector } from './components/MeetOurDirector.jsx'
import { FeaturedServices } from './components/FeaturedServices.jsx'
import { OurItems } from './components/OurItems.jsx'
import QuantityModal from './components/QuantityModal.jsx'
import { WhyChooseUs } from './components/WhyChooseUs.jsx'
import { ContactForm } from './components/ContactForm.jsx'
import { Footer } from './components/Footer.jsx'
import { useCartState } from './hooks/useCartState.js'
import { useFadeInObserver } from './hooks/useFadeInObserver.js'
import { useState, useEffect, useRef } from 'react'

function App() {
  const { cartItems, toasts, addToCart, addToCartWithQuantity, removeFromCart, clearCart, calculateTotalCost } = useCartState()
  const totalCost = calculateTotalCost()
  useFadeInObserver()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalItem, setModalItem] = useState(null)
  const formRef = useRef(null)

  const handleFeaturedServiceBooking = (item, phoneNumber) => {
    const bookingItem = {
      ...item,
      category: item.premiumCategory || 'Featured Service',
    }

    addToCart(bookingItem)

    setTimeout(() => {
      const form = formRef.current
      if (!form) {
        return
      }

      const phoneInput = form.querySelector('input[name="phone"]')
      const messageInput = form.querySelector('textarea[name="message"]')

      if (phoneInput) {
        phoneInput.value = phoneNumber
      }

      if (messageInput) {
        messageInput.value = `Featured service booking: ${item.title}`
      }

      const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
      form.dispatchEvent(submitEvent)
    }, 350)
  }

  // Handle AMC form auto-submission
  useEffect(() => {
    const pendingData = localStorage.getItem('pendingAMCSubmission')
    if (pendingData && formRef.current) {
      try {
        const { phoneNumber } = JSON.parse(pendingData)
        
        // Set a small delay to ensure form is fully rendered
        const timer = setTimeout(() => {
          const phoneInput = formRef.current?.querySelector('input[name="phone"]')
          if (phoneInput) {
            phoneInput.value = phoneNumber
            
            // Auto-submit the form after a brief delay
            setTimeout(() => {
              if (formRef.current) {
                const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
                formRef.current.dispatchEvent(submitEvent)
              }
              // Clear the stored data after submission
              localStorage.removeItem('pendingAMCSubmission')
            }, 100)
          }
        }, 300)
        
        return () => clearTimeout(timer)
      } catch (error) {
        console.error('Error processing AMC submission:', error)
        localStorage.removeItem('pendingAMCSubmission')
      }
    }
  }, [])

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

          <FeaturedServices cartItems={cartItems} onBookNow={handleFeaturedServiceBooking} />


          <OurItems cartItems={cartItems} addToCart={addToCart} onRequestAdd={openQuantityModal} />


          <QuantityModal
            isOpen={isModalOpen}
            item={modalItem}
            onClose={closeQuantityModal}
            onConfirm={(qty) => { handleAddWithQuantity(qty); closeQuantityModal() }}
          />

          <WhyChooseUs />

          <MeetOurDirector />

          <ContactForm
            ref={formRef}
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