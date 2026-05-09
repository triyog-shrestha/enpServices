import productsData from '../assets/products.json'

function buildImageUrl(imageName) {
  return imageName ? new URL(`../assets/product_images/${imageName}`, import.meta.url).href : undefined
}

function formatPrice(value) {
  return `Rs ${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function mapProduct(product) {
  return {
    title: product.product_code,
    category: product.category_label || product.category,
    price: formatPrice(product.mrp),
    description: product.details?.variant || product.category_label || '',
    image: buildImageUrl(product.image),
  }
}

export function getSampleProducts(limit = 10) {
  return (productsData.products || []).filter((product) => product.image).slice(0, limit).map(mapProduct)
}

export function getProductsByCategoryKeys(categoryKeys, perCategory = 1) {
  return categoryKeys
    .flatMap((categoryKey) => {
      const matches = (productsData.products || []).filter((product) => product.category === categoryKey && product.image)
      return matches.slice(0, perCategory).map(mapProduct)
    })
}

export function getAllProducts() {
  return (productsData.products || []).filter((product) => product.image).map(mapProduct)
}

export function getCategoryLabels() {
  return Object.entries(productsData.categories || {}).map(([key, label]) => ({ key, label }))
}
