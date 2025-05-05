"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface AsciiBannerProps {
  text: string
  className?: string
  animated?: boolean
  speed?: number
  color?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function AsciiBanner({ text, className, animated = true, speed = 1, color, size = "md" }: AsciiBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [asciiFrames, setAsciiFrames] = useState<string[]>([])
  const [currentFrame, setCurrentFrame] = useState(0)
  const { theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const animationInterval = useRef<NodeJS.Timeout | null>(null)

  // Determine font size based on size prop
  const getFontSize = () => {
    switch (size) {
      case "sm":
        return "text-xs md:text-sm"
      case "md":
        return "text-sm md:text-base"
      case "lg":
        return "text-base md:text-xl"
      case "xl":
        return "text-xl md:text-3xl"
      default:
        return "text-sm md:text-base"
    }
  }

  // Set mounted state
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Generate ASCII art frames
  useEffect(() => {
    if (!text) return

    // Convert text to uppercase
    const upperText = text.toUpperCase()

    // ASCII art for each letter - using larger blocks for better visibility
    const asciiLetters: Record<string, string[]> = {
      A: ["   ███   ", "  █████  ", " ███ ███ ", "█████████", "███   ███"],
      B: ["████████ ", "███   ███", "████████ ", "███   ███", "████████ "],
      C: [" ████████", "███      ", "███      ", "███      ", " ████████"],
      D: ["████████ ", "███   ███", "███   ███", "███   ███", "████████ "],
      E: ["█████████", "███      ", "████████ ", "███      ", "█████████"],
      F: ["█████████", "███      ", "████████ ", "███      ", "███      "],
      G: [" ████████", "███      ", "███  ████", "███   ███", " ████████"],
      H: ["███   ███", "███   ███", "█████████", "███   ███", "███   ███"],
      I: ["█████████", "   ███   ", "   ███   ", "   ███   ", "█████████"],
      J: ["█████████", "     ███ ", "     ███ ", "███   ███", " ███████ "],
      K: ["███   ███", "███  ███ ", "███████  ", "███  ███ ", "███   ███"],
      L: ["███      ", "███      ", "███      ", "███      ", "█████████"],
      M: ["███   ███", "████ ████", "███ █ ███", "███   ███", "███   ███"],
      N: ["███   ███", "████  ███", "███ █ ███", "███  ████", "███   ███"],
      O: [" ███████ ", "███   ███", "███   ███", "███   ███", " ███████ "],
      P: ["████████ ", "███   ███", "████████ ", "███      ", "███      "],
      Q: [" ███████ ", "███   ███", "███   ███", "███  ████", " ████████"],
      R: ["████████ ", "███   ███", "████████ ", "███  ███ ", "███   ███"],
      S: [" ████████", "███      ", " ███████ ", "      ███", "████████ "],
      T: ["█████████", "   ███   ", "   ███   ", "   ███   ", "   ███   "],
      U: ["███   ███", "███   ███", "███   ███", "███   ███", " ███████ "],
      V: ["███   ███", "███   ███", " ███ ███ ", "  █████  ", "   ███   "],
      W: ["███   ███", "███   ███", "███ █ ███", "████ ████", "███   ███"],
      X: ["███   ███", " ███ ███ ", "  █████  ", " ███ ███ ", "███   ███"],
      Y: ["███   ███", " ███ ███ ", "  █████  ", "   ███   ", "   ███   "],
      Z: ["█████████", "     ███ ", "   ███   ", " ███     ", "█████████"],
      " ": ["         ", "         ", "         ", "         ", "         "],
      ".": ["         ", "         ", "         ", "         ", "   ███   "],
      ",": ["         ", "         ", "         ", "   ███   ", "  ███    "],
      "!": ["   ███   ", "   ███   ", "   ███   ", "         ", "   ███   "],
      "?": [" ███████ ", "███   ███", "     ███ ", "         ", "   ███   "],
      "0": [" ███████ ", "███   ███", "███   ███", "███   ███", " ███████ "],
      "1": ["   ███   ", "  ████   ", "   ███   ", "   ███   ", " ███████ "],
      "2": [" ███████ ", "███   ███", "    ████ ", "  ███    ", "█████████"],
      "3": ["████████ ", "      ███", "   ████  ", "      ███", "████████ "],
      "4": ["███  ███ ", "███  ███ ", "█████████", "     ███ ", "     ███ "],
      "5": ["█████████", "███      ", "████████ ", "      ███", "████████ "],
      "6": [" ███████ ", "███      ", "████████ ", "███   ███", " ███████ "],
      "7": ["█████████", "      ███", "     ███ ", "   ███   ", "  ███    "],
      "8": [" ███████ ", "███   ███", " ███████ ", "███   ███", " ███████ "],
      "9": [" ███████ ", "███   ███", " ████████", "      ███", " ███████ "],
      "-": ["         ", "         ", "█████████", "         ", "         "],
      _: ["         ", "         ", "         ", "         ", "█████████"],
      "+": ["         ", "   ███   ", "█████████", "   ███   ", "         "],
      "=": ["         ", "█████████", "         ", "█████████", "         "],
      "/": ["      ███", "     ███ ", "   ███   ", "  ███    ", "███      "],
      "\\": ["███      ", "  ███    ", "   ███   ", "     ███ ", "      ███"],
      "|": ["   ███   ", "   ███   ", "   ███   ", "   ███   ", "   ███   "],
      ":": ["         ", "   ███   ", "         ", "   ███   ", "         "],
      ";": ["         ", "   ███   ", "         ", "   ███   ", "  ███    "],
      "'": ["   ███   ", "   ███   ", "         ", "         ", "         "],
      '"': ["  ███ ███", "  ███ ███", "         ", "         ", "         "],
      "(": ["    ███  ", "   ███   ", "   ███   ", "   ███   ", "    ███  "],
      ")": ["  ███    ", "   ███   ", "   ███   ", "   ███   ", "  ███    "],
      "[": ["   ████  ", "   ███   ", "   ███   ", "   ███   ", "   ████  "],
      "]": ["  ████   ", "   ███   ", "   ███   ", "   ███   ", "  ████   "],
      "{": ["    ████ ", "   ███   ", "  ████   ", "   ███   ", "    ████ "],
      "}": [" ████    ", "   ███   ", "   ████  ", "   ███   ", " ████    "],
      "<": ["    ███  ", "   ███   ", "  ███    ", "   ███   ", "    ███  "],
      ">": ["  ███    ", "   ███   ", "    ███  ", "   ███   ", "  ███    "],
      "^": ["   ███   ", "  ███ ███", "         ", "         ", "         "],
      "*": ["  ███ ███", "   █████ ", "█████████", "   █████ ", "  ███ ███"],
      "&": ["  ████   ", "███  ███ ", "  ████   ", "███  ███ ", "  ████ ██"],
      $: ["   ███   ", "  ██████ ", "███ ███  ", "  ██████ ", "   ███   "],
      "#": ["  ███ ███", "█████████", "  ███ ███", "█████████", "  ███ ███"],
      "@": ["  ██████ ", "███ █ ███", "███ █████", "███      ", "  ███████"],
      "%": ["███   ███", "███  ███ ", "   ███   ", "  ███  ██", "███   ███"],
      "~": ["         ", "  ███    ", "███ █ ███", "    ███  ", "         "],
      "`": ["  ███    ", "   ███   ", "         ", "         ", "         "],
    }

    // Function to create a frame for a single character
    const createCharFrame = (char: string): string[] => {
      return asciiLetters[char] || asciiLetters[" "] // Use space if character is not found
    }

    // Function to combine character frames into a single banner frame
    const combineFrames = (frames: string[][]): string => {
      const combined: string[] = ["", "", "", "", ""]

      for (const frame of frames) {
        if (!frame) continue // Skip undefined frames

        for (let i = 0; i < 5; i++) {
          // Make sure frame[i] exists, otherwise use empty string
          combined[i] += (frame[i] || "         ") + " "
        }
      }

      return combined.join("\n")
    }

    // Generate frames for the entire text
    const generateFrames = () => {
      const characters = upperText.split("")
      const charFrames = characters.map((char) => {
        // Use the character's ASCII art if available, otherwise use space
        return asciiLetters[char] || asciiLetters[" "]
      })

      // Combine all character frames into a single frame
      const baseFrame = combineFrames(charFrames)

      // Create animation frames if animated is true
      const frames = [baseFrame]

      if (animated) {
        // Add glitch effect frames
        const glitchFrame1 = baseFrame.replace(/█/g, (match) => (Math.random() > 0.7 ? "▓" : match))
        const glitchFrame2 = baseFrame.replace(/█/g, (match) => (Math.random() > 0.7 ? "▒" : match))
        const glitchFrame3 = baseFrame.replace(/█/g, (match) => (Math.random() > 0.7 ? "░" : match))

        frames.push(glitchFrame1, glitchFrame2, glitchFrame3, baseFrame)
      }

      setAsciiFrames(frames)
    }

    generateFrames()
  }, [text, animated])

  // Animation effect
  useEffect(() => {
    if (!isMounted || !animated || asciiFrames.length === 0) return

    animationInterval.current = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % asciiFrames.length)
    }, 200 / speed) // Adjust speed as needed

    return () => {
      if (animationInterval.current) {
        clearInterval(animationInterval.current)
      }
    }
  }, [animated, asciiFrames, speed, isMounted])

  const textColorClass = color ? `text-${color}` : theme === "dark" ? "text-white" : "text-black"

  // Don't render until mounted on client
  if (!isMounted) {
    return <div className={cn(className, "overflow-hidden whitespace-pre")}></div>
  }

  return (
    <div ref={containerRef} className={cn(className, "overflow-hidden whitespace-pre")}>
      <motion.pre
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(getFontSize(), textColorClass, "font-mono leading-none")}
        style={{ fontFamily: "monospace" }}
      >
        {asciiFrames[currentFrame] || ""}
      </motion.pre>
    </div>
  )
}
