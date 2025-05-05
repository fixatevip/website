"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface PixelShaderProps {
  className?: string
  children?: React.ReactNode
  pixelSize?: number
  intensity?: number
  animated?: boolean
  glitchAmount?: number
}

export function PixelShader({
  className,
  children,
  pixelSize = 4,
  intensity = 0.5,
  animated = true,
  glitchAmount = 0.2,
}: PixelShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const childrenRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const animationFrameId = useRef<number>(0)
  const time = useRef<number>(0)

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

    // Only use ResizeObserver on the client side
    if (typeof window !== "undefined") {
      const resizeObserver = new ResizeObserver(updateDimensions)
      resizeObserver.observe(containerRef.current)

      return () => {
        if (containerRef.current) {
          resizeObserver.unobserve(containerRef.current)
        }
      }
    }
  }, [])

  // Render the shader effect
  useEffect(() => {
    if (!isMounted || !canvasRef.current || !childrenRef.current || dimensions.width === 0 || dimensions.height === 0)
      return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Create an offscreen canvas to render the children
    const offscreenCanvas = document.createElement("canvas")
    offscreenCanvas.width = dimensions.width
    offscreenCanvas.height = dimensions.height
    const offscreenCtx = offscreenCanvas.getContext("2d")
    if (!offscreenCtx) return

    // Function to render a frame
    const renderFrame = () => {
      // Clear the offscreen canvas
      offscreenCtx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Draw the children to the offscreen canvas
      const childrenHTML = new XMLSerializer().serializeToString(childrenRef.current!)
      const DOMURL = window.URL || window.webkitURL || window
      const img = new Image()
      const svg = new Blob([childrenHTML], { type: "image/svg+xml;charset=utf-8" })
      const url = DOMURL.createObjectURL(svg)

      img.onload = () => {
        offscreenCtx.drawImage(img, 0, 0)
        DOMURL.revokeObjectURL(url)

        // Apply pixel effect
        ctx.clearRect(0, 0, dimensions.width, dimensions.height)

        // Get image data
        const imageData = offscreenCtx.getImageData(0, 0, dimensions.width, dimensions.height)
        const data = imageData.data

        // Create pixelated version
        for (let y = 0; y < dimensions.height; y += pixelSize) {
          for (let x = 0; x < dimensions.width; x += pixelSize) {
            const pixelIndex = (y * dimensions.width + x) * 4

            // Skip if out of bounds
            if (pixelIndex >= data.length) continue

            // Get pixel color
            const r = data[pixelIndex]
            const g = data[pixelIndex + 1]
            const b = data[pixelIndex + 2]
            const a = data[pixelIndex + 3]

            // Apply glitch effect
            let drawX = x
            const drawY = y
            const drawWidth = pixelSize
            const drawHeight = pixelSize

            if (animated && Math.random() < glitchAmount) {
              // Random glitch offset
              drawX += Math.floor(Math.random() * pixelSize * 2 - pixelSize)

              // Random color shift
              ctx.fillStyle = `rgba(
                ${Math.min(255, r + Math.floor(Math.random() * 50))},
                ${Math.min(255, g + Math.floor(Math.random() * 50))},
                ${Math.min(255, b + Math.floor(Math.random() * 50))},
                ${a / 255}
              )`
            } else {
              ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`
            }

            // Draw pixelated rectangle
            ctx.fillRect(drawX, drawY, drawWidth, drawHeight)
          }
        }

        // Continue animation
        if (animated && typeof window !== "undefined") {
          time.current += 0.01
          animationFrameId.current = requestAnimationFrame(renderFrame)
        }
      }

      img.crossOrigin = "anonymous" // Add this to avoid CORS issues
      img.src = url
    }

    // Only run the animation on the client side
    if (typeof window !== "undefined") {
      renderFrame()
    }

    return () => {
      if (typeof window !== "undefined") {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [dimensions, pixelSize, intensity, animated, glitchAmount, theme, isMounted])

  // Don't render the full component until mounted on client
  if (!isMounted) {
    return (
      <div ref={containerRef} className={cn("relative", className)}>
        <div className="relative z-0">{children}</div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none" />
      <div ref={childrenRef} className="invisible absolute top-0 left-0 w-full h-full">
        {children}
      </div>
      <div className="relative z-0">{children}</div>
    </div>
  )
}
