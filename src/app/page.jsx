import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import logoBrightPath from '@/images/clients/bright-path/logo-light.svg'
import logoFamilyFund from '@/images/clients/family-fund/logo-light.svg'
import logoGreenLife from '@/images/clients/green-life/logo-light.svg'
import logoHomeWork from '@/images/clients/home-work/logo-light.svg'
import logoMailSmirk from '@/images/clients/mail-smirk/logo-light.svg'
import logoNorthAdventures from '@/images/clients/north-adventures/logo-light.svg'
import logoPhobiaDark from '@/images/clients/phobia/logo-dark.svg'
import givestarMobile from '@/images/clients/givestar/portfolio_99.webp'
import logoPhobiaLight from '@/images/clients/octommerce/logo-light.svg'
import logoIronFxLight from '@/images/clients/ironfx/logo-light.svg'
import logoUnseal from '@/images/clients/unseal/logo-light.svg'
import imageLaptop from '@/images/laptop.jpg'
import { loadMDXMetadata } from '@/lib/loadMDXMetadata'
import FlashText from '@/components/FlashText'
import { Logo } from '@/components/Logo'
import { useId } from 'react'
import { PhoneFrame } from '@/components/PhoneFrame'
import { AppDemo } from '@/components/AppDemo'
import { Carousel } from '@/components/Carousel'
import VerticalShuffle from '@/components/Shuffle'
import { AppScreen } from '@/components/AppScreen'
import StockList from '@/components/StockList'
import CampaignList from '@/components/CampaignList'
import { LaptopFrame } from '@/components/LaptopFrame'
import HomeScreen from '@/components/HomeScreen'
import BentoGrids from '@/components/BentoGrids'
import PricingPage from '@/components/PricingPage'
import Stacked from '@/components/Stacked'
import Ecommerce from '@/components/Ecommerce'
import { Button } from '@/components/Button'
import { PlayIcon } from '@heroicons/react/20/solid'
import { ClockIcon } from '@heroicons/react/24/outline'

const clients = [
  ['Phobia', logoPhobiaLight],
  ['Unseal', logoUnseal],
  ['Mail Smirk', logoMailSmirk],
  ['IronFx', logoIronFxLight],
  // ['Home Work', logoHomeWork],
  // ['Green Life', logoGreenLife],
  // ['Bright Path', logoBrightPath],
  // ['North Adventures', logoNorthAdventures],
]

function Clients() {
  return (
    <div className="mx-1 mt-24 rounded-4xl  bg-neutral-950 py-20   sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="font-display text-4xl font-medium text-white [text-wrap:balance] sm:text-4xl">
            Our Clients
          </h2>
          <h2 className="text-left font-display text-sm  tracking-wider text-white sm:text-left">
            <Logo className="inline w-24 " invert /> has worked with numerous
            clients and delivered exceptional results
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {clients.map(([client, logo]) => (
              <li key={client}>
                <FadeIn>
                  <Image src={logo} alt={client} unoptimized />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function CaseStudies({ caseStudies }) {
  return (
    <>
      <SectionIntro
        title="Utilizing cutting-edge technologies for a brighter future"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          We believe technology is the answer to the world’s greatest
          challenges. It’s also the cause, so we find ourselves in bit of a
          catch 22 situation.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl bg-white p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time dateTime={caseStudy.year} className="font-semibold">
                    {caseStudy.date.split('-')[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function OurServices() {
  return (
    <>
      <SectionIntro
        eyebrow="OurServices"
        title="We help businesses identify, explore, and respond to new opportunities"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          As long as those opportunities involve giving us money to re-purpose
          old projects — we can come up with an endless number of those.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageLaptop}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Web application development">
              We specialise in crafting beautiful, high quality marketing pages.
              The rest of the website will be a shell that uses lorem ipsum
              everywhere.
            </ListItem>
            <ListItem title="Custom application development">
              We have a team of skilled developers who are experts in the latest
              app frameworks, like Angular 1 and Google Web Toolkit.
            </ListItem>
            <ListItem title="E-commerce solutions">
              We are at the forefront of modern e-commerce development. Which
              mainly means adding your logo to the Shopify store template we’ve
              used for the past six years.
            </ListItem>
            <ListItem title="Customized content management solutions">
              At Loyalleads we understand the importance of having a robust and
              customised CMS. That’s why we run all of our client projects out
              of a single, enormous Joomla instance.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata = {
  description:
    'We are a developer studio working at the intersection of design and technology.',
}

function BackgroundIllustration(props) {
  let id = useId()

  return (
    <div {...props}>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="animate-spin-slow absolute inset-0 h-full w-full"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="animate-spin-reverse-slower absolute inset-0 h-full w-full"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

function Slider () {
  return (
    <div className="-mx-4 min-h-[625px]  px-9 [mask-image:linear-gradient(to_bottom,white_80%,transparent)] sm:mx-0  lg:absolute lg:-inset-x-10 lg:-top-20 lg:bottom-20 lg:h-auto lg:min-w-[2325px] lg:-translate-y-[375px] lg:px-0 lg:pt-10 xl:-bottom-32">
      <VerticalShuffle
        interval={14000}
        autoPlay
        vertical
        shuffleIntensity={4}
        className="h-full w-full"
        initialAnimation={false}
      >
        <PhoneFrame
          className="mx-auto h-[728px] max-w-[366px] sm:-translate-x-[200px] sm:-translate-y-[40px]"
          priority
        >
          <Carousel interval={7000} autoPlay>
            <AppDemo />
            <CampaignList />
            {/* <StockList /> */}
          </Carousel>
        </PhoneFrame>

        <LaptopFrame className="mx-auto h-[728px] max-w-[980px] md:translate-x-[0px] lg:-translate-y-[40px]">
          <Carousel interval={7000} autoPlay>
            <HomeScreen />
            {/* <BentoGrids /> */}
            <Stacked />
            {/* <Ecommerce /> */}
            {/* <PricingPage/> */}
          </Carousel>
        </LaptopFrame>
      </VerticalShuffle>
    </div>
  )
}

export default async function Home() {
  let caseStudies = (await loadMDXMetadata('work')).slice(0, 3)

  return (
    <>
      <Container className="mt-24">
        <div className="relative z-50 lg:grid lg:grid-cols-2 lg:gap-y-20">
          <div className="relative z-50 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6"></div>
          <FadeIn className="max-w-3xl">
            <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
              Your Next{' '}
              <FlashText delay={14000} className="font-bold">
                Mobile|Web
              </FlashText>{' '}
              App{' '}
              <FlashText delay={7000} className="font-bold">
                Will|Should
              </FlashText>{' '}
              Look like This <span className="hidden lg:inline-block">→</span>
            </h1>
            <p className="mt-6 text-lg text-neutral-500">
              <Logo className="inline w-36 " /> is a web development agency
              based in Cardiff, We help business to build web applications that
              customer love.
            </p>
            <p>
              <strong>Have a business idea? Let us Quote it for free </strong>
            </p>
            <Button
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              variant="outline"
              className="mt-10"
            >
              <ClockIcon className="h-6 w-6 " />
              <span className="ml-2.5">Get Free Quote in Minutes</span>
            </Button>
          </FadeIn>
        </div>
        <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
          {/* <BackgroundIllustration className="absolute left-3/4 top-4 h-[1026px] w-[1026px] translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 sm:-translate-y-1/3 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" /> */}

          <Slider />
        </div>
      </Container>

      <Clients />

      <CaseStudies caseStudies={caseStudies} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Phobia', logo: logoPhobiaDark }}
      >
        The team at Loyalleads went above and beyond with our onboarding, even
        finding a way to access the user’s microphone without triggering one of
        those annoying permission dialogs.
      </Testimonial>

      <OurServices />

      <ContactSection />
    </>
  )
}
