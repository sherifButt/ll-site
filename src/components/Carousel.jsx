'use client'
import { useState, useEffect, useCallback } from 'react'
import { Children } from 'react'

export function Carousel({ children, interval = 5000, autoPlay = true }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [isHovered, setIsHovered] = useState(false)

  const minSwipeDistance = 50
  const childrenArray = Children.toArray(children)
  const hasMultipleChildren = childrenArray.length > 1

  const nextSlide = useCallback(() => {
    if (!hasMultipleChildren) return
    setCurrentIndex((prevIndex) =>
      prevIndex === childrenArray.length - 1 ? 0 : prevIndex + 1
    )
  }, [childrenArray.length, hasMultipleChildren])

  const prevSlide = useCallback(() => {
    if (!hasMultipleChildren) return
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? childrenArray.length - 1 : prevIndex - 1
    )
  }, [childrenArray.length, hasMultipleChildren])

  useEffect(() => {
    if (!autoPlay || isHovered || !hasMultipleChildren) return

    const timer = setInterval(() => {
      nextSlide()
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, nextSlide, isHovered, hasMultipleChildren])

  const onTouchStart = (e) => {
    if (!hasMultipleChildren) return
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    if (!hasMultipleChildren) return
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!hasMultipleChildren) return
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  // If there's only one child, render it directly without the carousel wrapper
  if (!hasMultipleChildren) {
    return (
      <div className="relative h-full w-full overflow-hidden">
        {childrenArray[0]}
      </div>
    )
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {childrenArray.map((child, index) => (
          <div
            key={index}
            className="h-full w-full flex-shrink-0"
            style={{ scrollSnapAlign: 'start' }}
          >
            {child}
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform gap-2">
        {childrenArray.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
