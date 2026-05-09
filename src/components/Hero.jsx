import logo from '../assets/logo.png'
export function Hero() {
  return (
    <section className="hero block fade-in" id="home">
      <div className="hero-copy-column">
        <span className="hero-eyebrow">E&P Services</span>
        <h1>Your Trusted Service Partner</h1>
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
      </div>
      <div className="hero-visual-column" aria-label="Service highlights">
        <div className="hero-logo-shell">
          <img src={logo} alt="Reliable Technical Services" className="hero-logo" />
        </div>
        <div className="hero-stats">
          <article className="hero-stat">
            <strong>500+</strong>
            <span>Projects Completed</span>
          </article>
          <article className="hero-stat">
            <strong>12+</strong>
            <span>Years in Business</span>
          </article>
          <article className="hero-stat">
            <strong>24/7</strong>
            <span>Support Available</span>
          </article>
        </div>
      </div>
    </section>
  )
}
