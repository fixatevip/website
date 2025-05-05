"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function PixelCursor() {
  const [visible, setVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleMouseEnter = () => setVisible(true)
    const handleMouseLeave = () => setVisible(false)

    window.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [cursorX, cursorY])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 z-50 pointer-events-none mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: visible ? 1 : 0,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="4" height="4" fill="white" />
          <rect x="4" y="0" width="4" height="4" fill="white" />
          <rect x="8" y="0" width="4" height="4" fill="white" />
          <rect x="0" y="4" width="4" height="4" fill="white" />
          <rect x="8" y="4" width="4" height="4" fill="white" />
          <rect x="0" y="8" width="4" height="4" fill="white" />
          <rect x="4" y="8" width="4" height="4" fill="white" />
          <rect x="8" y="8" width="4" height="4" fill="white" />
        </svg>
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 z-50 pointer-events-none mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: visible ? 0.5 : 0,
        }}
        transition={{ delay: 0.1 }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="4" height="4" fill="white" />
          <rect x="4" y="4" width="4" height="4" fill="white" />
          <rect x="8" y="8" width="4" height="4" fill="white" />
          <rect x="12" y="12" width="4" height="4" fill="white" />
        </svg>
      </motion.div>
    </>
  )
}
