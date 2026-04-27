import './styles/site.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import heroPlaceholder from './assets/hero.png'

function App() {
  const featuredTrackRef = useRef(null)
  const itemsTrackRef = useRef(null)
  const [cartItems, setCartItems] = useState([])
  const [toasts, setToasts] = useState([])

  const services = useMemo(
    () => [
      {
        title: 'Electrical',
        description:
          'Safe wiring, fault diagnosis, and reliable electrical maintenance for residential and commercial spaces. We handle upgrades, distribution checks, and preventive inspections to keep your systems stable, efficient, and compliant over time.',
        image: heroPlaceholder,
      },
      {
        title: 'Plumbing',
        description:
          'Leak fixing, fixture installation, and complete plumbing maintenance with quick turnaround times. From pressure balancing to pipeline checks, we provide long-term plumbing reliability for kitchens, bathrooms, and utility areas.',
        image: heroPlaceholder,
      },
      {
        title: 'AC',
        description:
          'Cooling system service, deep cleaning, and seasonal performance tuning for efficient operation. Our technicians optimize airflow, improve cooling consistency, and reduce energy usage through structured maintenance routines.',
        image: heroPlaceholder,
      },
      {
        title: 'Networking',
        description:
          'Structured network setup, router troubleshooting, and stable connectivity for homes and offices. We design dependable local networks with better coverage, clean cabling, and responsive support for ongoing performance.',
        image: heroPlaceholder,
      },
      {
        title: 'Appliance & Electronics Repair',
        description:
          'Repair and diagnostics for everyday appliances and electronics by experienced technicians. We isolate faults quickly, replace critical components, and restore dependable operation with quality-tested repair workflows.',
        image: heroPlaceholder,
      },
      {
        title: 'Motor service',
        description:
          'Inspection, repair, and preventive servicing for motors, pumps, and related systems. Our service includes vibration checks, load testing, and maintenance plans that extend equipment life and reduce downtime.',
        image: heroPlaceholder,
      },
    ],
    [],
  )

  const reasons = useMemo(
    () => [
      { icon: 'shield', title: 'Fast Response', text: 'Dedicated 24x7 response for technical incidents.' },
      { icon: 'tool', title: 'Skilled Pros', text: 'Certified experts in electrical and plumbing systems.' },
      { icon: 'clock', title: 'Real-Time ETA', text: 'Transparent tracking from dispatch to arrival.' },
      { icon: 'help', title: '24/7 Support', text: 'Always available for urgent technical consultations.' },
    ],
    [],
  )

  const stats = useMemo(
    () => [
      { label: 'TASKS RESOLVED', value: '2500+' },
      { label: 'SKILLED PROS', value: '120+' },
      { label: 'FREE FROM ERRORS', value: '95%' },
      { label: '24/7 SUPPORT', value: 'Always Available' },
    ],
    [],
  )

  const featuredServices = useMemo(
    () => [
      {
        title: 'Home Wiring Fault Diagnosis',
        premiumCategory: 'Electrical',
        price: 'Rs 2,500.00',
        description: 'Complete circuit and wiring fault detection with safety checks for stable home power systems.',
        image: heroPlaceholder,
      },
      {
        title: 'Leak Detection and Pipe Repair',
        premiumCategory: 'Plumbing',
        price: 'Rs 1,500.00',
        description: 'Quick leak tracing and damaged pipe replacement to restore reliable water flow in your property.',
        image: heroPlaceholder,
      },
      {
        title: 'Deep AC Cleaning and Gas Check',
        premiumCategory: 'AC',
        price: 'Rs 650.00 / Unit',
        description: 'Filter wash, cooling coil cleanup, and refrigerant performance check for efficient air conditioning.',
        image: heroPlaceholder,
      },
      {
        title: 'Home and Office Wi-Fi Setup',
        premiumCategory: 'Networking',
        price: 'Rs 11,000.00',
        description: 'Router configuration, coverage optimization, and secure Wi-Fi setup for reliable connectivity.',
        image: heroPlaceholder,
      },
      {
        title: 'Pump and Motor Health Service',
        premiumCategory: 'Motor Service',
        price: 'Rs 1,500.00',
        description: 'Load testing, noise and vibration checks, and preventive maintenance for motors and pumps.',
        image: heroPlaceholder,
      },
    ],
    [],
  )

  const inventoryItems = useMemo(
    () => [
      {
        title: '9W Smart LED Bulb',
        category: 'Lighting',
        price: 'Rs 450.00',
        description: 'Long-lasting energy efficient LED bulb with 2-year replacement warranty.',
        image: heroPlaceholder,
      },
      {
        title: '20W T5 LED Tubelight',
        category: 'Lighting',
        price: 'Rs 750.00',
        description: 'High-lumen slim tubelight for kitchen cabinets and office desks.',
        image: heroPlaceholder,
      },
      {
        title: 'Modular Switch Plate',
        category: 'Electrical',
        price: 'Rs 1,200.00',
        description: 'Shock-proof flame retardant 6-module switch plate with matte finish.',
        image: heroPlaceholder,
      },
      {
        title: 'Copper Wiring (90m Roll)',
        category: 'Cabling',
        price: 'Rs 3,500.00',
        description: 'Pure copper insulated wire for heavy-duty household load distribution.',
        image: heroPlaceholder,
      },
      {
        title: 'Digital Multimeter',
        category: 'Tools',
        price: 'Rs 2,800.00',
        description: 'Precision diagnostic tool for measuring voltage, current, and resistance.',
        image: heroPlaceholder,
      },
    ],
    [],
  )

  const scrollTrack = (ref, direction) => {
    if (!ref.current) return
    ref.current.scrollBy({ left: direction * 320, behavior: 'smooth' })
  }

  const showToast = (message, type = 'add') => {
    const id = crypto.randomUUID(); // Generates a truly unique string
    
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const addToCart = (item) => {
    const alreadyInCart = cartItems.some((c) => c.title === item.title)
    if (alreadyInCart) {
      showToast(`Already added: ${item.title}`, 'warn')
      return
    }
    setCartItems((prev) => [...prev, item])
    showToast(`Added: ${item.title}`, 'add')
  }

  const removeFromCart = (title) => {
    setCartItems((prev) => prev.filter((item) => item.title !== title))
    showToast(`Removed: ${title}`, 'remove')
  }

  const totalCost = useMemo(() => {
    const total = cartItems.reduce((sum, item) => {
      const n = Number.parseFloat(item.price.replace(/[^\d.]/g, ''))
      return Number.isNaN(n) ? sum : sum + n
    }, 0)
    return `Rs ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }, [cartItems])

  useEffect(() => {
    const nodes = document.querySelectorAll('.fade-in')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting)
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

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
          {/* ── Hero ── */}
          <section className="hero block fade-in" id="home">
            <h1>Reliable Technical Services</h1>
            <p className="hero-copy">
              Electrical, Plumbing, AC Repair, Networking, Motorwork and Consultancy Solutions. Precision engineering meets
              dependability.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" type="button" onClick={() => window.location.href = '#services'}>
                Get Service Now <span aria-hidden="true">{'->'}</span>
              </button>
              <button className="btn btn-ghost" type="button" onClick={() => window.location.href = '#book'}>
                Contact Us
              </button>
            </div>
          </section>

          <div className="wave" aria-hidden="true" />

          {/* ── Our Premium Services ── */}
          <section className="block services-card fade-in" id="services">
            <div className="section-title">
              <h2>Our Premium Services</h2>
              <span className="underline" aria-hidden="true" />
            </div>
            <section className="services">
              {services.map((service, index) => (
                <article className="service-card fade-in" style={{ '--delay': `${index * 90}ms` }} key={service.title}>
                  <img src={service.image} alt={service.title} loading="lazy" />
                  <div className="service-body">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </article>
              ))}
            </section>
          </section>

          {/* ── Featured Services ── */}
          <section className="block featured-section fade-in" id="featured-services">
            <div className="featured-header">
              <div className="section-title">
                <h2>Featured Services</h2>
                <span className="underline" aria-hidden="true" />
              </div>
              <div className="featured-controls" aria-label="featured service controls">
                <button className="scroll-btn" type="button" onClick={() => scrollTrack(featuredTrackRef, -1)} aria-label="Scroll left">
                  <span aria-hidden="true">{'<'}</span>
                </button>
                <button className="scroll-btn" type="button" onClick={() => scrollTrack(featuredTrackRef, 1)} aria-label="Scroll right">
                  <span aria-hidden="true">{'>'}</span>
                </button>
              </div>
            </div>

            <div className="featured-track" ref={featuredTrackRef}>
              {featuredServices.map((item) => {
                const inCart = cartItems.some((c) => c.title === item.title)
                return (
                  <article className="featured-card" key={item.title}>
                    <div className="shop-icon-wrap">
                      <img src={item.image} alt={item.title} loading="lazy" className="shop-icon" />
                    </div>
                    <div className="featured-body">
                      <h3>{item.title}</h3>
                      <div className="featured-meta">
                        <p>{`${item.premiumCategory} Service`}</p>
                      </div>
                      <p className="featured-price">{item.price}</p>
                      <p className="featured-description">{item.description}</p>
                      <button
                        className={`btn-add-cart${inCart ? ' btn-add-cart--added' : ''}`}
                        type="button"
                        onClick={() => addToCart(item)}
                        aria-label={inCart ? `${item.title} added to cart` : `Add ${item.title} to cart`}
                      >
                        {inCart ? '✓ Added' : '+ Add to Cart'}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          {/* ── Our Items ── */}
          <section className="block featured-section fade-in" id="our-items">
            <div className="featured-header">
              <div className="section-title">
                <h2>Our Items</h2>
                <span className="underline" aria-hidden="true" />
              </div>
              <div className="featured-controls" aria-label="item controls">
                <button className="scroll-btn" type="button" onClick={() => scrollTrack(itemsTrackRef, -1)} aria-label="Scroll left">
                  <span aria-hidden="true">{'<'}</span>
                </button>
                <button className="scroll-btn" type="button" onClick={() => scrollTrack(itemsTrackRef, 1)} aria-label="Scroll right">
                  <span aria-hidden="true">{'>'}</span>
                </button>
              </div>
            </div>

            <div className="featured-track" ref={itemsTrackRef}>
              {inventoryItems.map((item) => {
                const inCart = cartItems.some((c) => c.title === item.title)
                return (
                  <article className="featured-card" key={item.title}>
                    <div className="shop-icon-wrap">
                      <img src={item.image} alt={item.title} loading="lazy" className="shop-icon" />
                    </div>
                    <div className="featured-body">
                      <h3>{item.title}</h3>
                      <div className="featured-meta">
                        <p>{item.category}</p>
                      </div>
                      <p className="featured-price">{item.price}</p>
                      <p className="featured-description">{item.description}</p>
                      <button
                        className={`btn-add-cart${inCart ? ' btn-add-cart--added' : ''}`}
                        type="button"
                        onClick={() => addToCart(item)}
                        aria-label={inCart ? `${item.title} added to cart` : `Add ${item.title} to cart`}
                      >
                        {inCart ? '✓ Added' : '+ Add to Cart'}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          {/* ── Why Choose Us ── */}
          <section className="block why fade-in" id="why">
            <h2>Why Choose E&P Services?</h2>
            <p>We combine industrial reliability with modern technical precision to deliver unmatched service quality.</p>
            <div className="why-grid">
              {reasons.map((item, index) => (
                <article className="why-item" style={{ '--delay': `${index * 80 + 120}ms` }} key={item.title}>
                  <div className="why-icon" aria-hidden="true">
                    <ServiceIcon icon={item.icon} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <div className="stat-grid">
              {stats.map((item) => (
                <div className="stat-item" key={item.label}>
                  <p>{item.label}</p>
                  <h4>{item.value}</h4>
                </div>
              ))}
            </div>
          </section>

          {/* ── Booking Form ── */}
          <section className="block form-section fade-in" id="book">
            <h2>Book a Technical Expert</h2>
            <p>Fill out the form and we will assign our nearest technician to your location.</p>
            <ul className="contact-list">
              <li>Office: Imadole, Lalitpur</li>
              <li>+977 9801696574</li>
              <li>support@epservices.help</li>
            </ul>
            <div className="cart-panel" aria-live="polite">
              <div className="cart-panel-header">
                <h3>Selected Services & Items</h3>
                <span>{cartItems.length} item{cartItems.length === 1 ? '' : 's'}</span>
              </div>
              {cartItems.length > 0 ? (
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div className="cart-chip" key={item.title}>
                      <span>{item.title}</span>
                      <button type="button" onClick={() => removeFromCart(item.title)} aria-label={`Remove ${item.title}`}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="cart-empty">Click a service or item above to add it here.</p>
              )}
              <div className="cart-total">
                <span>Total Cost</span>
                <strong>{totalCost}</strong>
              </div>
            </div>
            <form className="booking-form">
              <label htmlFor="fullName">Full Name</label>
              <input id="fullName" type="text" placeholder="eg: LeBron James" />

              <label htmlFor="phone">Phone Number</label>
              <input id="phone" type="tel" placeholder="+977" />

              <label htmlFor="address">Address</label>
              <input id="address" type="text" placeholder="Tole, Ward No., City, District" />

              <label htmlFor="message">Further Instructions:</label>
              <textarea id="message" rows="3" placeholder="Describe your technical issue..." />

              <button className="btn btn-primary form-btn" type="submit">
                Request Service
              </button>
            </form>
          </section>
        </main>

        <footer className="site-footer fade-in">
          <a className="foot-brand" href="#home">E&P Services</a>
          <p>© 2026 E&P Services. All Rights Reserved.</p>
          <nav>
            <a href="#home">Privacy Policy</a>
            <a href="#book">Terms of Service</a>
            <a href="#book">Service Areas</a>
          </nav>
          <div className="socials" aria-label="social links">
            <a href="https://www.instagram.com/joshua.budathoki/" target="_blank" rel="noreferrer" aria-label="instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://www.facebook.com/joshua.budhathoki" target="_blank" rel="noreferrer" aria-label="facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/joshua-budhathoki" target="_blank" rel="noreferrer" aria-label="linkedin">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
              </svg>
            </a>
          </div>
        </footer>

        <button className="floating-help" type="button" aria-label="Get help">?</button>
      </div>
    </div>
  )
}

function ServiceIcon({ icon }) {
  if (icon === 'zap') {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label="zap icon">
        <path d="M13 2 5 14h5l-1 8 8-12h-5z" />
      </svg>
    )
  }
  if (icon === 'droplet') {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label="water icon">
        <path d="M12 2c3.5 4.3 6 7.3 6 11a6 6 0 1 1-12 0c0-3.7 2.5-6.7 6-11z" />
      </svg>
    )
  }
  if (icon === 'snow') {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label="snow icon">
        <path d="M11 2h2v20h-2zM2 11h20v2H2zM5.6 4.2l1.4-1.4 11.4 11.4-1.4 1.4zM17 2.8l1.4 1.4L7 15.6l-1.4-1.4z" />
      </svg>
    )
  }
  if (icon === 'network') {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label="network icon">
        <path d="M12 3 4 7v5c0 4.4 3.4 8.6 8 9 4.6-.4 8-4.6 8-9V7zm0 2.2L18 8v4c0 3.3-2.5 6.6-6 7-3.5-.4-6-3.7-6-7V8z" />
      </svg>
    )
  }
  if (icon === 'grid') {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label="grid icon">
        <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" />
      </svg>
    )
  }
  if (icon === 'shield') {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label="shield icon">
        <path d="M12 2 4 6v5c0 5 3.4 9.8 8 11 4.6-1.2 8-6 8-11V6z" />
      </svg>
    )
  }
  if (icon === 'tool') {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label="tool icon">
        <path d="m21 7-4-4-2.5 2.5L17.5 8l-7 7L8 12.5l-5 5V21h3.5l5-5L16 20.5 21 15l-2.5-2.5 2.5-2.5z" />
      </svg>
    )
  }
  if (icon === 'clock') {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label="clock icon">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 11h-6V11h4V6h2z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="help icon">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 17h-1.5v-1.5H12zm1.7-6.3-.7.5v1.1h-2v-2.1l1.5-1.1a1.6 1.6 0 1 0-2.6-1.3H8a3.6 3.6 0 1 1 5.7 2.9z" />
    </svg>
  )
}

export default App