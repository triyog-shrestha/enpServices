const BUSINESS_NAME = 'E&P Services'
const PRODUCTION_ORIGIN = 'https://electricalandplumbingservice.com.np/'
const BASE_PATH = '/enpServices/'
const PRODUCTION_URL = `${PRODUCTION_ORIGIN}${BASE_PATH}`

function getCanonicalUrl(path) {
  const relativePath = path.startsWith('/') ? path.substring(1) : path
  return new URL(relativePath, PRODUCTION_URL).toString()
}

function upsertMeta(name, content, isProperty = false) {
  const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
  let tag = document.head.querySelector(selector)

  if (!tag) {
    tag = document.createElement('meta')
    if (isProperty) {
      tag.setAttribute('property', name)
    } else {
      tag.setAttribute('name', name)
    }
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`)

  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }

  tag.setAttribute('href', href)
}

function upsertStructuredData(data) {
  const scriptId = 'site-structured-data'
  let script = document.getElementById(scriptId)

  if (!script) {
    script = document.createElement('script')
    script.id = scriptId
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }

  script.textContent = JSON.stringify(data)
}

export function applySeo(page) {
  const pageConfigs = {
    home: {
      title: `${BUSINESS_NAME} | Electrician, Plumber & AMC Services in Lalitpur & Kathmandu`,
      description:
        'Book trusted electrician and plumber services, plus annual maintenance contract (AMC) support for homes, offices, and industrial properties in Lalitpur, Kathmandu, Nepal.',
      path: '/',
      keywords:
        'electrician near me, plumber near me, electrician Lalitpur, plumber Lalitpur, electrician Kathmandu, plumber Kathmandu, AMC services, annual maintenance contract Nepal, electrical repair, plumbing repair',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: BUSINESS_NAME,
        url: PRODUCTION_URL,
        logo: `${PRODUCTION_URL}assets/logo.jpg`,
        image: `${PRODUCTION_URL}assets/logo.jpg`,
        description:
          'Professional electrician, plumber, and AMC services for residential and commercial properties in Kathmandu, Lalitpur, and Bhaktapur.',
        telephone: '+977-9841082723',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Mahalaxmi-4',
          addressLocality: 'Lalitpur',
          addressRegion: 'Bagmati',
          postalCode: '44600',
          addressCountry: 'NP',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '27.6588',
          longitude: '85.3468',
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '00:00',
          closes: '23:59',
        },
        sameAs: [
          'https://www.facebook.com/profile.php?id=61587384980299',
          'https://www.instagram.com/electrical_plumbing.services/',
          'https://wa.me/9779841082723',
        ],
        areaServed: [
          {
            '@type': 'AdministrativeArea',
            name: 'Lalitpur',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Kathmandu',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Bhaktapur',
          },
        ],
        priceRange: '$$',
      },
    },
    products: {
      title: `Electrical & Plumbing Products | ${BUSINESS_NAME}`,
      description:
        'Browse and order professional electrical and plumbing products, parts, and fixtures for your service planning and installations.',
      path: '/products',
      keywords:
        'electrical products Nepal, plumbing products Lalitpur, electrician supplies, plumbing supplies, switches, sockets, pipes, valves, service materials',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Electrical and Plumbing Products | E&P Services',
        url: `${PRODUCTION_URL}products`,
        description: 'Browse our catalog of high-quality electrical and plumbing products and service materials.',
      },
    },
    amc: {
      title: `AMC Services for Electrical & Plumbing | ${BUSINESS_NAME}`,
      description:
        'Choose Annual Maintenance Contract (AMC) plans for preventive electrical and plumbing maintenance with fast emergency support and routine inspections.',
      path: '/amc-plans',
      keywords:
        'electrical AMC Nepal, plumbing AMC Lalitpur, commercial AMC, residential AMC, preventive maintenance contract, building safety inspection',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Annual Maintenance Contract (AMC) Services',
        url: `${PRODUCTION_URL}amc-plans`,
        provider: {
          '@type': 'LocalBusiness',
          name: BUSINESS_NAME,
          telephone: '+977-9841082723',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Mahalaxmi-4',
            addressLocality: 'Lalitpur',
            addressCountry: 'NP',
          },
        },
        serviceType: 'Electrical and Plumbing AMC Services',
        areaServed: ['Lalitpur', 'Kathmandu', 'Bhaktapur'],
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'NPR',
          lowPrice: '3000',
          highPrice: '10000',
          offerCount: '4',
        },
      },
    },
  }

  const config = pageConfigs[page] || pageConfigs.home
  const canonicalUrl = getCanonicalUrl(config.path)

  document.title = config.title
  upsertMeta('description', config.description)
  upsertMeta('keywords', config.keywords)
  upsertMeta('robots', 'index, follow, max-image-preview:large')
  upsertMeta('og:type', 'website', true)
  upsertMeta('og:title', config.title, true)
  upsertMeta('og:description', config.description, true)
  upsertMeta('og:url', canonicalUrl, true)
  upsertMeta('twitter:card', 'summary_large_image')
  upsertMeta('twitter:title', config.title)
  upsertMeta('twitter:description', config.description)
  upsertLink('canonical', canonicalUrl)
  upsertStructuredData(config.structuredData)
}
