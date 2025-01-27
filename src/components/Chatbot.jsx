// src/components/Chatbot.jsx
'use client'
import React, { useEffect } from 'react';

function Chatbot() {
  useEffect(() => {
    if (!document.getElementById('chatwoot-script')) {
      const BASE_URL = 'https://chatwoot.loyalleads.co.uk'
      const g = document.createElement('script')
      g.id = 'chatwoot-script'
      g.src = BASE_URL + '/packs/js/sdk.js'
      g.defer = true
      g.async = true

      g.onload = () => {
        window.chatwootSDK.run({
          websiteToken: 'WHcX98tCBxw1czkt2KTTQcnb',
          baseUrl: 'https://chatwoot.loyalleads.co.uk',
          customAttributes: {
            // Add attributes for bot context
            botEndpoint:
              'https://n8n.loyalleads.co.uk/webhook/7855073f-3aad-45f9-a255-5325d85ba079/chat',
          },
        })
      }

      const s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(g, s)
    }
  }, [])

  return null
}

export default  Chatbot