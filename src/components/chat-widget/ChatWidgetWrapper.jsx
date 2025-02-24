'use client'

import { usePathname } from 'next/navigation'
import ChatWidget from '@/components/chat-widget/chat-widget'

export default function ChatWidgetWrapper() {
  const pathname = usePathname()
    // const isQuotePage = pathname === '/quotationChat'
    
    switch ( pathname ) {
        case '/quotationChat':
            return null
            break;
    
        default:
            return <ChatWidget logoUrl="/images/loyalleads_logo.png" mode="window" initialMessages={ [ " Hi there!","I'm a chatbot here to help you get a answering any question regarding your coming project. Let's get started!",`[Product Example  ？](~ "go to step 1")
[know more  ？](~ "teml me more about product_name")
[Options Example  ？](~ "go to step 1")
[know more  ？](~ "teml me more about product_name")`]}/>
               
    }
    
}
