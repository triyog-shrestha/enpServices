import { useEffect, useState } from 'react'
import logo from '../assets/logo.jpg'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const isProductsPage = window.location.pathname.includes('products')
  
  const links = isProductsPage
    ? [{ label: 'Go Back', href: `${import.meta.env.BASE_URL}` }]
    : [
        { label: 'Home', href: `${import.meta.env.BASE_URL}#home` },
        { label: 'About', href: `${import.meta.env.BASE_URL}#services` },
        { label: 'Services', href: `${import.meta.env.BASE_URL}#featured-services` },
        { label: 'Products', href: `${import.meta.env.BASE_URL}#our-items` },
        { label: 'Why Us', href: '#why' },
        { label: 'Cart', href: '#book' },
      ]

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 760) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isMenuOpen])

  return (
    <header className={`site-navbar${isScrolled ? ' is-scrolled' : ''}${isMenuOpen ? ' menu-open' : ''}`}>
      <a
        className="brand"
        href="#"
        aria-label="E&P Services home"
        onClick={(e) => {
          e.preventDefault()
          setIsMenuOpen(false)
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }}
      >
        <img src={logo} alt="E&P Services" className="brand-logo" />
        <span className="brand-text">E&P SERVICES</span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        aria-label="Toggle navigation"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav-links${isMenuOpen ? ' is-open' : ''}`} id="primary-navigation" aria-label="primary">
        {links.map((link) => (
          <a key={link.label} href={link.href} onClick={() => setIsMenuOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>


      {isMenuOpen ? <button className="nav-backdrop" type="button" aria-label="Close menu" onClick={() => setIsMenuOpen(false)} /> : null}
    </header>
  )
}

export default Navbar
