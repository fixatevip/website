"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface PixelatedBackgroundProps {
  className?: string
  pixelSize?: number
  density?: number
}

export function PixelatedBackground({ className, pixelSize = 8, density = 0.05 }: PixelatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const pixels = useRef<Array<Pixel>>([])
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const containerSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const [isInitialized, setIsInitialized] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()
  const animationFrameId = useRef<number>(0)
  const resizeObserver = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    setIsMounted(true)

    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth
      containerSize.current.h = containerRef.current.offsetHeight
    }

    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d")
    }

    initCanvas()
    animate()

    // Only add event listeners on the client side
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", onMouseMove)

      resizeObserver.current = new ResizeObserver((entries) => {
        if (containerRef.current) {
          containerSize.current.w = containerRef.current.offsetWidth
          containerSize.current.h = containerRef.current.offsetHeight
          initCanvas()
        }
      })

      if (containerRef.current) {
        resizeObserver.current.observe(containerRef.current)
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", onMouseMove)
        if (resizeObserver.current && containerRef.current) {
          resizeObserver.current.unobserve(containerRef.current)
        }
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [pixelSize, density])

  useEffect(() => {
    if (isInitialized) {
      initCanvas()
    }
  }, [theme, isInitialized])

  class Pixel {
    x: number
    y: number
    size: number
    color: string
    originalColor: string
    targetColor: string
    alpha: number
    targetAlpha: number
    glitchChance: number
    glitchTimer: number
    isGlitching: boolean

    constructor(x: number, y: number) {
      this.x = x
      this.y = y
      this.size = pixelSize
      this.originalColor = theme === "dark" ? "#ffffff" : "#000000"
      this.color = this.originalColor
      this.targetColor = this.originalColor
      this.alpha = Math.random() * 0.05
      this.targetAlpha = this.alpha
      this.glitchChance = Math.random() * 0.001
      this.glitchTimer = 0
      this.isGlitching = false
    }

    update() {
      // Distance from mouse
      const dx = mouse.current.x - this.x
      const dy = mouse.current.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDistance = 150

      // Update alpha based on mouse proximity
      if (distance < maxDistance && mouse.current.x !== 0) {
        this.targetAlpha = 0.8 - distance / maxDistance
      } else {
        this.targetAlpha = Math.random() * 0.05
      }

      // Smooth alpha transition
      this.alpha += (this.targetAlpha - this.alpha) * 0.1

      // Random glitch effect
      if (Math.random() < this.glitchChance) {
        this.isGlitching = true
        this.glitchTimer = Math.floor(Math.random() * 10) + 5
        this.targetColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`
      }

      if (this.isGlitching) {
        this.color = this.targetColor
        this.glitchTimer--
        if (this.glitchTimer <= 0) {
          this.isGlitching = false
          this.targetColor = this.originalColor
        }
      } else {
        this.color = this.originalColor
      }
    }

    draw() {
      if (context.current) {
        context.current.fillStyle = this.color
        context.current.globalAlpha = this.alpha
        context.current.fillRect(this.x, this.y, this.size, this.size)
      }
    }
  }

  const initCanvas = () => {
    pixels.current = []
    if (canvasRef.current && context.current && containerRef.current) {
      canvasRef.current.width = containerSize.current.w
      canvasRef.current.height = containerSize.current.h

      const cols = Math.ceil(containerSize.current.w / pixelSize)
      const rows = Math.ceil(containerSize.current.h / pixelSize)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (Math.random() < density) {
            pixels.current.push(new Pixel(x * pixelSize, y * pixelSize))
          }
        }
      }

      setIsInitialized(true)
    }
  }

  const animate = () => {
    if (context.current && canvasRef.current) {
      context.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      for (const pixel of pixels.current) {
        pixel.update()
        pixel.draw()
      }

      if (typeof window !== "undefined") {
        animationFrameId.current = requestAnimationFrame(animate)
      }
    }
  }

  const onMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      mouse.current.x = e.clientX - rect.left
      mouse.current.y = e.clientY - rect.top
    }
  }

  // Don't render anything until mounted on client
  if (!isMounted) {
    return <div className={cn("absolute inset-0 -z-10", className)} ref={containerRef}></div>
  }

  return (
    <div ref={containerRef} className={cn("absolute inset-0 -z-10", className)}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}
