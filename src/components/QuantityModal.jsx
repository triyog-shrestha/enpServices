import { useEffect, useRef, useState } from 'react'

export default function QuantityModal({ isOpen, item, onClose, onConfirm }) {
  const [quantity, setQuantity] = useState(1)
  const overlayRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setQuantity(1)
      // focus the input when opened
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen, item])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const stop = (e) => e.stopPropagation()

  const handleConfirm = () => {
    const qty = Number.parseInt(quantity, 10)
    if (!Number.isInteger(qty) || qty <= 0) return
    onConfirm(qty)
    onClose()
  }

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={onClose}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-card" onClick={stop}>
        <h3 className="modal-title">{item?.title}</h3>
        <div className="modal-body">
          <label className="modal-label">Quantity</label>
          <input
            ref={inputRef}
            className="modal-input"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleConfirm}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
