import React from 'react'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { Blockquote } from '@/components/Blockquote'
import { Border } from '@/components/Border'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { StatList, StatListItem } from '@/components/StatList'
import { TagList, TagListItem } from '@/components/TagList'

const DynamicMermaid = dynamic(() => import('./Mermaid'), {
  ssr: false,
  loading: () => (
    <div className="my-8 flex justify-center">Loading diagram...</div>
  ),
})

export const MDXComponents = {
  Blockquote({ className, ...props }) {
    return <Blockquote className={clsx('my-32', className)} {...props} />
  },

  img: function Img({ className, ...props }) {
    return (
      <div
        className={clsx(
          'group isolate my-10 overflow-hidden rounded-4xl bg-neutral-100 max-sm:-mx-6',
          className
        )}
      >
        <GrayscaleTransitionImage
          {...props}
          sizes="(min-width: 768px) 42rem, 100vw"
          className="aspect-[16/10] w-full object-cover"
        />
      </div>
    )
  },
  StatList({ className, ...props }) {
    return (
      <StatList className={clsx('my-32 !max-w-none', className)} {...props} />
    )
  },
  StatListItem,
  table: function Table({ className, ...props }) {
    return (
      <div
        className={clsx(
          'my-10 max-sm:-mx-6 max-sm:flex max-sm:overflow-x-auto',
          className
        )}
      >
        <div className="max-sm:min-w-full max-sm:flex-none max-sm:px-6">
          <table {...props} />
        </div>
      </div>
    )
  },
  TagList({ className, ...props }) {
    return <TagList className={clsx('my-6', className)} {...props} />
  },
  TagListItem,
  TopTip({ className, children }) {
    return (
      <Border position="left" className={clsx('my-10 pl-8', className)}>
        <p className="font-display text-sm font-bold uppercase tracking-widest text-neutral-950">
          Top tip
        </p>
        <div className="mt-4">{children}</div>
      </Border>
    )
  },
  Typography({ className, ...props }) {
    return <div className={clsx('typography', className)} {...props} />
  },
  wrapper({ className, ...props }) {
    return (
      <div
        className={clsx(
          '[&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0',
          className
        )}
        {...props}
      />
    )
  },
  pre: function Pre({ children, ...props }) {
    const childNode = React.Children.only(children)
    
    // Handle Mermaid diagrams
    if (childNode?.props?.className?.includes('language-mermaid')) {
      let content = childNode.props.children
      
      // Handle different content formats
      if (typeof content === 'string') {
        content = content.trim()
      } else if (Array.isArray(content)) {
        content = content.join('\n').trim()
      } else if (typeof content === 'object' && content !== null) {
        content = content.props?.children || content.toString()
      }
      
      console.log('Pre Mermaid content:', content)
      return (
        <div className="my-16">
          <DynamicMermaid chart={content} />
        </div>
      )
    }

    return <pre {...props}>{children}</pre>
  },

  code: function Code({ className, children, ...props }) {
    // Handle Mermaid diagrams
    if (className === 'language-mermaid') {
      console.log('Code Mermaid content:', children)
      
      let chartContent = '';
      if (typeof children === 'string') {
        chartContent = children;
      } else if (Array.isArray(children)) {
        chartContent = children.join('\n');
      } else if (typeof children === 'object' && children !== null) {
        chartContent = children.props?.children || children.toString();
      } else {
        chartContent = String(children);
      }
      // Preserve any leading/trailing whitespace that might be part of the frontmatter
      chartContent = chartContent.toString()
      
      return (
        <div className="my-16">
          <DynamicMermaid chart={chartContent} />
        </div>
      )
    }

    // Default code handling
    return <code className={className} {...props}>{children}</code>
  },
}
