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

const amcInfoBlocks = [
  {
    title: 'What is an AMC?',
    body: [
      'Think of an Electrical AMC (Annual Maintenance Contract) as a year-round health insurance policy for your building\'s power grid.',
      'It is a simple, ongoing contract that covers your routine maintenance and steps in to fix unexpected electrical problems before they get out of hand. Instead of waiting for a fuse to blow or a machine to break down, an AMC ensures your systems are regularly checked, cleaned, and tested by professionals.',
    ],
  },
  {
    title: 'Why do you need it?',
    items: [
      'It prevents electrical disasters: Loose wires and overloaded panels are the leading causes of workplace electrical fires. Regular check-ups spot these hidden dangers early, keeping your team and your property safe.',
      'It stops problems before they start: The main goal of an AMC is prevention. By catching small glitches today, it ensures you won\'t face a major, unexpected electrical issue tomorrow that shuts down your business.',
      'Zero stress, zero hassle: When a power issue does pop up, you don\'t have to scramble to find a reliable technician or worry about sudden, expensive repair bills. You just make one call, and a dedicated team is already on the way to fix it.',
    ],
  },
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
            <span className="hero-eyebrow">Annual Maintenance Plans</span>
            <h1>Choose The AMC Package That Fits Your Property</h1>

            <div className="amc-info-grid">
              {amcInfoBlocks.map((block) => (
                <article className="amc-info-card" key={block.title}>
                  <h2>{block.title}</h2>
                  {'body' in block ? (
                    block.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                  ) : (
                    <ul>
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
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
                <article className="amc-card" key={plan.name}>
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
