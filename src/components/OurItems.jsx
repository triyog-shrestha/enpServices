import { useRef } from 'react'
import { getSampleProducts } from '../utils/products.js'

export function OurItems({ cartItems, addToCart, onRequestAdd }) {
  const itemsTrackRef = useRef(null)
  const scrollTrack = (direction) => {
    if (!itemsTrackRef.current) return
    itemsTrackRef.current.scrollBy({ left: direction * 320, behavior: 'smooth' })
  }

  const products = getSampleProducts(10)

  return (
    <section className="block featured-section fade-in" id="our-items">
      <div className="featured-header">
        <div className="section-title">
          <h2>Our Products</h2>
          <span className="underline" aria-hidden="true" />
        </div>
        <div className="featured-controls our-items-controls" aria-label="item controls">
          <button className="scroll-btn" type="button" onClick={() => scrollTrack(-1)} aria-label="Scroll left">
            <span aria-hidden="true">{'<'}</span>
          </button>
          <button className="scroll-btn" type="button" onClick={() => scrollTrack(1)} aria-label="Scroll right">
            <span aria-hidden="true">{'>'}</span>
          </button>
          <button
            className="see-more-btn"
            type="button"
            onClick={() => {
              window.location.href = `${import.meta.env.BASE_URL}products`
            }}
          >
            See All
          </button>
        </div>
      </div>

      <p className="section-guide">Add products to your cart. Click an item to set quantity in the modal, then proceed to the booking form to submit your request; product prices are shown per item.</p>

      <div className="featured-track" ref={itemsTrackRef}>
        {products.map((item) => {
          const inCart = cartItems.some((c) => c.title === item.title)
          return (
            <article className="featured-card" key={item.title}>
              <div className="shop-icon-wrap">
                <img src={item.image} alt={item.title} loading="lazy" className="shop-icon" />
              </div>
              <div className="featured-body">
                <h3>{item.title}</h3>
                <p className="featured-price">{item.price}</p>
                <p className="featured-description">{item.description}</p>
                <button
                  className={`btn-add-cart${inCart ? ' btn-add-cart--added' : ''}`}
                  type="button"
                  onClick={() => (onRequestAdd ? onRequestAdd(item) : addToCart(item))}
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
  )
}
