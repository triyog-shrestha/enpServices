import heroPlaceholder from '../assets/hero.png'
import wiringImg from '../assets/featured_services/wiring.jpg'
import weldingImg from '../assets/featured_services/wielding.jpg'
import amcImg from '../assets/featured_services/amc.jpg'
import cnImg from '../assets/featured_services/cn.jpg'
import plumbingImg from '../assets/featured_services/plumbing.jpg'
import cctvImg from '../assets/featured_services/cctv.jpg'

export const services = [
  {
    title: 'Electrical',
    description:
      'Safe wiring, fault diagnosis, and reliable electrical maintenance for residential and commercial spaces. We handle upgrades, distribution checks, and preventive inspections to keep your systems stable, efficient, and compliant over time.',
    image: heroPlaceholder,
  },
  {
    title: 'Plumbing',
    description:
      'Leak fixing, fixture installation, and complete plumbing maintenance with quick turnaround times. From pressure balancing to pipeline checks, we provide long-term plumbing reliability for kitchens, bathrooms, and utility areas.',
    image: heroPlaceholder,
  },
  {
    title: 'AC',
    description:
      'Cooling system service, deep cleaning, and seasonal performance tuning for efficient operation. Our technicians optimize airflow, improve cooling consistency, and reduce energy usage through structured maintenance routines.',
    image: heroPlaceholder,
  },
  {
    title: 'Networking',
    description:
      'Structured network setup, router troubleshooting, and stable connectivity for homes and offices. We design dependable local networks with better coverage, clean cabling, and responsive support for ongoing performance.',
    image: heroPlaceholder,
  },
  {
    title: 'Appliance & Electronics Repair',
    description:
      'Repair and diagnostics for everyday appliances and electronics by experienced technicians. We isolate faults quickly, replace critical components, and restore dependable operation with quality-tested repair workflows.',
    image: heroPlaceholder,
  },
  {
    title: 'Motor service',
    description:
      'Inspection, repair, and preventive servicing for motors, pumps, and related systems. Our service includes vibration checks, load testing, and maintenance plans that extend equipment life and reduce downtime.',
    image: heroPlaceholder,
  },
]

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
    title: 'Welding Services',
    premiumCategory: 'Welding',
    price: 'Rs 1,500.00',
    description: 'Expert welding services for metal fabrication, repairs, and structural reinforcement with quality assurance.',
    image: weldingImg,
  },
  {
    title: 'Annual Maintenance Service (AMC)',
    premiumCategory: 'Maintenance',
    price: 'Rs 5,000.00',
    description: 'Comprehensive annual maintenance contracts covering all electrical and plumbing systems with priority support.',
    image: amcImg,
  },
  {
    title: 'Computer and Networking',
    premiumCategory: 'Networking',
    price: 'Rs 3,000.00',
    description: 'Network setup, computer troubleshooting, and IT infrastructure solutions for homes and offices.',
    image: cnImg,
  },
  {
    title: 'Plumbing Services',
    premiumCategory: 'Plumbing',
    price: 'Rs 1,200.00',
    description: 'Complete plumbing solutions including leak repairs, fixture installation, and pipe maintenance.',
    image: plumbingImg,
  },
  {
    title: 'CCTV Installation & Maintenance',
    premiumCategory: 'Security',
    price: 'Rs 8,000.00',
    description: 'Professional CCTV system installation, maintenance, and monitoring setup for enhanced security.',
    image: cctvImg,
  },
]

export const inventoryItems = [
  {
    title: '9W Smart LED Bulb',
    category: 'Lighting',
    price: 'Rs 450.00',
    description: 'Long-lasting energy efficient LED bulb with 2-year replacement warranty.',
    image: heroPlaceholder,
  },
  {
    title: '20W T5 LED Tubelight',
    category: 'Lighting',
    price: 'Rs 750.00',
    description: 'High-lumen slim tubelight for kitchen cabinets and office desks.',
    image: heroPlaceholder,
  },
  {
    title: 'Modular Switch Plate',
    category: 'Electrical',
    price: 'Rs 1,200.00',
    description: 'Shock-proof flame retardant 6-module switch plate with matte finish.',
    image: heroPlaceholder,
  },
  {
    title: 'Copper Wiring (90m Roll)',
    category: 'Cabling',
    price: 'Rs 3,500.00',
    description: 'Pure copper insulated wire for heavy-duty household load distribution.',
    image: heroPlaceholder,
  },
  {
    title: 'Digital Multimeter',
    category: 'Tools',
    price: 'Rs 2,800.00',
    description: 'Precision diagnostic tool for measuring voltage, current, and resistance.',
    image: heroPlaceholder,
  },
]
