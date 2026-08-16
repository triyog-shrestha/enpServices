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
  const [draftQuery, setDraftQuery] = useState('')
  const [sortKey, setSortKey] = useState('default')

  const categories = useMemo(() => getCategoryLabels(), [])
  const allProducts = useMemo(() => getAllProducts(), [])

  const visibleProducts = useMemo(() => {
    let list = allProducts.filter((p) =>
      p.title.toLowerCase().includes(draftQuery.trim().toLowerCase()),
    )
    if (sortKey.startsWith('category:')) {
      const selected = sortKey.replace('category:', '')
      list = list.filter((p) => p.category === selected)
    }
    return list
  }, [draftQuery, allProducts, sortKey])

  const openQuantityModal = (item) => { setModalItem(item); setIsModalOpen(true) }
  const closeQuantityModal = () => { setIsModalOpen(false); setModalItem(null) }
  const handleAddWithQuantity = (quantity) => {
    if (typeof addToCartWithQuantity === 'function') addToCartWithQuantity(modalItem, quantity)
    else addToCart(modalItem, quantity)
    closeQuantityModal()
  }

  return (
    <div className="remake-wrap products-page">

      {/* ── Toasts ── */}
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
          {/* ── Compact page header ── */}
          <section className="block products-page-header">
            <div className="products-page-title-row">
              <div>
                <h1 className="products-page-title">All Products</h1>
                <p className="products-page-subtitle">
                  {allProducts.length} products across {categories.length} categories
                </p>
              </div>
              <button
                className="btn btn-ghost products-back-btn"
                type="button"
                onClick={() => { window.location.href = '/' }}
              >
                ← Go Back
              </button>
            </div>

            {/* ── Inline filter toolbar ── */}
            <div className="products-toolbar">
              <input
                id="productSearch"
                type="search"
                className="products-search-input"
                placeholder="Search by name…"
                value={draftQuery}
                onChange={(e) => setDraftQuery(e.target.value)}
                aria-label="Search products by name"
              />

              <select
                id="productSort"
                className="products-sort-select"
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                aria-label="Filter by category"
              >
                <option value="default">All categories</option>
                {categories.map((cat) => (
                  <option key={cat.key} value={`category:${cat.label}`}>{cat.label}</option>
                ))}
              </select>

              <span className="products-count" aria-live="polite">
                {visibleProducts.length} result{visibleProducts.length !== 1 ? 's' : ''}
              </span>
            </div>
          </section>

          {/* ── Product grid ── */}
          <section className="block products-section">
            <div className="products-grid">
              {visibleProducts.map((item) => {
                const inCart = cartItems.some((c) => c.title === item.title)
                return (
                  <article className="product-card" key={item.title}>
                    <div className="product-card__image-wrap">
                      {item.image
                        ? <img src={item.image} alt={item.title} loading="lazy" className="product-card__image" />
                        : <div className="product-card__image-placeholder" aria-hidden="true" />
                      }
                    </div>
                    <div className="product-card__body">
                      <span className="product-card__category">{item.category}</span>
                      <h3 className="product-card__title">{item.title}</h3>
                      <p className="product-card__price">{item.price}</p>
                      <button
                        className={`product-card__btn${inCart ? ' product-card__btn--added' : ''}`}
                        type="button"
                        onClick={() => openQuantityModal(item)}
                        aria-label={inCart ? `${item.title} added to cart` : `Add ${item.title} to cart`}
                      >
                        {inCart ? '✓ Added' : '+ Add to Cart'}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>

            {visibleProducts.length === 0 && (
              <p className="products-empty">No products match your search.</p>
            )}
          </section>

          <QuantityModal
            isOpen={isModalOpen}
            item={modalItem}
            onClose={closeQuantityModal}
            onConfirm={handleAddWithQuantity}
          />
        </main>

        {/* ── Cart summary ── */}
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
                    <span>{item.title} ×{Number.isInteger(item.quantity) && item.quantity > 0 ? item.quantity : 1}</span>
                    <button type="button" onClick={() => removeFromCart(item.title)} aria-label={`Remove ${item.title}`}>×</button>
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
