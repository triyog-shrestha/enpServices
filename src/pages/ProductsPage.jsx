import '../styles/site.css'
import './products-page.css'
import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import QuantityModal from '../components/QuantityModal.jsx'
import { Footer } from '../components/Footer.jsx'
import { getCategoryLabels, getAllProducts } from '../utils/products.js'
import { useCartState } from '../hooks/useCartState.js'

function ProductsPage() {
  const { cartItems, addToCart, addToCartWithQuantity, removeFromCart, calculateTotalCost, toasts } = useCartState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalItem, setModalItem] = useState(null)

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
    closeQuantityModal()
  }

  const categories = useMemo(() => getCategoryLabels(), [])
  const sampleProducts = useMemo(() => getAllProducts(), [])
  const [draftQuery, setDraftQuery] = useState('')
  const [sortKey, setSortKey] = useState('default')

  const visibleProducts = useMemo(() => {
    let nextProducts = sampleProducts.filter((product) =>
      product.title.toLowerCase().includes(draftQuery.trim().toLowerCase()),
    )

    if (sortKey.startsWith('category:')) {
      const selectedCategory = sortKey.replace('category:', '')
      nextProducts = nextProducts.filter((product) => product.category === selectedCategory)
    }

    return nextProducts
  }, [draftQuery, sampleProducts, sortKey])

  return (
    <div className="remake-wrap products-page">
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
          <section className="block products-hero">
            <div className="products-hero-copy">
              <span className="products-kicker">Product Catalog</span>
              <h1>Find the right product faster</h1>
              <p className="hero-copy">
                Browse products by name or category. Search quickly, filter by category, and keep track of what
                is already in your cart.
              </p>

              <div className="products-toolbar">
                <label className="products-search" htmlFor="productSearch">
                  <input
                    id="productSearch"
                    type="search"
                    placeholder="Search by name"
                    value={draftQuery}
                    onChange={(event) => setDraftQuery(event.target.value)}
                  />
                </label>

                <label className="products-sort" htmlFor="productSort">
                  <span>Filter by category</span>
                  <select id="productSort" value={sortKey} onChange={(event) => setSortKey(event.target.value)}>
                    <option value="default">All products</option>

                    {categories.map((category) => (
                      <option key={category.key} value={`category:${category.label}`}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="products-meta">
                <span>
                  {visibleProducts.length} total products{visibleProducts.length === 1 ? '' : 's'}
                </span>
              
              </div>

              <button className="btn btn-ghost products-back-btn" type="button" onClick={() => { window.location.href = '/' }}>
                Go Back
              </button>
            </div>

            <div className="products-hero-visual" aria-label="Catalog highlights">
              <div className="products-hero-panel">
                <div className="products-hero-ring" aria-hidden="true" />
                <div className="products-hero-stats">
                  <article className="products-hero-stat">
                    <strong>{sampleProducts.length}</strong>
                    <span> Products</span>
                  </article>
                  <article className="products-hero-stat">
                    <strong>{categories.length}</strong>
                    <span>Categories</span>
                  </article>
                  <article className="products-hero-stat">
                    <strong>Fast</strong>
                    <span>Search & Filter</span>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section className="block featured-section products-section">
            <div className="section-title">
              <h2>All Products</h2>
              <span className="underline" aria-hidden="true" />
            </div>

            <div className="products-grid">
              {visibleProducts.map((item) => (
                <article className="featured-card products-card" key={item.title}>
                  <div className="shop-icon-wrap">
                    <img src={item.image} alt={item.title} loading="lazy" className="shop-icon" />
                  </div>
                  <div className="featured-body">
                    <h3>{item.title}</h3>
                    <p className="featured-price">{item.price}</p>
                    <p className="featured-description">{item.description || 'Sample product entry from the catalog.'}</p>
                    <button
                      className={`btn-add-cart${cartItems.some((c) => c.title === item.title) ? ' btn-add-cart--added' : ''}`}
                      type="button"
                      onClick={() => openQuantityModal(item)}
                      aria-label={cartItems.some((c) => c.title === item.title) ? `${item.title} added to cart` : `Add ${item.title} to cart`}
                    >
                      {cartItems.some((c) => c.title === item.title) ? '✓ Added' : '+ Add to Cart'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <QuantityModal isOpen={isModalOpen} item={modalItem} onClose={closeQuantityModal} onConfirm={handleAddWithQuantity} />
        </main>

        <div style={{ padding: '18px' }}>
          <div className="cart-panel" aria-live="polite">
            <div className="cart-panel-header">
              <h3>Selected Items</h3>
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
              <p className="cart-empty">Click an item above to add it here.</p>
            )}
            <div className="cart-total">
              <span>Total Cost</span>
              <strong>{calculateTotalCost()}</strong>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default ProductsPage
