const processTable = (tableText) => {
  const rows = tableText.trim().split('\n')
  // Skip the alignment row and get only header and content rows
  const dataRows = rows.filter((row) => !row.match(/^\|[-:\s|]+\|$/))

  let table =
    '<table class="min-w-full divide-y divide-neutral-200">\n<thead>\n<tr>'

  // Process headers
  const headers = dataRows[0]
    .split('|')
    .filter((cell) => cell.trim())
    .map((cell) => cell.trim())

  headers.forEach((header) => {
    table += `<th class="px-6 py-4 text-left text-sm font-semibold text-neutral-900">${header}</th>`
  })

  table += '</tr>\n</thead>\n<tbody>'

  // Process body rows
  dataRows.slice(1).forEach((row, rowIndex) => {
    const cells = row
      .split('|')
      .filter((cell) => cell.trim())
      .map((cell) => cell.trim())

    table += `<tr class="${rowIndex % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}">`
    cells.forEach((cell) => {
      // Handle bold text in cells
      const cellContent = cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      table += `<td class="whitespace-pre-wrap px-6 py-4 text-sm text-neutral-600">${cellContent}</td>`
    })
    table += '</tr>'
  })

  table += '</tbody></table>'
  return table
}

export const renderMarkdown = (content) => {
  if (typeof content !== 'string') return content

  const parser = new DOMParser()

  const processMarkdown = (text) => {
    let processed = text

    // Headers
    processed = processed.replace(/^### (.*$)/gm, '<h3>$1</h3>')
    processed = processed.replace(/^## (.*$)/gm, '<h2>$1</h2>')
    processed = processed.replace(/^# (.*$)/gm, '<h1>$1</h1>')

    // Emphasis and bold
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>')

    // Horizontal rules
    processed = processed.replace(/^---$/gm, '<hr>')

    // Lists
    processed = processed.replace(/^\d\. (.*$)/gm, '<li>$1</li>')
    processed = processed.replace(/^- (.*$)/gm, '<li>$1</li>')
    processed = processed.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ol>$1</ol>')

    // Enhanced table support
    const tableRegex = /\|.*\|[\r\n]+\|[-:\s|]+\|[\r\n]+([\s\S]*?(?=\n{2}|$))/g
    processed = processed.replace(tableRegex, (match) => processTable(match))


    // Enhanced code blocks with syntax highlighting
    processed = processed.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      (match, lang, code) => {
        // Special handling for JSON
        if (lang?.toLowerCase() === 'json') {
          try {
            const formatted = JSON.stringify(JSON.parse(code), null, 2)
            return `<pre class="language-json"><code>${formatted}</code></pre>`
          } catch (e) {
            return `<pre class="language-json"><code>${code.trim()}</code></pre>`
          }
        }

        return `<pre class="language-${
          lang || 'plaintext'
        }"><code>${code.trim()}</code></pre>`
      }
    )

    // Inline code
    processed = processed.replace(/`([^`]+)`/g, '<code>$1</code>')

    // Paragraphs
    processed = processed.replace(/^(?!<[a-z])(.*$)/gm, '<p>$1</p>')

    return processed
  }

  const htmlContent = processMarkdown(content)
  const doc = parser.parseFromString(htmlContent, 'text/html')

  const renderNode = (node) => {
    if (node.nodeType === 3) return node.textContent

    if (node.nodeType === 1) {
      const children = Array.from(node.childNodes).map(renderNode)

      switch (node.tagName.toLowerCase()) {
        case 'h1':
          return (
            <h1 key={Math.random()} className="mb-6 text-4xl font-bold">
              {children}
            </h1>
          )
        case 'h2':
          return (
            <h2 key={Math.random()} className="mb-4 mt-8 text-3xl font-bold">
              {children}
            </h2>
          )
        case 'h3':
          return (
            <h3 key={Math.random()} className="mb-3 mt-6 text-2xl font-bold">
              {children}
            </h3>
          )
        case 'p':
          return (
            <p key={Math.random()} className="mb-4 leading-relaxed">
              {children}
            </p>
          )
        case 'strong':
          return (
            <strong key={Math.random()} className="font-bold">
              {children}
            </strong>
          )
        case 'em':
          return (
            <em key={Math.random()} className="italic">
              {children}
            </em>
          )
        case 'hr':
          return (
            <hr
              key={Math.random()}
              className="my-8 border-t border-neutral-200"
            />
          )
        case 'ul':
          return (
            <ul key={Math.random()} className="mb-4 list-disc space-y-2 pl-6">
              {children}
            </ul>
          )
        case 'ol':
          return (
            <ol
              key={Math.random()}
              className="mb-4 list-decimal space-y-2 pl-6"
            >
              {children}
            </ol>
          )
        case 'li':
          return (
            <li key={Math.random()} className="leading-relaxed">
              {children}
            </li>
          )
        case 'code':
          return (
            <code
              key={Math.random()}
              className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm"
            >
              {children}
            </code>
          )
        case 'pre':
          return (
            <pre
              key={Math.random()}
              className="mb-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-white"
            >
              {children}
            </pre>
          )
        case 'table':
          return (
            <div
              key={Math.random()}
              className="my-8 overflow-hidden rounded-lg border border-neutral-200 shadow"
            >
              <table className="min-w-full divide-y divide-neutral-200">
                {children}
              </table>
            </div>
          )
        case 'thead':
          return (
            <thead key={Math.random()} className="bg-neutral-50">
              {children}
            </thead>
          )
        case 'tbody':
          return (
            <tbody
              key={Math.random()}
              className="divide-y divide-neutral-200 bg-white"
            >
              {children}
            </tbody>
          )
        case 'tr':
          return (
            <tr key={Math.random()} className="transition hover:bg-neutral-50">
              {children}
            </tr>
          )
        case 'th':
          return (
            <th
              key={Math.random()}
              className="px-6 py-4 text-left text-sm font-semibold text-neutral-900"
            >
              {children}
            </th>
          )
        case 'td':
          return (
            <td
              key={Math.random()}
              className="whitespace-pre-wrap px-6 py-4 text-sm text-neutral-600"
            >
              {children}
            </td>
          )
        default:
          return children
      }
    }

    return null
  }

  return Array.from(doc.body.childNodes).map(renderNode)
}
