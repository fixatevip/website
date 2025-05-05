"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, useAnimate } from "framer-motion"
import { cn } from "@/lib/utils"

interface PixelTextProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
  glitchEffect?: boolean
  pixelSize?: number
}

export function PixelText({
  children,
  className,
  hoverEffect = true,
  glitchEffect = true,
  pixelSize = 2,
}: PixelTextProps) {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const originalText = useRef<string>("")
  const [scope, animate] = useAnimate()
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    if (containerRef.current) {
      originalText.current = containerRef.current.textContent || ""
    }

    // Random glitch effect
    if (glitchEffect) {
      const glitchInterval = setInterval(() => {
        const shouldGlitch = Math.random() < 0.1
        if (shouldGlitch) {
          setGlitching(true)
          setTimeout(() => setGlitching(false), Math.random() * 200 + 50)
        }
      }, 2000)

      return () => clearInterval(glitchInterval)
    }
  }, [children, glitchEffect])

  const handleMouseEnter = () => {
    if (hoverEffect) {
      setIsHovered(true)
      animate(scope.current, { scale: [1, 1.05, 1.02] }, { duration: 0.3, ease: "easeOut" })
    }
  }

  const handleMouseLeave = () => {
    if (hoverEffect) {
      setIsHovered(false)
      animate(scope.current, { scale: 1 }, { duration: 0.2, ease: "easeIn" })
    }
  }

  const getGlitchText = () => {
    const text = String(children)
    return text
      .split("")
      .map((char) => (Math.random() < 0.3 ? String.fromCharCode(Math.floor(Math.random() * 26) + 97) : char))
      .join("")
  }

  return (
    <motion.div
      ref={scope}
      className={cn("relative inline-block font-pixel tracking-wider", glitching && "text-primary", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-text={children}
    >
      {glitching ? getGlitchText() : children}

      {isHovered && (
        <motion.div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute"
              initial={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              animate={{
                opacity: 0,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.02,
              }}
              style={{
                fontSize: `${Math.random() * 0.5 + 0.5}em`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${pixelSize}px`,
                height: `${pixelSize}px`,
                backgroundColor: "currentColor",
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
