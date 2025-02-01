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
  initialAnimation = true,
}) => {
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const containerRef = useRef(null)
  const timeoutRef = useRef(null)

  const childrenArray = Children.toArray(children)
  const hasMultipleChildren = childrenArray.length > 1
  const animationDuration = 0.5 * shuffleIntensity

  useEffect(() => {
    setMounted(true)
    if (initialAnimation) {
      setIsFirstRender(false)
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [initialAnimation])

  const slideVariants = {
    enter: {
      y: '100%',
      transition: {
        duration: 0,
      },
    },
    animate: {
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        mass: 0.5,
        duration: animationDuration,
        delay: animationDuration * 0.8, // Delay entrance until exit completes
      },
    },
    exit: {
      y: '110%',
      transition: {
        duration: animationDuration * 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const nextSlide = useCallback(() => {
    if (!hasMultipleChildren || !mounted || isExiting) return

    setIsExiting(true)

    // Wait for exit animation to complete before showing next slide
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === childrenArray.length - 1 ? 0 : prev + 1
      )
      setIsExiting(false)
    }, animationDuration * 800) // Match exit animation duration

    setIsFirstRender(false)
  }, [
    childrenArray.length,
    hasMultipleChildren,
    mounted,
    animationDuration,
    isExiting,
  ])

  const handleDotClick = (index) => {
    if (isExiting) return
    setIsExiting(true)

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex(index)
      setIsExiting(false)
    }, animationDuration * 800)

    setIsFirstRender(false)
  }

  useEffect(() => {
    if (!autoPlay || isHovered || !hasMultipleChildren || !mounted || isExiting)
      return
    const timer = setInterval(nextSlide, interval)
    return () => clearInterval(timer)
  }, [
    autoPlay,
    interval,
    nextSlide,
    isHovered,
    hasMultipleChildren,
    mounted,
    isExiting,
  ])

  if (!hasMultipleChildren) {
    return (
      <div className={`relative h-full w-full ${className}`}>
        {childrenArray[0]}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full  ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          variants={slideVariants}
          initial={isFirstRender && !initialAnimation ? false : 'enter'}
          animate="animate"
          exit="exit"
          className="absolute inset-0"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            willChange: 'transform',
          }}
        >
          {childrenArray[currentIndex]}
        </motion.div>
      </AnimatePresence>

      {hasMultipleChildren && (
        <div className="absolute right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2">
          {childrenArray.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              } ${isExiting ? 'pointer-events-none' : ''}`}
              onClick={() => handleDotClick(index)}
              disabled={isExiting}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default VerticalShuffle