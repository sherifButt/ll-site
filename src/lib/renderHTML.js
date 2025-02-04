export const renderHTML = (content) => {
  if (typeof content !== 'string') return content

  // Create a temporary container to parse HTML content
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')

  // Function to recursively render nodes
  const renderNode = (node) => {
    if (node.nodeType === 3) {
      // Text node
      return node.textContent
    }

    if (node.nodeType === 1) {
      // Element node
      const children = Array.from(node.childNodes).map(renderNode)

      switch (node.tagName.toLowerCase()) {
        case 'br':
          return <br key={Math.random()} />
        case 'hr':
          return <hr key={Math.random()} className="my-1 border-neutral-800" />
        case 'strong':
        case 'b':
          return (
            <strong key={Math.random()} className="font-bold">
              {children}
            </strong>
          )
        case 'i':
        case 'em':
          return (
            <i key={Math.random()} className="italic">
              {children}
            </i>
          )
        case 'u':
          return (
            <u key={Math.random()} className="underline">
              {children}
            </u>
          )
        case 'ul':
          return (
            <ul key={Math.random()} className="list-disc space-y-1 pl-4">
              {children}
            </ul>
          )
        case 'ol':
          return (
            <ol key={Math.random()} className="list-decimal space-y-1 pl-4">
              {children}
            </ol>
          )
        case 'li':
          return <li key={Math.random()}>{children}</li>
        case 'p':
          return (
            <p key={Math.random()} className="mb-2">
              {children}
            </p>
          )
        default:
          return children
      }
    }

    return null
  }

  return Array.from(doc.body.childNodes).map(renderNode)
}
