import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { MDXComponents } from '@/components/MDXComponents'
import { formatDate } from '@/lib/formatDate'

export default function PrivacyPolicyWrapper({ children, metadata }) {
  return (
    <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <header className="mx-auto flex max-w-5xl flex-col text-center ">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
            {metadata.title}
          </h1>
          <time
            dateTime={metadata.lastUpdated}
            className="mt-6 text-sm text-neutral-500"
          >
            Last updated: {formatDate(metadata.lastUpdated)}
          </time>
          
        </header>
      </FadeIn>

      <FadeIn>
        <MDXComponents.wrapper className="mt-24 sm:mt-32 lg:mt-40">
          {children}
        </MDXComponents.wrapper>
      </FadeIn>
    </Container>
  )
}