import '../styles/site.css'
import './amc-plans-page.css'
import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { useFadeInObserver } from '../hooks/useFadeInObserver.js'
import { useCartState } from '../hooks/useCartState.js'

const commonPlanFeatures = [
  'Inspection of electrical panels and distribution boards',
  'Backup power maintenance',
  'Power room inspection',
  'MCB, switch, socket, and wiring checks',
  'Preventive maintenance to avoid breakdowns',
  'Emergency repair support',
  'Load and safety assessment',
  'Electrical parameter testing',
  'Energy analysis and reporting',
  'Inverter and battery maintenance',
  'Surge and fault checking',
  'Maintenance reports/documentation',
  'Emergency visit within 1 hour',
]

const amcPlans = [
  {
    name: 'Small Scale Business',
    amount: 3000,
    price: 'Rs. 3,000/month',
    notes: 'Coverage time 8 AM - 6 PM',
    features: ['1 mandatory visit', ...commonPlanFeatures],
  },
  {
    name: 'Small Scale Business (Tier 2)',
    amount: 5000,
    price: 'Rs. 5,000/month',
    notes: 'Coverage time 24/7',
    isPopular: true,
    features: ['2 mandatory visit', ...commonPlanFeatures, 'Networking', 'CCTV maintenance'],
  },
  {
    name: 'Medium Scale Business',
    amount: 8000,
    price: 'Rs. 8,000/month',
    notes: 'Coverage time 24/7',
    features: ['2 mandatory visit', ...commonPlanFeatures, 'Networking', 'CCTV maintenance'],
  },
  {
    name: 'Large Scale Business',
    amount: 10000,
    price: 'Rs. 10,000/month',
    notes: 'Coverage time 24/7',
    features: ['2 mandatory visit', ...commonPlanFeatures, 'Networking', 'CCTV maintenance'],
  },
  {
    name: 'Hospital and Other Industries',
    amount: null,
    price: 'Flexible pricing',
    notes: 'Coverage time 24/7',
    features: ['2 mandatory visit', ...commonPlanFeatures, 'Networking', 'CCTV maintenance'],
  },
]

function AmcPlansPage() {
  useFadeInObserver()
  const { cartItems, toasts, addToCart } = useCartState()
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const openPhoneModal = (plan) => {
    setSelectedPlan(plan)
    setPhoneNumber('')
    setPhoneError('')
    setIsPhoneModalOpen(true)
  }

  const closePhoneModal = () => {
    setIsPhoneModalOpen(false)
    setSelectedPlan(null)
    setPhoneNumber('')
    setPhoneError('')
  }

  const handlePhoneSubmit = (event) => {
    event.preventDefault()
    if (!selectedPlan) {
      return
    }

    const trimmedValue = phoneNumber.trim()
    const digitCount = trimmedValue.replace(/\D/g, '').length
    const isValidFormat = /^[+\d\s-]+$/.test(trimmedValue)

    if (!trimmedValue || digitCount < 7 || !isValidFormat) {
      setPhoneError('Please enter a valid phone number.')
      return
    }

    const cartTitle = `AMC - ${selectedPlan.name}`
    const cartPrice = typeof selectedPlan.amount === 'number' ? selectedPlan.amount : selectedPlan.price

    addToCart({ title: cartTitle, price: cartPrice, category: 'AMC Plan', phoneNumber: trimmedValue })
    
    // Store phone number for form auto-submission
    localStorage.setItem('pendingAMCSubmission', JSON.stringify({
      phoneNumber: trimmedValue,
      planName: selectedPlan.name,
      planPrice: cartPrice
    }))
    
    closePhoneModal()

    setTimeout(() => {
      window.location.href = `${import.meta.env.BASE_URL}#book`
    }, 350)
  }

  return (
    <div className="remake-wrap amc-page">
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
          <section className="block amc-hero fade-in">
            <div className="amc-hero-head">
              <h1>Choose The AMC Package That Fits Your Property</h1>
              <p className="amc-hero-subtitle">
                Protect your electrical systems, reduce downtime, and stay ahead of costly breakdowns with a plan tailored to your property.
              </p>
              <button type="button" className="amc-info-link" onClick={() => setIsInfoModalOpen(true)}>
                What is an AMC? Learn more
              </button>
            </div>
          </section>

          <section className="block featured-section fade-in" id="amc-plans">
            <div className="section-title">
              <h2>AMC Plan Pricing</h2>
              <span className="underline" aria-hidden="true" />
            </div>

            <p className="section-guide">Select an AMC plan and click "Book Now" to enter your phone number; our team will contact you to confirm plan details and pricing.</p>

            <div className="amc-grid">
              {amcPlans.map((plan) => {
                const cartTitle = `AMC - ${plan.name}`
                const inCart = cartItems.some((item) => item.title === cartTitle)

                return (
                <article className={`amc-card${plan.isPopular ? ' amc-card--popular' : ''}`} key={plan.name}>
                  {plan.isPopular ? <span className="amc-card-badge">Most Popular</span> : null}
                  <h3 className="amc-card-title">{plan.name}</h3>
                  <div className="amc-card-body">
                    <p className="amc-price">{plan.price}</p>
                    <p className="amc-billing">{plan.notes}</p>
                    <button
                      className={`amc-book-btn${inCart ? ' amc-book-btn--added' : ''}`}
                      type="button"
                      onClick={() => openPhoneModal(plan)}
                      aria-label={inCart ? `${plan.name} already added to cart` : `Add ${plan.name} plan to cart`}
                    >
                      {inCart ? '✓ Added' : 'Book Now'}
                    </button>

                    <ul className="amc-features">
                      {plan.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </article>
                )
              })}
            </div>
          </section>
        </main>

        {isInfoModalOpen ? (
          <div className="modal-overlay" onClick={() => setIsInfoModalOpen(false)} role="dialog" aria-modal="true" aria-hidden={!isInfoModalOpen}>
            <div className="modal-card amc-info-modal-card" onClick={(event) => event.stopPropagation()}>
              <h3 className="modal-title">What is an AMC?</h3>
              <div className="modal-body">
                <p className="amc-info-text">
                  An Annual Maintenance Contract is a proactive service plan that keeps your electrical systems inspected, maintained, and protected year-round. Instead of waiting for failures to happen, an AMC helps prevent breakdowns, reduces downtime, and gives you fast support when issues arise.
                </p>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-primary" onClick={() => setIsInfoModalOpen(false)}>Close</button>
              </div>
            </div>
          </div>
        ) : null}

        {isPhoneModalOpen ? (
          <div className="modal-overlay" onClick={closePhoneModal} role="dialog" aria-modal="true" aria-hidden={!isPhoneModalOpen}>
            <div className="modal-card" onClick={(event) => event.stopPropagation()}>
              <h3 className="modal-title">Enter Phone Number</h3>
              <form onSubmit={handlePhoneSubmit}>
                <div className="modal-body">
                  <label className="modal-label" htmlFor="amcPhone">Phone</label>
                  <input
                    id="amcPhone"
                    className="modal-input"
                    type="tel"
                    value={phoneNumber}
                    onChange={(event) => {
                      setPhoneNumber(event.target.value)
                      if (phoneError) {
                        setPhoneError('')
                      }
                    }}
                    placeholder="+977"
                    autoFocus
                  />
                </div>

                {phoneError ? <p className="amc-phone-error">{phoneError}</p> : null}

                <div className="modal-actions">
                  <button type="button" className="btn btn-ghost" onClick={closePhoneModal}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Continue</button>
                </div>
              </form>
            </div>
          </div>
        ) : null}

        <Footer />
      </div>
    </div>
  )
}

export default AmcPlansPage
