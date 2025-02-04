import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
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
              Tell us about your project needs, goals, and technical
              requirements through our smart questionnaire.
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
        Get a Quote
      </span>
      <span className="sr-only"> - </span>
      <span className="mt-6 block max-w-5xl font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
        Smart Quotes for Your Projects <span className="ml-8">→</span>
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
      <Container className="mt-24 sm:mt-32 lg:mt-40 ">
        <FadeIn>

          <div className="grid lg:grid-cols-2 lg:gap-x-8 gap-y-16">
            <PageTitle />
            <QuotationForm />
          </div>

          {/* Quote Instructions */}
          <div className="mt-24 sm:mt-32 lg:mt-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
              <ProjectProcess />
            </div>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
