import Image from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import imageAngelaFisher from '@/images/team/angela-fisher.jpeg'
import imageBenjaminRussel from '@/images/team/benjamin-russel.jpeg'
import imageBlakeReid from '@/images/team/blake-reid.jpeg'
import imageChelseaHagon from '@/images/team/chelsea-hagon.jpeg'
import imageDriesVincent from '@/images/team/dries-vincent.jpeg'
import imageEmmaDorsey from '@/images/team/emma-dorsey.jpeg'
import imageJeffreyWebb from '@/images/team/jeffrey-webb.jpeg'
import imageKathrynMurphy from '@/images/team/kathryn-murphy.jpeg'
import imageLeonardKrasner from '@/images/team/leonard-krasner.jpeg'

import imageAbdullahTahaIbrahim from '@/images/team/abdullah-taha-ibrahim.jpg'
import imageWhitneyFrancis from '@/images/team/whitney-francis.jpeg'
import imageSherifButt from '@/images/team/sherif-butt.jpg'
import imageEwaButt from '@/images/team/ewa-butt.jpg'
import imageJuliaButt from '@/images/team/julia-butt.jpg'
import { loadMDXMetadata } from '@/lib/loadMDXMetadata'

function Culture() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32 mx-2 sm:mx-6">
      <SectionIntro
        eyebrow="Our culture"
        title="Balance your passion with your passion for life."
        invert
      >
        <p>
          We are a group of like-minded people who share the same core values.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Loyalty" invert>
            Our team has been with us since the beginning because none of them
            are allowed to have LinkedIn profiles.
          </GridListItem>
          <GridListItem title="Trust" invert>
            We don’t care when our team works just as long as they are working
            every waking second.
          </GridListItem>
          <GridListItem title="Compassion" invert>
            You never know what someone is going through at home and we make
            sure to never find out.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

const team = [
  // {
  //   title: 'Leadership',
  //   people: [
      
  //     {
  //       name: 'Ewa Butt',
  //       role: 'Co-Founder / CFO',
  //       image: { src: imageEwaButt },
  //     }
  //   ],
  // },
  {
    title: 'Team',
    people: [
      
      {
        name: 'Emma Dorsey',
        role: 'Senior Designer',
        image: { src: imageEmmaDorsey },
      },
      
      {
        name: 'Jeffrey Webb',
        role: 'Account Coordinator',
        image: { src: imageJeffreyWebb },
      },
      {
        name: 'Sherif Butt',
        role: 'Head of Software Development',
        image: { src: imageSherifButt },
      },
      {
        name: 'Abdullah  Ibrahim ',
        role: 'Senior Developer',
        image: { src: imageAbdullahTahaIbrahim },
      }
      ,{
        name: 'Julia S M B',
        role: 'Product Designer',
        image: { src: imageJuliaButt },
      },
    ],
  },
]

function Team() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {team.map((group) => (
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  {group.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {group.people.map((person) => (
                    <li key={person.name}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          <Image
                            alt=""
                            {...person.image}
                            className="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-white">
                              {person.role}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  )
}

export const metadata = {
  title: 'About Us',
  description:
    'Loyalleads is a premier software development agency based in Cardiff, renowned for its expertise in creating sophisticated web applications, bespoke websites, and effective online marketing flows. With a strong focus on both B2B and B2C markets, Loyalleads has established a reputation for delivering high-quality, tailored solutions that meet the unique needs of each client.',
}

export default async function About() {
  let blogArticles = (await loadMDXMetadata('blog')).slice(0, 2)

  return (
    <>
      <PageIntro eyebrow="About us" title="Our strength is collaboration">
        <p>
          We believe that our strength lies in our collaborative approach, which
          puts our clients at the center of everything we do.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
          Loyalleads is a premier software development agency based in Cardiff, renowned for its expertise in creating sophisticated web applications, bespoke websites, and effective online marketing flows.
          </p>
          <p>
          With a strong focus on both B2B and B2C markets, Loyalleads has established a reputation for delivering high-quality, tailored solutions that meet the unique needs of each client.
          </p>
        </div>
      </PageIntro>
      <Container className="mt-16">
        {/* <StatList>
          <StatListItem value="35" label="Underpaid employees" />
          <StatListItem value="52" label="Placated clients" />
          <StatListItem value="$25M" label="Invoices billed" />
        </StatList> */}
      </Container>

      <Culture />

      <Team />

      <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="From the blog"
        intro="Loyalleads is a premier software development agency based in Cardiff, renowned for its expertise in creating sophisticated web applications, bespoke websites, and effective online marketing flows. With a strong focus on both B2B and B2C markets, Loyalleads has established a reputation for delivering high-quality, tailored solutions that meet the unique needs of each client."
        pages={blogArticles}
      />

      <ContactSection />
    </>
  )
}