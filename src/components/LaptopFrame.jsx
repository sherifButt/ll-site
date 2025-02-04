import React from 'react'
import clsx from 'clsx'

function PlaceholderFrame(props) {
  return (
    <svg
      width="603"
      height="429"
      viewBox="0 0 603 429"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 405H603V418C603 424.075 598.075 429 592 429H11C4.92487 429 0 424.075 0 418V405Z"
        fill="#EBEBEB"
      />
      <path
        d="M1 405H602V417C602 423.075 597.075 428 591 428H12C5.92489 428 1 423.075 1 417V405Z"
        fill="#F2F2F2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 0C9.84974 0 0 9.84973 0 22V395L5.03349 395V23.0255C5.03349 13.0844 13.0924 5.02551 23.0335 5.02551H580.967C590.355 5.02551 597.967 12.6367 597.967 22.0255V395L603 395V22C603 9.84974 593.15 0 581 0H22Z"
        fill="#EBEBEB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 1C10.8497 1 1 10.8497 1 23V395L6.01689 395V24.0128C6.01689 14.0717 14.0758 6.01282 24.0169 6.01282H579.984C589.372 6.01282 596.984 13.624 596.984 23.0128V395L602 395V23C602 10.8497 592.15 1 580 1H23Z"
        fill="#F2F2F2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 2C11.8497 2 2 11.8497 2 24V395H7V25C7 15.0589 15.0589 7 25 7H579C588.389 7 596 14.6112 596 24V395H601V24C601 11.8497 591.15 2 579 2H24Z"
        fill="#F8F7F7"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25 7C15.0589 7 7 15.0589 7 25V395H596V24C596 14.6112 588.389 7 579 7H25ZM25 13C18.3726 13 13 18.3726 13 25V389H590V25C590 18.3726 584.627 13 578 13H345.52C341.367 13 338 16.3668 338 20.52C338 24.6732 334.633 28.04 330.48 28.04H273.02C268.867 28.04 265.5 24.6732 265.5 20.52C265.5 16.3668 262.133 13 257.98 13H25Z"
        fill="#EBEBEB"
      />
      <circle cx="302" cy="17" r="4" fill="#D1D1D1" />
      <circle cx="302" cy="17" r="3" fill="#C3C3C3" />
      <circle cx="302" cy="17" r="3" fill="#C3C3C3" />
      <circle cx="302" cy="17" r="3" fill="#C3C3C3" />
      <circle cx="302" cy="17" r="2" fill="#B4B4B4" />
      <path
        d="M2 405H601V416C601 422.075 596.075 427 590 427H13C6.92488 427 2 422.075 2 416V405Z"
        fill="#F8F7F7"
      />
      <rect y="395" width="603" height="10" fill="#F3F3F3" />
    </svg>
  )
}

export function LaptopFrame({
  className,
  children,
  priority = false,
  bgColor = 'bg-gray-900',
  ...props
}) {
  return (
    <div className={clsx('relative aspect-[597/315] px-4  ', className)} {...props}>
      {/* Shadow effect */}
      <div className="absolute inset-y-[2%] left-[1%] right-[1%] rounded-xl shadow-2xl" />

      {/* Content container */}
      <div
        className={clsx(
          'absolute left-[2.1%] top-[5%]',
          'h-[84%] w-[95.8%]',
          'grid transform grid-cols-1 overflow-hidden',
          'pointer-events-auto',
          bgColor
        )}
      >
        <div className="min-h-screen w-full overflow-x-hidden bg-gray-50">
          <div className="w-ful h-6 bg-white"></div>
          <div
            className="origin-top-left transform"
            style={{
              transform: 'scale(0.75)',
              width: '133.33%',
              height: '133.33%',
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Frame overlay */}
      <PlaceholderFrame className="pointer-events-none absolute inset-0 h-full w-full fill-gray-100" />
    </div>
  )
}
