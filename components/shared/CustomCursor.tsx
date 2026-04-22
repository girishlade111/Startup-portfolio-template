'use client'
import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  
  // Ring position for smooth lag (using ref, not state — avoids re-renders)
  const ringPos = useRef({ x: 0, y: 0 })
  const mousePos = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(null)

  useEffect(() => {
    // Don't render on touch devices or when reduced motion is preferred
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    
    // Hide default cursor
    document.body.style.cursor = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
      
      // Check if hovering over clickable element
      const target = e.target as Element
      const isClickable = target.closest('a, button, [role="button"], input, textarea, select, label')
      setIsPointer(!!isClickable)
    }

    // Ring animation loop (smooth lag via lerp)
    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.1
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.1
      
      if (ringRef.current) {
        const size = isPointer ? 48 : 32
        ringRef.current.style.transform = `translate(${ringPos.current.x - size/2}px, ${ringPos.current.y - size/2}px)`
      }
      
      rafId.current = requestAnimationFrame(animateRing)
    }
    
    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseEnter = () => setIsHidden(false)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    rafId.current = requestAnimationFrame(animateRing)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  // On touch devices, render nothing
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      {/* Dot — instant follow */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isPointer ? '6px' : '8px',
          height: isPointer ? '6px' : '8px',
          backgroundColor: '#D4AF37',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isHidden ? 0 : 1,
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
          willChange: 'transform',
        }}
      />
      {/* Ring — smooth lag follow */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isPointer ? '48px' : '32px',
          height: isPointer ? '48px' : '32px',
          border: `1.5px solid rgba(212, 175, 55, ${isPointer ? 0.9 : 0.5})`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: isHidden ? 0 : 1,
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, opacity 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  )
}
