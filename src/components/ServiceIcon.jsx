export function ServiceIcon({ icon }) {
  if (icon === 'zap') {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label="zap icon">
        <path d="M13 2 5 14h5l-1 8 8-12h-5z" />
      </svg>
    )
  }
  if (icon === 'droplet') {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label="water icon">
        <path d="M12 2c3.5 4.3 6 7.3 6 11a6 6 0 1 1-12 0c0-3.7 2.5-6.7 6-11z" />
      </svg>
    )
  }
  if (icon === 'snow') {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label="snow icon">
        <path d="M11 2h2v20h-2zM2 11h20v2H2zM5.6 4.2l1.4-1.4 11.4 11.4-1.4 1.4zM17 2.8l1.4 1.4L7 15.6l-1.4-1.4z" />
      </svg>
    )
  }
  if (icon === 'network') {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label="network icon">
        <path d="M12 3 4 7v5c0 4.4 3.4 8.6 8 9 4.6-.4 8-4.6 8-9V7zm0 2.2L18 8v4c0 3.3-2.5 6.6-6 7-3.5-.4-6-3.7-6-7V8z" />
      </svg>
    )
  }
  if (icon === 'grid') {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label="grid icon">
        <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" />
      </svg>
    )
  }
  if (icon === 'shield') {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label="shield icon">
        <path d="M12 2 4 6v5c0 5 3.4 9.8 8 11 4.6-1.2 8-6 8-11V6z" />
      </svg>
    )
  }
  if (icon === 'tool') {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label="tool icon">
        <path d="m21 7-4-4-2.5 2.5L17.5 8l-7 7L8 12.5l-5 5V21h3.5l5-5L16 20.5 21 15l-2.5-2.5 2.5-2.5z" />
      </svg>
    )
  }
  if (icon === 'clock') {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label="clock icon">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 11h-6V11h4V6h2z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="help icon">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 17h-1.5v-1.5H12zm1.7-6.3-.7.5v1.1h-2v-2.1l1.5-1.1a1.6 1.6 0 1 0-2.6-1.3H8a3.6 3.6 0 1 1 5.7 2.9z" />
    </svg>
  )
}
