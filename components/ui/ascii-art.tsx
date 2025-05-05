"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface AsciiArtProps {
  className?: string
  text?: string
  art?: string
  animated?: boolean
  density?: string
  fontSize?: number
  color?: string
  backgroundColor?: string
  children?: React.ReactNode
  loading?: boolean
}

export function AsciiArt({
  className,
  text,
  art,
  animated = true,
  density = "@%#*+=-:. ",
  fontSize = 10,
  color,
  backgroundColor,
  children,
  loading = false,
}: AsciiArtProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [asciiText, setAsciiText] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const animationFrameId = useRef<number>(0)
  const frameCount = useRef<number>(0)
  const [loadingFrame, setLoadingFrame] = useState(0)

  // Loading animation frames
  const loadingFrames = loading
    ? [
        "[    ]",
        "[=   ]",
        "[==  ]",
        "[=== ]",
        "[====]",
        "[ ===]",
        "[  ==]",
        "[   =]",
        "[    ]",
        "[   =]",
        "[  ==]",
        "[ ===]",
        "[====]",
        "[=== ]",
        "[==  ]",
        "[=   ]",
      ]
    : []

  // Set up resize observer and initial dimensions
  useEffect(() => {
    setIsMounted(true)

    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()

    // Only use browser APIs on the client side
    if (typeof window !== "undefined") {
      const resizeObserver = new ResizeObserver(updateDimensions)
      resizeObserver.observe(containerRef.current)

      // Set up intersection observer to only animate when visible
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsVisible(entry.isIntersecting)
          })
        },
        { threshold: 0.1 },
      )

      intersectionObserver.observe(containerRef.current)

      return () => {
        if (containerRef.current) {
          resizeObserver.unobserve(containerRef.current)
          intersectionObserver.unobserve(containerRef.current)
        }
      }
    }
  }, [])

  // Loading animation
  useEffect(() => {
    if (!loading || loadingFrames.length === 0 || !isMounted) return

    const interval = setInterval(() => {
      setLoadingFrame((prev) => (prev + 1) % loadingFrames.length)
    }, 100)

    return () => clearInterval(interval)
  }, [loading, loadingFrames.length, isMounted])

  // Generate ASCII art from text or predefined art
  useEffect(() => {
    if (art) {
      setAsciiText(art.split("\n"))
      return
    }

    if (!text) return

    // Simple ASCII art generation for text
    const asciiHeader = []

    // Generate ASCII art for each character
    for (let i = 0; i < text.length; i++) {
      const char = text[i].toUpperCase()

      // Skip spaces
      if (char === " ") {
        asciiHeader.push("   ")
        continue
      }

      // Simple ASCII representation
      switch (char) {
        case "A":
          asciiHeader.push(" /\\ \n/--\\\n")
          break
        case "B":
          asciiHeader.push("|-\\ \n|_/ \n")
          break
        case "C":
          asciiHeader.push(" __\n/  \n\\__\n")
          break
        // Add more characters as needed
        default:
          asciiHeader.push(char + " ")
      }
    }

    setAsciiText(asciiHeader)
  }, [text, art])

  // Render ASCII art to canvas
  useEffect(() => {
    if (!isMounted || !canvasRef.current || dimensions.width === 0 || dimensions.height === 0 || !isVisible) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Set text properties
    ctx.font = `${fontSize}px monospace`
    ctx.textBaseline = "top"

    // Use theme-aware colors if not explicitly provided
    const textColor = color || (theme === "dark" ? "#ffffff" : "#000000")
    const bgColor = backgroundColor || (theme === "dark" ? "#000000" : "#ffffff")

    const renderFrame = () => {
      // Clear canvas
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw ASCII art
      ctx.fillStyle = textColor

      if (loading) {
        // Draw loading animation
        const loadingText = `Loading ${loadingFrames[loadingFrame]}`
        const textWidth = ctx.measureText(loadingText).width
        ctx.fillText(loadingText, (canvas.width - textWidth) / 2, canvas.height / 2 - fontSize / 2)
      } else if (art || text) {
        // Draw pre-generated ASCII art
        asciiText.forEach((line, i) => {
          ctx.fillText(line, 10, 10 + i * fontSize * 1.2)
        })
      } else if (children) {
        // Generate ASCII art from children (DOM elements)
        // This is a simplified version - a real implementation would be more complex
        const charWidth = fontSize * 0.6
        const charHeight = fontSize

        const cols = Math.floor(canvas.width / charWidth)
        const rows = Math.floor(canvas.height / charHeight)

        // Create a temporary canvas to render the children
        const tempCanvas = document.createElement("canvas")
        tempCanvas.width = canvas.width
        tempCanvas.height = canvas.height
        const tempCtx = tempCanvas.getContext("2d")
        if (!tempCtx) return

        // Render children to temporary canvas
        // This is a placeholder - in a real implementation, you'd need to render the DOM elements
        tempCtx.fillStyle = "#ffffff"
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)

        // Get image data
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height)
        const data = imageData.data

        // Convert to ASCII
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            // Sample pixel at this position
            const pixelX = Math.floor(x * charWidth)
            const pixelY = Math.floor(y * charHeight)
            const pixelIndex = (pixelY * tempCanvas.width + pixelX) * 4

            // Calculate brightness
            const r = data[pixelIndex]
            const g = data[pixelIndex + 1]
            const b = data[pixelIndex + 2]
            const brightness = (r + g + b) / 3 / 255

            // Map brightness to ASCII character
            const charIndex = Math.floor(brightness * (density.length - 1))
            const char = density[charIndex]

            // Draw character
            ctx.fillText(char, x * charWidth, y * charHeight)
          }
        }
      }

      // Add animation effects if enabled
      if (animated) {
        frameCount.current++

        // Random glitch effect
        if (frameCount.current % 30 === 0) {
          for (let i = 0; i < 5; i++) {
            const x = Math.random() * canvas.width
            const y = Math.random() * canvas.height
            const width = Math.random() * 100 + 50
            const height = Math.random() * 10 + 5

            ctx.fillStyle = Math.random() > 0.5 ? textColor : bgColor
            ctx.fillRect(x, y, width, height)
          }
        }

        // Continue animation only on client side
        if (typeof window !== "undefined") {
          animationFrameId.current = requestAnimationFrame(renderFrame)
        }
      }
    }

    renderFrame()

    return () => {
      if (typeof window !== "undefined") {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [
    dimensions,
    asciiText,
    animated,
    density,
    fontSize,
    color,
    backgroundColor,
    theme,
    isVisible,
    children,
    loading,
    loadingFrame,
    loadingFrames,
    isMounted,
  ])

  // Don't render the canvas until mounted on client
  if (!isMounted) {
    return <div ref={containerRef} className={cn("relative font-mono", className)}></div>
  }

  return (
    <div ref={containerRef} className={cn("relative font-mono", className)}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
