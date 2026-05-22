import { useRef, useState } from 'react'
import { featuredServices } from '../data/services.js'

export function FeaturedServices({ cartItems = [], onBookNow }) {
  const featuredTrackRef = useRef(null)
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [bookedTitles, setBookedTitles] = useState(() => new Set((cartItems || []).map((c) => c.title)))
  const amcServiceTitle = 'Annual Maintenance Service (AMC)'

  const scrollTrack = (direction) => {
    if (!featuredTrackRef.current) return
    featuredTrackRef.current.scrollBy({ left: direction * 320, behavior: 'smooth' })
  }

  const redirectToAmcPlans = () => {
    window.location.href = `${import.meta.env.BASE_URL}amc-plans`
  }

  const openPhoneModal = (service) => {
    setSelectedService(service)
    setPhoneNumber('')
    setPhoneError('')
    setIsPhoneModalOpen(true)
  }

  const closePhoneModal = () => {
    setIsPhoneModalOpen(false)
    setSelectedService(null)
    setPhoneNumber('')
    setPhoneError('')
  }

  const handlePhoneSubmit = (event) => {
    event.preventDefault()

    if (!selectedService) {
      return
    }

    const trimmedValue = phoneNumber.trim()
    const digitCount = trimmedValue.replace(/\D/g, '').length
    const isValidFormat = /^[+\d\s-]+$/.test(trimmedValue)

    if (!trimmedValue || digitCount < 7 || !isValidFormat) {
      setPhoneError('Please enter a valid phone number.')
      return
    }

    onBookNow?.(selectedService, trimmedValue)
    // mark booked locally for immediate UI feedback; will be synced from cartItems shortly
    setBookedTitles((prev) => {
      const next = new Set(prev)
      next.add(selectedService.title)
      return next
    })
    closePhoneModal()
  }

  // NOTE: `bookedTitles` is an optimistic set updated on booking to give
  // immediate UI feedback. It is not synced back from `cartItems` here to
  // avoid cascading renders — cart changes will still reflect on next render.

  return (
    <section className="block featured-section fade-in" id="featured-services">
      <div className="featured-header">
        <div className="section-title">
          <h2>Featured Services</h2>
          <span className="underline" aria-hidden="true" />
        </div>
        <div className="featured-controls" aria-label="featured service controls">
          <button className="scroll-btn" type="button" onClick={() => scrollTrack(-1)} aria-label="Scroll left">
            <span aria-hidden="true">{'<'}</span>
          </button>
          <button className="scroll-btn" type="button" onClick={() => scrollTrack(1)} aria-label="Scroll right">
            <span aria-hidden="true">{'>'}</span>
          </button>
        </div>
      </div>

      <p className="section-guide">Book each service by clicking "Book Now" — enter your phone number and our team will contact you to confirm details. Final price is determined on site.</p>

      <div className="featured-track" ref={featuredTrackRef}>
          {featuredServices.map((item) => {
          const isAmcService = item.title === amcServiceTitle
          const inCart = (cartItems || []).some((cartItem) => cartItem.title === item.title) || bookedTitles.has(item.title)

          const handleCardClick = () => {
            if (!isAmcService) return
            redirectToAmcPlans()
          }

          const handleCardKeyDown = (event) => {
            if (!isAmcService) return
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              redirectToAmcPlans()
            }
          }

          return (
            <article
              className={`featured-card${isAmcService ? ' featured-card--clickable' : ''}`}
              key={item.title}
              onClick={handleCardClick}
              onKeyDown={handleCardKeyDown}
              role={isAmcService ? 'button' : undefined}
              tabIndex={isAmcService ? 0 : undefined}
              aria-label={isAmcService ? 'Open AMC plans page' : undefined}
            >
              <div className="shop-icon-wrap">
                <img src={item.image} alt={item.title} loading="lazy" className="shop-icon" />
              </div>
              <div className="featured-body">
                <h3>{item.title}</h3>
                <p className="featured-description">{item.description}</p>
                {isAmcService ? (
                  <button
                    type="button"
                    className="amc-view-plans-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      redirectToAmcPlans()
                    }}
                    aria-label="View AMC pricing plans"
                  >
                    Click to view pricing plans
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`featured-action${inCart ? ' featured-action--added' : ''}`}
                    onClick={() => { if (!inCart) openPhoneModal(item) }}
                    aria-label={inCart ? `${item.title} already booked` : `Book ${item.title}`}
                    disabled={inCart}
                  >
                    {inCart ? '✓ Booked' : 'Book Now'}
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </div>

      {isPhoneModalOpen ? (
        <div className="modal-overlay" onClick={closePhoneModal} role="dialog" aria-modal="true" aria-hidden={!isPhoneModalOpen}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <h3 className="modal-title">Enter Phone Number</h3>
            <form onSubmit={handlePhoneSubmit}>
              <div className="modal-body">
                <label className="modal-label" htmlFor="featuredServicePhone">Phone</label>
                <input
                  id="featuredServicePhone"
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
    </section>
  )
}
