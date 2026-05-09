import { useRef } from 'react'
import { featuredServices } from '../data/services.js'

export function FeaturedServices({ cartItems, addToCart }) {
  const featuredTrackRef = useRef(null)

  const scrollTrack = (direction) => {
    if (!featuredTrackRef.current) return
    featuredTrackRef.current.scrollBy({ left: direction * 320, behavior: 'smooth' })
  }

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
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
