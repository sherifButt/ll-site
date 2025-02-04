import Link from 'next/link'
import clsx from 'clsx'

const variants = {
  solid: {
    default: 'bg-gray-950 text-white hover:bg-gray-700',
    invert: 'bg-white text-gray-950 hover:bg-gray-200',
  },
  outline: {
    default:
      'border text-gray-800 border-gray-200 bg-gray-50 hover:bg-gray-100 lg:inline-block',
    invert:
      'border text-white border-white bg-transparent hover:bg-white hover:text-gray-950',
  },
}

export function Button({
  variant = 'solid',
  invert = false,
  href,
  className,
  children,
  ...props
}) {
  className = clsx(
    className,
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition',
    variants[variant][invert ? 'invert' : 'default']
  )

  let inner = (
    <span className="relative top-px flex items-center">{children}</span>
  )

  if (href) {
    return (
      <Link href={href} className={className} {...props}>
        {inner}
      </Link>
    )
  }

  return (
    <button className={className} {...props}>
      {inner}
    </button>
  )
}
