'use client'
import React, { useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import '@n8n/chat/style.css'
import { createChat } from '@n8n/chat'
import styles from './chat-widget.module.css'
const logoPath = '/images/loyalleads_logo.png'

interface NavigationEvent extends CustomEvent { 
   detail: string
}

interface ChatWidgetProps {
   logoUrl?: string
}

export default function ChatWidget({ logoUrl }: ChatWidgetProps) {
   const router = useRouter()
   const pathname = usePathname()
   const chatRef = useRef<any>(null)

   const updateMetadata = () => {
      const metadata = {
         page: window.location.pathname,
         title: document.title,
         url: window.location.href,
      }
      const event = new CustomEvent('n8n-metadata-update', {
         detail: metadata,
      })
      window.dispatchEvent(event)

      const chatFrame = document.querySelector('iframe[title="n8n Chat"]')
      if (chatFrame) {
         ;(chatFrame as HTMLIFrameElement).contentWindow?.postMessage(
            {
               type: 'updateMetadata',
               metadata,
            },
            '*'
         )
      }
   }

   const processLinks = (container: Element) => {
      const links = container.getElementsByTagName('a')
      Array.from(links).forEach(link => {
         const href = link.getAttribute('href')
         if (
            href &&
            (href.startsWith('/') || href.startsWith(window.location.origin))
         ) {
            link.setAttribute('target', '_self')
            link.onclick = e => {
               e.preventDefault()
               const cleanHref = href.replace(window.location.origin, '')
               router.push(cleanHref)
            }
         }
      })
   }

   useEffect(() => {
      const observer = new MutationObserver(mutations => {
         mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
               mutation.addedNodes.forEach(node => {
                  if (node.nodeType === 1) {
                     processLinks(node as Element)
                  }
               })
            }
         })
      })

      const chat = createChat({
         webhookUrl:
            'https://n8n.loyalleads.co.uk/webhook/254c4f93-c5d2-431f-926b-4a764f5c5aa6/chat',
         mode: 'window',
         showWelcomeScreen: true,
         chatSessionKey: 'sessionId',
         metadata: {
            page: window.location.pathname,
            title: document.title,
            url: window.location.href,
         },
         initialMessages: [
            'Hi there!',
            'My name is Emily, welcome to Michelle Marshall Salon. How can I assist you today?',
         ],
         i18n: {
            en: {
               title: 'Hi there...',
               subtitle: '',
               footer: '',
               getStarted: 'New Conversation',
               inputPlaceholder: 'Type your question..',
               closeButtonTooltip: 'Close chat',
            },
         },
      })

      // Setup observer for chat messages
      const setupObserver = () => {
         const chatContainer = document.querySelector('.chat-messages-list')
         if (chatContainer) {
            // Process existing links
            processLinks(chatContainer)

            // Observe future changes
            observer.observe(chatContainer, {
               childList: true,
               subtree: true,
            })
            return true
         }
         return false
      }

      // Try to setup observer immediately and keep trying if it fails
      const interval = setInterval(() => {
         if (setupObserver()) {
            clearInterval(interval)
         }
      }, 500)

      // Cleanup after 10 seconds if setup hasn't succeeded
      setTimeout(() => clearInterval(interval), 10000)

      return () => {
         observer.disconnect()
         clearInterval(interval)
      }
   }, [router])

   useEffect(() => {
      setTimeout(updateMetadata, 100)
   }, [pathname])

   useEffect(() => {
      if (!logoUrl) return

      const checkAndInjectLogo = () => {
         const chatWindow = document.querySelector('.chat-window')
         if (!chatWindow) return false
         const header = chatWindow.querySelector('.chat-header')
         if (header && !header.querySelector('.chat-logo')) {
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
         if (!checkAndInjectLogo()) {
            const interval = setInterval(() => {
               if (checkAndInjectLogo()) {
                  clearInterval(interval)
               }
            }, 1000)
            setTimeout(() => clearInterval(interval), 10000)
         }
      }, 2000)
   }, [logoUrl])

   return (
     <>
       <div
         id="n8n-chat"
         className={`${styles.chatWidget} ${styles.chatContainer}`}
       ></div>
       <style jsx global>{`
         .chat-window {
           box-shadow: 0 2px 48px rgba(19, 33, 68, 0.16);
         }
         .chat-header {
           display: flex !important;
           padding: 20px !important;
           gap: 10px !important;
           min-height: 60px !important;
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
         .chat-message {
           width: fit-content;
           font-weight: 300;
           box-shadow: 0 0.25rem 6px #32325d14, 0 1px 3px #0000000d;
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
