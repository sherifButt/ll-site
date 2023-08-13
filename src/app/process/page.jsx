import { Blockquote } from '@/components/Blockquote'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { GridPattern } from '@/components/GridPattern'
import { List, ListItem } from '@/components/List'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { TagList, TagListItem } from '@/components/TagList'
import imageLaptop from '@/images/laptop.jpg'
import imageMeeting from '@/images/meeting.jpg'
import imageWhiteboard from '@/images/whiteboard.jpg'

function Section({ title, image, children }) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

function Discover() {
  return (
    <Section title="Discover" image={{ src: imageWhiteboard }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
        Loyalleads works closely with its clients to understand their needs and goals, embedding itself in their everyday operations to understand what makes their business tick.
        </p>
        <p>
        Loyalleads’ team of experts conducts thorough research and analysis to gain deep insights into the client’s business operations. This includes shadowing key personnel, conducting security audits, and leveraging advanced techniques to ensure the highest level of data security.
        </p>
        <p>
        After completing a comprehensive audit, Loyalleads provides clients with a detailed <strong className="font-semibold text-neutral-950">plan</strong> and budget that aligns with their specific requirements and goals.{' '}
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <TagList className="mt-4">
        <TagListItem>In-depth questionnaires</TagListItem>
        <TagListItem>Feasibility studies</TagListItem>
        <TagListItem>Blood samples</TagListItem>
        <TagListItem>Employee surveys</TagListItem>
        <TagListItem>Proofs-of-concept</TagListItem>
        <TagListItem>Forensic audit</TagListItem>
      </TagList>
    </Section>
  )
}

function Build() {
  return (
    <Section title="Build" image={{ src: imageLaptop, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
        Loyalleads leverages the insights gained during the discovery phase to develop a detailed roadmap for each product, ensuring a clear and efficient path to delivery. The roadmap is carefully crafted to optimize project timelines and deliver high-quality results.
        </p>
        <p>
          Each client is assigned a key account manager to keep lines of
          communication open and obscure the actual progress of the project.
          They act as a buffer between the client’s incessant nagging and the
          development team who are hard at work scouring open source projects
          for code to re-purpose.
        </p>
        <p>
          Our account managers are trained to only reply to client emails after
          9pm, several days after the initial email. This reinforces the general
          aura that we are very busy and dissuades clients from asking for
          changes.
        </p>
      </div>

      <Blockquote
        author={{ name: 'Debra Fiscal', role: 'CEO of Unseal' }}
        className="mt-12"
      >
        Loyalleads were so regular with their progress updates we almost began to
        think they were automated!
      </Blockquote>
    </Section>
  )
}

function Deliver() {
  return (
    <Section title="Deliver" image={{ src: imageMeeting, shape: 2 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
        During the Build phase, Loyalleads carefully manages project timelines and budgets to accommodate any changes in requirements. This ensures that the final product meets the client’s expectations and allows for optimal resource allocation.
        </p>
        <p>
        While leveraging pre-built components, Loyalleads focuses on delivering significant progress throughout the project timeline. The development team dedicates their time to creating innovative solutions and ensuring the highest quality deliverables.
        </p>
        <p>
        Loyalleads guarantees that all main pages of the website are fully functional and optimized for launch. Any auxiliary pages are initially populated with placeholder content and later updated as part of the ongoing maintenance and support provided by the agency.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <List className="mt-8">
        <ListItem title="Testing">
          Our projects always have 100% test coverage, which would be impressive
          if our tests weren’t as porous as a sieve.
        </ListItem>
        <ListItem title="Infrastructure">
          To ensure reliability we only use the best Digital Ocean droplets that
          $4 a month can buy.
        </ListItem>
        <ListItem title="Support">
          Because we hold the API keys for every critical service your business
          uses, you can expect a lifetime of support, and invoices, from us.
        </ListItem>
      </List>
    </Section>
  )
}

function Values() {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>

      <SectionIntro
        eyebrow="Our values"
        title="Balancing reliability and innovation"
      >
        <p>
          We strive to stay at the forefront of emerging trends and
          technologies, while completely ignoring them and forking that old
          Rails project we feel comfortable using. We stand by our core values
          to justify that decision.
        </p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList>
          <GridListItem title="Meticulous">
          Loyalleads design team collaborates with clients to incorporate their branding elements into the project’s visual identity. This includes creating a customized logo and selecting a color palette that aligns with the client’s brand guidelines.
          </GridListItem>
          <GridListItem title="Efficient">
          Loyalleads takes pride in its commitment to meeting project deadlines. This is made possible by leveraging its extensive experience and utilizing efficient development processes.
          </GridListItem>
          <GridListItem title="Adaptable">
          Loyalleads recognizes that every business has unique requirements, and the agency excels at tailoring its existing solutions to meet those specific needs.
          </GridListItem>
          <GridListItem title="Honest">
          Loyalleads maintains transparency throughout the project lifecycle, ensuring clients have a clear understanding of the processes and progress. The agency prioritizes effective communication to ensure client satisfaction.
          </GridListItem>
          <GridListItem title="Loyal">
          We at Loyalleads values long-term partnerships with its clients, providing ongoing support and services beyond the initial project delivery. This commitment ensures continued success and growth for the clien’s business.
          </GridListItem>
          <GridListItem title="Innovative">
          Loyalleads embraces the ever-evolving technological landscape and remains at the forefront of industry trends. The agency actively explores new open source projects and technologies to enhance its solutions and deliver cutting-edge results.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

export const metadata = {
  title: 'Our Process',
  description:
    'We believe in efficiency and maximizing our resources to provide the best value to our clients.',
}

export default function Process() {
  return (
    <>
      <PageIntro eyebrow="Our process" title="How we work">
        <p>
          We believe in efficiency and maximizing our resources to provide the
          best value to our clients. The primary way we do that is by re-using
          the same five projects we’ve been developing for the past decade.
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <Discover />
        <Build />
        <Deliver />
      </div>

      <Values />

      <ContactSection />
    </>
  )
}