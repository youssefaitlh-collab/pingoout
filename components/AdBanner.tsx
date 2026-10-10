'use client'
import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

export default function AdBanner() {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'inline-block', width: 320, height: 50 }}
      data-ad-client="ca-pub-9824075482126113"
      data-ad-slot="6942724936"
    />
  )
}
