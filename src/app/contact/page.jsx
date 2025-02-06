import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'
import { ContactForm } from '@/components/ContactForm'
import { Logo } from '@/components/Logo'

function ContactDetails() {
  return (
    <div>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        Our office
      </h2>
      <p className="mt-6 text-base text-neutral-600">
        <Logo className="inline w-28 " /> understands the importance of personal
        interaction. Although we primarily operate online, we have provided our
        office addresses for legal purposes.
      </p>

      <Offices className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Email us
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[
            ['Careers', 'careers@loyalleads.co.uk'],
            ['Press', 'press@loyalleads.co.uk'],
          ].map(([label, email]) => (
            <div key={email}>
              <dt className="font-semibold text-neutral-950">{label}</dt>
              <dd>
                <Link
                  href={`mailto:${email}`}
                  className="text-neutral-600 hover:text-neutral-950"
                >
                  {email}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Border>

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Follow us
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </div>
  )
}

export const metadata = {
  title: 'Contact Us',
  description:
    'Loyalleads is a premier software development agency based in Cardiff, renowned for its expertise in creating sophisticated web applications, bespoke websites, and effective online marketing flows. With a strong focus on both B2B and B2C markets, Loyalleads has established a reputation for delivering high-quality, tailored solutions that meet the unique needs of each client.',
}

export default function Contact() {
  return (
    <FadeIn>
      <div className="grid gap-y-16 p-8 lg:grid-cols-2 lg:gap-x-8 lg:p-12">
        <div>
          <PageIntro eyebrow="Contact us" title="Let’s work together">
            <p>We can’t wait to hear from you.</p>
            {/* <p className='text-5xl mt-12'>↓</p> */}{' '}
          </PageIntro>
          <Container className="mt-24 sm:mt-32 lg:mt-40 hidden lg:inline-block">
            <ContactDetails />
          </Container>
        </div>
        <dive className="mt-12 sm:mt-32 lg:mt-40">
          <ContactForm />
        </dive>
      </div>
      <Container className="mt-24 sm:mt-32 lg:mt-40 inline-block lg:hidden">
        <ContactDetails />
      </Container>
    </FadeIn>
  )
}
