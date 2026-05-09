export function ContactForm({ cartItems, removeFromCart, clearCart, totalCost }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    clearCart()
  }

  return (
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
                <span>{item.title} x{Number.isInteger(item.quantity) && item.quantity > 0 ? item.quantity : 1}</span>
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
      <form className="booking-form" onSubmit={handleSubmit}>
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
  )
}
