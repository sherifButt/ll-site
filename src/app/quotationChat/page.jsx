// src/app/quotationChat/page.jsx

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import ChatWidget from '@/components/chat-widget/chat-widget'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import QuotationForm from '@/components/QuotationForm'

function ProjectProcess() {
  return (
    <Border className="mt-16 pt-16">
      <h2 className="font-display text-base font-semibold text-neutral-950">
        Our Process
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-neutral-950">
            1. Share Your Vision
          </h3>
          <p className="mt-4 text-sm text-neutral-600">
            Tell us about your project needs, goals, and technical requirements
            through our smart questionnaire.
          </p>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-neutral-950">
            2. Get Your Quote
          </h3>
          <p className="mt-4 text-sm text-neutral-600">
            Receive a detailed, AI-generated quote tailored to your specific
            project requirements within minutes.
          </p>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-neutral-950">
            3. Lets Discuss
          </h3>
          <p className="mt-4 text-sm text-neutral-600">
            Book a meeting with our experts to refine the proposal and start
            bringing your vision to life.
          </p>
        </div>
      </div>
    </Border>
  )
}

const PageTitle = () => (
  <div>
    <h1>
      <span className="block font-display text-base font-semibold text-neutral-950">
        -
      </span>
      <span className="sr-only"> - </span>
      <span className="mt-6 block max-w-5xl font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
        Smart Quotes for Your Projects
      </span>
    </h1>
    <div className="mt-6 max-w-3xl text-xl text-neutral-600">
      <p>
        Get an instant, AI-powered quote tailored to your project needs. Our
        intelligent system analyzes your requirements to provide accurate
        estimates and comprehensive proposals.
      </p>
      {/* <a href="#form-container"
            className="mt-12 flex aspect-square h-16 w-16 items-center justify-center rounded-full text-5xl hover:bg-neutral-950/10"
            id="form-container"
            >
                ↓
              </a> */}
    </div>
  </div>
)

export const metadata = {
  title: 'Get a Quote',
  description:
    'Get an instant, AI-powered quote for your web or mobile application project. Our smart system analyzes your requirements to provide accurate estimates and detailed proposals.',
}

export default function Quote() {
  return (
    <>
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div className="relative grid gap-y-16 lg:grid-cols-2 lg:gap-x-8">
            <PageTitle />
            <div className="-ml-4 lg:absolute lg:-top-[75px] lg:right-[100px]">
              <ChatWidget
                instanceId="quote-chat"
                webhookUrl="https://n8n.loyalleads.co.uk/webhook/e4529fdb-bd13-4847-b2a7-33b926224765/chat"
                mode="fullscreen"
                logoUrl="/images/loyalleads_logo.png"
                title="↓ Get a Quote"
                subtitle=""
                initialMessages={[
                  ' Hi there!',
                  "I'm a chatbot here to help you get a quote for your project. ",
                  'Please help me understand your project by answering a few questions.',
                  `First, can you describe how complex is your project?\n
'Simple' for a basic company website,
'Medium' for an e-commerce site,
'Complex' for a large marketplace,
'Innovative' for AI-driven platforms.`,
                ]}
                getStarted="→ Start Your Project's Quote Now"
                chatLayoutStyle={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '25px',
                  height: '530px',
                  width: '400px',
                  maxHeight: '530px',
                  maxWidth: '400px',
                }}
                headerStyle={{
                  background: 'rgb(255 255 255 / 0.7 )',
                  // display: 'none',
                }}
                bodyStyle={{
                  background: 'rgb(255 255 255 / 0.7 )',
                }}
                powerByStyle={{
                  marginLeft: '0px',
                }}
                footerStyle={{
                  background: 'rgb(255 255 255 / 0.7 )',
                }}
              />
            </div>
          </div>

          {/* Quote Instructions */}
          <div className="mt-12 lg:mt-12">
            <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
              <ProjectProcess />
            </div>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
