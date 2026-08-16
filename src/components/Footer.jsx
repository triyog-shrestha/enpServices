import {
  HelpCircle,
  Home,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  ShoppingCart,
  User,
  Wrench,
} from 'lucide-react'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import logo from '../assets/logo.jpg'


const BASE = import.meta.env.BASE_URL

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    heading: 'Find us',
    lines: ['Mahalaxmi-4, Lalitpur, Nepal'],
  },
  {
    icon: Phone,
    heading: 'Call us',
    lines: ['+977 9841082723', '+977 9843737021'],
  },
  {
    icon: Mail,
    heading: 'Mail us',
    lines: ['support@epservices.help'],
  },
]

const NAV_LINKS = [
  { icon: Home, label: 'Home', href: `${BASE}#home` },
  { icon: Wrench, label: 'Services', href: `${BASE}#featured-services` },
  { icon: ShoppingBag, label: 'Products', href: `${BASE}#our-items` },
  { icon: User, label: 'About Us', href: `${BASE}#director` },
  { icon: HelpCircle, label: 'Why Us', href: `${BASE}#why` },
  { icon: ShoppingCart, label: 'Cart', href: `${BASE}#book` },
]

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61587384980299', icon: FaFacebook },
  { label: 'WhatsApp', href: 'https://wa.me/9779841082723', icon: FaWhatsapp },
  { label: 'Instagram', href: 'https://www.instagram.com/electrical_plumbing.services/', icon: FaInstagram },
]

export function Footer() {
  return (
    <footer className="site-footer fade-in">
      <div className="footer-top">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={logo} alt="E&P Services" className="brand-logo" />
            <h3>E&amp;P SERVICES</h3>
            <p>Reliable electrical and plumbing expertise for homes, businesses, and maintenance projects.</p>
          </div>

          <div className="footer-col">
            <h3>Quick Links</h3>
            <nav className="footer-links" aria-label="Footer navigation">
              {NAV_LINKS.map(({ label, href }) => (
                <a key={label} href={href}>{label}</a>
              ))}
            </nav>
          </div>

          <div className="footer-col">
            <h3>Services</h3>
            <ul className="footer-list">
              <li>Electrical Repairs</li>
              <li>Plumbing Services</li>
              <li>Annual Maintenance</li>
              <li>Preventive Care</li>
              <li>Emergency Support</li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Contact Details</h3>
            <div className="footer-contact-list">
              {CONTACT_ITEMS.map(({ icon: Icon, heading, lines }) => (
                <div key={heading} className="footer-contact-item">
                  <Icon className="footer-contact-icon" size={16} aria-hidden="true" />
                  <div>
                    <span>{heading}</span>
                    {lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="footer-bottom-inner">
          <div className="footer-social-block" aria-label="Social media links">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>

          <p>© 2026 E&amp;P Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
