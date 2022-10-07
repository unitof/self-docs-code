import '../styles/global.css'
import { useEffect } from 'react';
import * as Fathom from 'fathom-client'

const fathomTrackingCode = process.env.NEXT_PUBLIC_FATHOM_SITEID

function App({ Component, pageProps }) {

  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load(fathomTrackingCode, {
      includedDomains: [
        'docs.jacobford.com',
      ],
    })
  })

  return <Component {...pageProps} />
}

// Axiom Web Vitals unsampled logging
export function reportWebVitals(metric) {
  const url = process.env.NEXT_PUBLIC_AXIOM_INGEST_ENDPOINT

  if (!url) {
    return
  }

  const body = JSON.stringify({
    route: window.__NEXT_DATA__.page,
    ...metric,
  })

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, {
      body,
      method:
      'POST',
      keepalive: true
    })
  }
}

export default App
