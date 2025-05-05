"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface AsciiLoaderProps {
  text?: string
  speed?: number
}

export function AsciiLoader({ text = "LOADING", speed = 1 }: AsciiLoaderProps) {
  const [frame, setFrame] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()
  const textColor = theme === "dark" ? "#ffffff" : "#000000"

  // Set mounted state
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // ASCII art frames for loading animation
  const loadingFrames = [
    `
    ╔════════════════════════════╗
    ║                            ║
    ║         ${text}...         ║
    ║         [        ]         ║
    ║                            ║
    ╚════════════════════════════╝
    `,
    `
    ╔════════════════════════════╗
    ║                            ║
    ║         ${text}...         ║
    ║         [█       ]         ║
    ║                            ║
    ╚════════════════════════════╝
    `,
    `
    ╔════════════════════════════╗
    ║                            ║
    ║         ${text}...         ║
    ║         [██      ]         ║
    ║                            ║
    ╚════════════════════════════╝
    `,
    `
    ╔════════════════════════════╗
    ║                            ║
    ║         ${text}...         ║
    ║         [███     ]         ║
    ║                            ║
    ╚════════════════════════════╝
    `,
    `
    ╔════════════════════════════╗
    ║                            ║
    ║         ${text}...         ║
    ║         [████    ]         ║
    ║                            ║
    ╚════════════════════════════╝
    `,
    `
    ╔════════════════════════════╗
    ║                            ║
    ║         ${text}...         ║
    ║         [█████   ]         ║
    ║                            ║
    ╚════════════════════════════╝
    `,
    `
    ╔════════════════════════════╗
    ║                            ║
    ║         ${text}...         ║
    ║         [██████  ]         ║
    ║                            ║
    ╚════════════════════════════╝
    `,
    `
    ╔════════════════════════════╗
    ║                            ║
    ║         ${text}...         ║
    ║         [███████ ]         ║
    ║                            ║
    ╚════════════════════════════╝
    `,
    `
    ╔════════════════════════════╗
    ║                            ║
    ║         ${text}...         ║
    ║         [████████]         ║
    ║                            ║
    ╚════════════════════════════╝
    `,
  ]

  // ASCII art for computer/terminal
  const computerArt = `
    ┌───────────────────────────┐
    │ ┌─────────────────────┐   │
    │ │                     │   │
    │ │      FIXATE.VIP     │   │
    │ │                     │   │
    │ └─────────────────────┘   │
    │   ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐    │
    │   │ │ │ │ │ │ │ │ │ │    │
    │   └─┘ └─┘ └─┘ └─┘ └─┘    │
    └───────────────────────────┘
       ║                   ║
       ╚═══════════════════╝
  `

  // Glitch frames for the computer
  const glitchComputerFrames = [
    computerArt,
    computerArt.replace(/─/g, "═").replace(/│/g, "║"),
    computerArt.replace(/┌/g, "╔").replace(/┐/g, "╗").replace(/└/g, "╚").replace(/┘/g, "╝"),
    computerArt,
  ]

  // Random ASCII patterns for background
  const generateRandomPattern = () => {
    if (typeof window === "undefined") return ""

    const chars = "░▒▓█▄▀■□●○"
    let pattern = ""
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 40; j++) {
        pattern += chars[Math.floor(Math.random() * chars.length)]
      }
      pattern += "\n"
    }
    return pattern
  }

  const [randomPattern, setRandomPattern] = useState("")
  const [computerFrame, setComputerFrame] = useState(0)

  // Initialize patterns when mounted
  useEffect(() => {
    if (isMounted) {
      setRandomPattern(generateRandomPattern())
    }
  }, [isMounted])

  useEffect(() => {
    if (!isMounted) return

    // Animate loading bar
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % loadingFrames.length)
    }, 150 / speed)

    // Animate computer glitch occasionally
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setComputerFrame((prev) => (prev + 1) % glitchComputerFrames.length)
      }
    }, 300)

    // Change random pattern periodically
    const patternInterval = setInterval(() => {
      setRandomPattern(generateRandomPattern())
    }, 500)

    return () => {
      clearInterval(interval)
      clearInterval(glitchInterval)
      clearInterval(patternInterval)
    }
  }, [speed, loadingFrames.length, isMounted])

  // Don't render until mounted on client
  if (!isMounted) {
    return <div className="flex flex-col items-center justify-center h-full"></div>
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {/* Random background pattern */}
        <motion.pre
          className="absolute top-[-50px] left-[-100px] text-[8px] md:text-xs opacity-20 pointer-events-none"
          style={{ color: textColor }}
        >
          {randomPattern}
        </motion.pre>

        {/* Computer ASCII art */}
        <motion.pre
          className="text-xs md:text-sm lg:text-base font-mono mb-6"
          style={{ color: textColor }}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          {glitchComputerFrames[computerFrame]}
        </motion.pre>

        {/* Loading bar */}
        <motion.pre
          className="text-xs md:text-sm lg:text-base font-mono"
          style={{ color: textColor }}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          {loadingFrames[frame]}
        </motion.pre>

        {/* Random background pattern (bottom) */}
        <motion.pre
          className="absolute bottom-[-50px] right-[-100px] text-[8px] md:text-xs opacity-20 pointer-events-none"
          style={{ color: textColor }}
        >
          {randomPattern}
        </motion.pre>
      </motion.div>
    </div>
  )
}
