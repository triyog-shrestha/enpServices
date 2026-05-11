import { useState } from 'react'

export function ContactForm({ cartItems, removeFromCart, clearCart, totalCost }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatusMessage('')

    try {
      const form = event.target
      const formData = new FormData(form)

      // include only the requested cart fields in submission
      const cartPayload = (cartItems || []).map((item) => ({
        product_code: item.title,
        category_label: item.category,
        quantity: Number.isInteger(item.quantity) && item.quantity > 0 ? item.quantity : 1
      }))
      formData.set('cart', JSON.stringify(cartPayload))
      formData.delete('totalCost')

      // ensure a single, trimmed Web3Forms access key is present
      const rawKey = formData.get('access_key') || 'fe9891ae-f153-4c4c-84cd-ffe22db0306c'
      const accessKey = String(rawKey).trim()
      formData.set('access_key', accessKey)

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (data.success) {
        setStatusMessage('Success! Your request has been submitted.')
        form.reset()
        clearCart()
      } else {
        setStatusMessage(data.message || 'There was an error submitting the form.')
      }
    } catch {
      setStatusMessage('Network error. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="block form-section fade-in" id="book">
      <h2>Book a Technical Expert</h2>
      <p>Fill out the form and we will assign our nearest technician to your location.</p>
      <ul className="contact-list">
        <li>Mahalaxmi-4, Lalitpur</li>
        <li>+977 9841082723</li>
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
        <input type="hidden" name="access_key" value="fe9891ae-f153-4c4c-84cd-ffe22db0306c" />

        <label htmlFor="fullName">Full Name</label>
        <input id="fullName" name="name" type="text" placeholder="eg: LeBron James" required />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="name@example.com" required />

        <label htmlFor="phone">Phone Number</label>
        <input id="phone" name="phone" type="tel" placeholder="+977" />

        <label htmlFor="address">Address</label>
        <input id="address" name="address" type="text" placeholder="Tole, Ward No., City, District" />

        <label htmlFor="message">Further Instructions:</label>
        <textarea id="message" name="message" rows="3" placeholder="Describe your technical issue..." />

        <button className="btn btn-primary form-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Request Service'}
        </button>

        {statusMessage && <p className="form-status" aria-live="polite">{statusMessage}</p>}
      </form>
    </section>
  )
}
