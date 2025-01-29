"use client"
import { useState, useEffect, useCallback } from 'react'

export function Carousel({ children, interval = 5000, autoPlay = true }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  
  const minSwipeDistance = 50

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === children.length - 1 ? 0 : prevIndex + 1
    )
  }, [children.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    )
  }, [children.length])

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      nextSlide()
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, nextSlide])

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
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

  return (
    <div 
      className="relative overflow-hidden w-full h-full"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full"
            style={{ scrollSnapAlign: 'start' }}
          >
            {child}
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {children.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}