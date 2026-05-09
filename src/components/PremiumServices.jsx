import { services } from '../data/services.js'

export function PremiumServices() {
  return (
    <section className="block services-card fade-in" id="services">
      <div className="section-title">
        <h2>Our Premium Services</h2>
        <span className="underline" aria-hidden="true" />
      </div>
      <section className="services">
        {services.map((service, index) => (
          <article className="service-card fade-in" style={{ '--delay': `${index * 90}ms` }} key={service.title}>
            <img src={service.image} alt={service.title} loading="lazy" />
            <div className="service-body">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </article>
        ))}
      </section>
    </section>
  )
}
