'use client'
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Children,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VerticalShuffle = ({
  children,
  interval = 5000,
  autoPlay = true,
  shuffleIntensity = 1,
  className = '',
}) => {
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [direction, setDirection] = useState(1) // 1 for down, -1 for up
  const containerRef = useRef(null)

  const childrenArray = Children.toArray(children)
  const hasMultipleChildren = childrenArray.length > 1
  const animationDuration = 0.5 * shuffleIntensity

  useEffect(() => {
    setMounted(true)
  }, [])

  const slideVariants = {
    enter: (direction) => ({
      y: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: animationDuration,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: (direction) => ({
      y: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        duration: animationDuration,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  }

  const nextSlide = useCallback(() => {
    if (!hasMultipleChildren || !mounted) return
    setDirection(1)
    setCurrentIndex((prev) =>
      prev === childrenArray.length - 1 ? 0 : prev + 1
    )
  }, [childrenArray.length, hasMultipleChildren, mounted])

  const prevSlide = useCallback(() => {
    if (!hasMultipleChildren || !mounted) return
    setDirection(-1)
    setCurrentIndex((prev) =>
      prev === 0 ? childrenArray.length - 1 : prev - 1
    )
  }, [childrenArray.length, hasMultipleChildren, mounted])

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (!autoPlay || isHovered || !hasMultipleChildren || !mounted) return
    const timer = setInterval(nextSlide, interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, nextSlide, isHovered, hasMultipleChildren, mounted])

  if (!hasMultipleChildren) {
    return (
      <div className={`relative block h-full w-full ${className}`}>
        {childrenArray[0]}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative block h-full w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full w-full">
        <AnimatePresence initial={false} custom={direction} mode="crossfade">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 h-full w-full"
          >
            {childrenArray[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {hasMultipleChildren && (
        <div className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2">
          {childrenArray.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default VerticalShuffle