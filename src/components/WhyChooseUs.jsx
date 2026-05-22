import { reasons, stats } from '../data/services.js'
import { ServiceIcon } from './ServiceIcon.jsx'

export function WhyChooseUs() {
  return (
    <section className="block why fade-in" id="why">
      <h2>Why Choose E&P Services?</h2>
      <p>We combine industrial reliability with modern technical precision to deliver unmatched service quality.</p>
      
      <div className="why-grid">
        {reasons.map((item, index) => (
          <article className="why-item" style={{ '--delay': `${index * 80 + 120}ms` }} key={item.title}>
            <div className="why-icon" aria-hidden="true">
              <ServiceIcon icon={item.icon} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <div className="stat-grid">
        {stats.map((item) => (
          <div className="stat-item" key={item.label}>
            <p>{item.label}</p>
            <h4>{item.value}</h4>
          </div>
        ))}
      </div>
    </section>
  )
}
