"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

interface MobileLoadingProps {
  isLoading: boolean
}

export function MobileLoading({ isLoading }: MobileLoadingProps) {
  const [dots, setDots] = useState(".")
  const isMobile = useMobile()

  useEffect(() => {
    if (!isLoading) return

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [isLoading])

  if (!isMobile || !isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-pixel-alt text-lg">
          Loading<span className="font-mono">{dots}</span>
        </p>
      </div>
    </motion.div>
  )
}
