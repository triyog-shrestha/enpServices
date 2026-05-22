import wiringImg from '../assets/featured_services/wiring.jpg'
import weldingImg from '../assets/featured_services/wielding.jpg'
import amcImg from '../assets/featured_services/amc.jpg'
import cnImg from '../assets/featured_services/cn.jpg'
import plumbingImg from '../assets/featured_services/plumbing.jpg'
import cctvImg from '../assets/featured_services/cctv.jpg'
import colorImg from '../assets/featured_services/color.jpg'


export const reasons = [
  { icon: 'shield', title: 'Fast Response', text: 'Dedicated 24x7 response for technical incidents.' },
  { icon: 'tool', title: 'Skilled Pros', text: 'Certified experts in electrical and plumbing systems.' },
  { icon: 'clock', title: 'Real-Time ETA', text: 'Transparent tracking from dispatch to arrival.' },
  { icon: 'help', title: '24/7 Support', text: 'Always available for urgent technical consultations.' },
]

export const stats = [
  { label: 'TASKS RESOLVED', value: '2500+' },
  { label: 'SKILLED PROS', value: '120+' },
  { label: 'FREE FROM ERRORS', value: '95%' },
  { label: '24/7 SUPPORT', value: 'Always Available' },
]

export const featuredServices = [
  {
    title: 'Building & House Wiring',
    premiumCategory: 'Electrical',
    price: 'Rs 2,500.00',
    description: 'Professional electrical wiring installation and maintenance for residential and commercial buildings with safety compliance.',
    image: wiringImg,
  },
  {
    title: 'Plumbing Services',
    premiumCategory: 'Plumbing',
    price: 'Rs 1,200.00',
    description: 'Complete plumbing solutions including leak repairs, fixture installation, and pipe maintenance.',
    image: plumbingImg,
  },
  {
    title: 'Annual Maintenance Service (AMC)',
    premiumCategory: 'Maintenance',
    price: 'Rs 5,000.00',
    description: 'Comprehensive annual maintenance contracts covering all electrical and plumbing systems with priority support.',
    image: amcImg,
  },
  {
    title: 'CCTV Installation & Maintenance',
    premiumCategory: 'Security',
    price: 'Rs 8,000.00',
    description: 'Professional CCTV system installation, maintenance, and monitoring setup for enhanced security.',
    image: cctvImg,
  },
  {
    title: 'Computer and Networking',
    premiumCategory: 'Networking',
    price: 'Rs 3,000.00',
    description: 'Network setup, computer troubleshooting, and IT infrastructure solutions for homes and offices.',
    image: cnImg,
  },
  {
    title: 'Welding Services',
    premiumCategory: 'Welding',
    price: 'Rs 1,500.00',
    description: 'Expert welding services for metal fabrication, repairs, and structural reinforcement with quality assurance.',
    image: weldingImg,
  },
  {
    title: 'Coloring Services',
    premiumCategory: 'Coloring',
    price: 'Rs 2,000.00',
    description: 'Interior and exterior wall coloring with smooth finishing, durable coatings, and clean on-time execution.',
    image: colorImg,
  },
]
