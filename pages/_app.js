import '../styles/global.css'
import { useEffect } from 'react';
import * as Fathom from 'fathom-client'

const fathomTrackingCode = process.env.FATHOM_TRACKING_CODE

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

export default App
