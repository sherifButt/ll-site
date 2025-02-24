'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import '@n8n/chat/style.css'
import { createChat } from '@n8n/chat'
import { X } from '@heroicons/react/24/outline'
import styles from './chat-widget.module.css'
const logoPath = '../../images/loyalleads_logo.png'

export default function ChatWidget({
  logoUrl,
  id,
  webhookUrl = 'https://n8n.loyalleads.co.uk/webhook/254c4f93-c5d2-431f-926b-4a764f5c5aa6/chat',
  mode = 'window',
  showWelcomeScreen = true,
  inputPlaceholder = 'Type a message ..',
  getStarted = 'New Conversation',
   title = 'Hi there...',
  subtitle="",
  footer="",
  initialMessages = [
    'Hi there!',
    'My name is Emily, welcome to Michelle Marshall Salon. How can I assist you today?',
  ],
  // New styling props
  chatLayoutStyle = {},
  powerByStyle = {},
  headerStyle = {},
  bodyStyle = {},
  footerStyle = {},
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  messageStyle = {},
  inputStyle = {},
}) {
  const router = useRouter()
  const pathname = usePathname()
  const chatRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  const updateMetadata = () => {
    const metadata = {
      page: window.location.pathname,
      title: document.title,
      url: window.location.href,
    }
    const event = new CustomEvent('n8n-metadata-update', { detail: metadata })
    window.dispatchEvent(event)

    const chatFrame = document.querySelector('iframe[title="n8n Chat"]')
    if (chatFrame) {
      chatFrame.contentWindow?.postMessage(
        { type: 'updateMetadata', metadata },
        '*'
      )
    }
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Handle chat window state changes
    const handleChatStateChange = () => {
      const chatWindow = document.querySelector('.chat-window')
      const toggleButton = document.querySelector('.chat-window-toggle')
      if (!chatWindow || !toggleButton || !isMobile) return

      const chatIsOpen = window.getComputedStyle(chatWindow).display !== 'none'
      toggleButton.classList.toggle('chat-window-toggle--open', chatIsOpen)
    }

    // Create observer to watch for chat window visibility changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'style'
        ) {
          handleChatStateChange()
        }
      })
    })

    const chatWindow = document.querySelector('.chat-window')
    if (chatWindow) {
      observer.observe(chatWindow, { attributes: true })
    }

    return () => {
      window.removeEventListener('resize', checkMobile)
      observer.disconnect()
    }
  }, [isMobile])

  const processLinks = (container) => {
    const links = container.getElementsByTagName('a')
    Array.from(links).forEach((link) => {
      const href = link.getAttribute('href')
      if (
        href &&
        (href.startsWith('/') || href.startsWith(window.location.origin))
      ) {
        link.setAttribute('target', '_self')
        link.onclick = (e) => {
          e.preventDefault()
          const cleanHref = href.replace(window.location.origin, '')
          router.push(cleanHref)
        }
      }
    })
  }

 const processChatOptions = (container) => {
    // Find all message elements
    const messages = container.querySelectorAll('.chat-message-markdown')
    
    messages.forEach(message => {
      // Don't process if already processed
      if (message.hasAttribute('data-processed-options')) return
      
      // Process links in the message
      const links = message.querySelectorAll('a')
      links.forEach(link => {
        const text = link.textContent.trim()
        // Check if this is a chat option link
        if ( link.getAttribute('href')?.startsWith('~')) {
          // Prevent default link behavior
          link.onclick = (e) => {
            e.preventDefault()
            e.stopPropagation()
            
            // Find the chat input
            const chatInput = document.querySelector('.chat-inputs textarea')
            if (chatInput) {
              // Remove the arrow symbol and trim
              const inputText = text.replace('→', '').trim()
              
              // Set the value
              chatInput.value = inputText
              
              // Dispatch input event to enable send button
              const inputEvent = new Event('input', { bubbles: true })
              chatInput.dispatchEvent(inputEvent)
              
              // Find and click send button after a short delay
              setTimeout(() => {
                const sendButton = document.querySelector('.chat-input-send-button')
                if (sendButton && !sendButton.disabled) {
                  sendButton.click()
                }
              }, 100)
            }
          }
          
         //  // Style the link as a button
         //  link.style.display = 'block'
         //  link.style.marginBottom = '8px'
         //  link.style.padding = '10px'
         //  link.style.backgroundColor = '#ffffff'
         //  link.style.border = '1px solid #e2e8f0'
         //  link.style.borderRadius = '8px'
         //  link.style.textDecoration = 'none'
         //  link.style.color = '#0a0a0a'
         //  link.style.fontSize = '0.85rem'
         //  link.style.cursor = 'pointer'
         //  link.style.transition = 'background-color 0.2s'
          
         //  // Add hover effect
         //  link.onmouseover = () => {
         //    link.style.backgroundColor = '#f7fafc'
         //  }
         //  link.onmouseout = () => {
         //    link.style.backgroundColor = '#ffffff'
         //  }
        }
      })
      
      // Mark as processed
      message.setAttribute('data-processed-options', 'true')
    })
  }
  
  

useEffect(() => {
  let chatInstance = null // Store chat instance reference

  // Clean up any existing chat instances
  const cleanup = () => {
    const existingChat = document.querySelector('#n8n-chat iframe')
    if (existingChat) {
      existingChat.remove()
    }
    if (chatInstance) {
      // Cleanup chat instance if it has an unmount method
      if (typeof chatInstance.unmount === 'function') {
        chatInstance.unmount()
      }
    }
  }

  // Create new chat instance
  const initChat = () => {
    cleanup() // Clean up before creating new instance

    chatInstance = createChat({
      webhookUrl: webhookUrl,
      mode: mode,
      showWelcomeScreen: showWelcomeScreen,
      chatSessionKey: 'sessionId',
      allowFileUploads: true,
      metadata: {
        page: window.location.pathname,
        title: document.title,
        url: window.location.href,
      },
      initialMessages: initialMessages,
      i18n: {
        en: {
          title: title,
          subtitle: subtitle,
          footer: footer,
          getStarted: getStarted,
          inputPlaceholder: inputPlaceholder,
          closeButtonTooltip: 'Close chat',
        },
      },
    })
  }

  initChat()

  // Set up observers after chat is initialized
  const setupObservers = () => {
    const chatContainer = document.querySelector('.chat-messages-list')
    if (!chatContainer) return false

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              processChatOptions(node)
              processLinks(node)
            }
          })
        }
      })
    })

    processLinks(chatContainer)
    processChatOptions(chatContainer)
    observer.observe(chatContainer, {
      childList: true,
      subtree: true,
    })

    return observer
  }

  // Try to set up observers with retry
  let observer = null
  const observerInterval = setInterval(() => {
    observer = setupObservers()
    if (observer) {
      clearInterval(observerInterval)
    }
  }, 500)

  // Cleanup function
  return () => {
    if (observer) {
      observer.disconnect()
    }
    clearInterval(observerInterval)
    cleanup()
  }
}, [
  webhookUrl,
  mode,
  showWelcomeScreen,
  initialMessages,
  title,
  subtitle,
  footer,
  getStarted,
  inputPlaceholder,
  router,
])

  useEffect(() => {
    setTimeout(updateMetadata, 100)
  }, [pathname])

  useEffect(() => {
    if (!logoUrl) return

    const injectHeader = () => {
      const chatWindow = document.querySelector('.chat-window')
      if (!chatWindow) return false

      const header = chatWindow.querySelector('.chat-header')
      if (header && !header.querySelector('.chat-logo')) {
        // Mobile toggle button is handled by CSS positioning

        const wrapper = document.createElement('div')
        wrapper.className = 'chat-logo-wrapper'
        wrapper.style.cssText = `
              display: flex;
              align-items: center;
              margin-right: 10px;
              position: relative;
              z-index: 10;
            `
        const logo = document.createElement('img')
        logo.src = logoUrl
        logo.className = 'chat-logo'
        wrapper.appendChild(logo)
        header.insertBefore(wrapper, header.firstChild)
        return true
      }
      return false
    }

    setTimeout(() => {
      if (!injectHeader()) {
        const interval = setInterval(() => {
          if (injectHeader()) {
            clearInterval(interval)
          }
        }, 1000)
        setTimeout(() => clearInterval(interval), 10000)
      }
    }, 2000)
  }, [logoUrl, isMobile])

  const convertStyleToCss = (styleObj) => {
    return Object.entries(styleObj)
      .map(
        ([key, value]) =>
          `${key
            .replace(/([A-Z])/g, '-$1')
            .toLowerCase()}: ${value} !important;`
      )
      .join('\n')
  }

  return (
    <>
      <div
        id="n8n-chat"
        className={`${styles.chatWidget} ${styles.chatContainer}`}
      ></div>
      <style jsx global>{`
        @media (max-width: 768px) {
          .chat-window {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100% !important;
            height: 100% !important;
            max-height: none !important;
            border-radius: 0 !important;
            z-index: 9999 !important;
          }

          .chat-message-markdown a {
            width: 100%;
            text-align: center;
          }
        }

        .chat-window {
          box-shadow: 0 2px 48px rgba(19, 33, 68, 0.16);
          
        }

        .chat-layout {
          ${convertStyleToCss(chatLayoutStyle)}
        }
        .chat-header {
          display: flex !important;
          padding: 20px !important;
          gap: 10px !important;
          min-height: 60px !important;
          position: relative !important;
          ${convertStyleToCss(headerStyle)}
        }

        .chat-body {
          ${convertStyleToCss(bodyStyle)}
        }

        .chat-footer {
          ${convertStyleToCss(footerStyle)}
        }

        .chat-input {
          ${convertStyleToCss(inputStyle)}
        }

        .chat-message {
          width: fit-content;
          max-width: 90%;
          font-weight: 300;
          box-shadow: 0 0.25rem 6px #32325d14, 0 1px 3px #0000000d;
          ${convertStyleToCss(messageStyle)}
        }

        /* Add className support */
        .${headerClassName} {
          display: flex !important;
          align-items: center !important;
        }

        .${bodyClassName} {
          height: 100% !important;
        }

        .${footerClassName} {
          padding: 10px !important;
        }

        @media (max-width: 768px) {
          .chat-window-toggle {
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
            z-index: 99999 !important;
            transition: all 0.3s ease !important;
          }

          .chat-window-toggle--open {
            bottom: auto !important;
            top: 20px !important;
            background: var(--chat--toggle--background) !important;
            border: var(--chat--window--border) !important;
          }

          .chat-logo-wrapper {
            margin-left: 0 !important;
          }
        }

        .chat-logo-wrapper {
          flex-shrink: 0 !important;
          display: flex !important;
          align-items: center !important;
          position: relative !important;
          z-index: 10 !important;
        }

        .chat-logo {
          width: 50px !important;
          height: 50px !important;
          object-fit: contain !important;
          display: block !important;
        }

        .chat-powered-by:last-child {
          cursor: pointer;
          font-size: 0.83rem;
          filter: grayscale();
          opacity: 0.3;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: 25%;
          ${convertStyleToCss(powerByStyle)}
        }

        .chat-powered-by:last-child::before {
          content: '';
          display: inline-block;
          width: 16px;
          height: 16px;
          background-image: url('${logoPath}');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }

        .chat-powered-by:last-child a[href*='n8n.io'] {
          display: none !important;
        }

        .chat-powered-by:last-child::after {
          content: 'loyalleads';
          color: inherit;
          text-decoration: underline;
        }

        .chat-message-markdown a {
          color: color(srgb 0.0392 0.0392 0.0392);
          text-decoration: none;
          background-color: color(srgb 0.9999 1 1);
          padding: 10px 10px;
          -webkit-border-radius: 8px;
          -moz-border-radius: 8px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 0.85rem;
          display: -webkit-inline-flex;
          border: 1px solid color(srgb 0.898 0.898 0.8981);
        }

        .chat-message-markdown a:hover {
          background-color: #00000010;
        }

        .chat-message-markdown img {
          border-radius: 4px;
        }

        .chat-option-button {
          display: inline-block;
          margin: 5px;
          padding: 8px 16px;
          background-color: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          color: #0a0a0a;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .chat-option-button:hover {
          background-color: #f3f4f6;
        }

        /* Chat window toggle button */

        .chat-message-markdown ul {
          display: flex;
          flex-wrap: wrap;
          x-gap: 10px;
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .chat-message-markdown li {
          margin: 0;
          padding: 0;
        }

        .chat-message-markdown a {
          display: inline-block;
          margin: 5px;
          padding: 8px 16px;
          background-color: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          color: #0a0a0a;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .chat-message-markdown a:hover {
          background-color: #f3f4f6;
        }
      `}</style>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('click', function(e) {
              if (e.target.closest('.chat-powered-by:last-child')) {
                window.open('https://loyalleads.co.uk/chat', '_self');
              }
            });
          `,
        }}
      />
    </>
  )
}
