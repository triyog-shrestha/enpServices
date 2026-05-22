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
        <div className="footer-contact-grid">
          {CONTACT_ITEMS.map(({ icon: Icon, heading, lines }) => (
            <div key={heading} className="footer-contact-item">
              <Icon className="footer-contact-icon" size={20} aria-hidden="true" />
              <div>
                <h3>{heading}</h3>
                {lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <span className="footer-divider" aria-hidden="true" />

        <div className="footer-bottom-grid">

          <div className="footer-links-block">
            <h3>Useful Links</h3>
            <nav className="footer-links" aria-label="Footer navigation">
              {NAV_LINKS.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href}>
                  <Icon size={14} aria-hidden="true" />
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div className="footer-social-block">
            <h3>Follow us</h3>
            <div className="socials footer-socials" aria-label="Social media links">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
