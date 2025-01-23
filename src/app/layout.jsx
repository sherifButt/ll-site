import Chatbot from '@/components/Chatbot'
import { RootLayout } from '@/components/RootLayout'
import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s - Loyalleads',
    default: 'Loyalleads is a premier software development agency based in Cardiff, renowned for its expertise in creating sophisticated web applications, bespoke websites, and effective online marketing flows. With a strong focus on both B2B and B2C markets, Loyalleads has established a reputation for delivering high-quality, tailored solutions that meet the unique needs of each client.',
  },
}

export default function Layout({ children }) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
  
      <body className="flex min-h-full flex-col">
      <Chatbot/>
        <RootLayout>{children}</RootLayout>
      </body>
      
    </html>
  )
}
