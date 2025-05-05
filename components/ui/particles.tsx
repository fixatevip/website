"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  refresh?: boolean
}

export function Particles({ className, quantity = 50, staticity = 50, ease = 50, refresh = false }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const particles = useRef<Array<Particle>>([])
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const containerSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const [isInitialized, setIsInitialized] = useState(false)
  const { theme } = useTheme()

  const resizeObserver = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    if (canvasContainerRef.current) {
      containerSize.current.w = canvasContainerRef.current.offsetWidth
      containerSize.current.h = canvasContainerRef.current.offsetHeight
    }

    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d")
    }

    initCanvas()
    animate()
    window.addEventListener("mousemove", onMouseMove)

    resizeObserver.current = new ResizeObserver((entries) => {
      if (canvasContainerRef.current) {
        containerSize.current.w = canvasContainerRef.current.offsetWidth
        containerSize.current.h = canvasContainerRef.current.offsetHeight
        initCanvas()
      }
    })

    if (canvasContainerRef.current) {
      resizeObserver.current.observe(canvasContainerRef.current)
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      if (resizeObserver.current && canvasContainerRef.current) {
        resizeObserver.current.unobserve(canvasContainerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isInitialized && refresh) {
      initCanvas()
    }
  }, [refresh, isInitialized])

  useEffect(() => {
    if (isInitialized) {
      initCanvas()
    }
  }, [theme])

  class Particle {
    x: number
    y: number
    size: number
    vx: number
    vy: number
    color: string
    originalX: number
    originalY: number

    constructor() {
      this.x = 0
      this.y = 0
      this.size = Math.random() * 2 + 0.5
      this.vx = 0
      this.vy = 0
      this.color = theme === "dark" ? "#ffffff" : "#000000"
      this.originalX = 0
      this.originalY = 0
    }

    init() {
      this.x = Math.random() * containerSize.current.w
      this.y = Math.random() * containerSize.current.h
      this.originalX = this.x
      this.originalY = this.y
    }

    update() {
      const dx = mouse.current.x - this.x
      const dy = mouse.current.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const forceDirectionX = dx / distance
      const forceDirectionY = dy / distance
      const maxDistance = 100
      const force = (maxDistance - distance) / maxDistance

      if (distance < maxDistance && mouse.current.x !== 0) {
        this.vx = forceDirectionX * force * staticity
        this.vy = forceDirectionY * force * staticity
      } else {
        this.vx = (this.originalX - this.x) / ease
        this.vy = (this.originalY - this.y) / ease
      }

      this.x += this.vx
      this.y += this.vy
    }

    draw() {
      if (context.current) {
        context.current.beginPath()
        context.current.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.current.fillStyle = this.color
        context.current.fill()
      }
    }
  }

  const initCanvas = () => {
    particles.current = []
    if (canvasRef.current && context.current && canvasContainerRef.current) {
      canvasRef.current.width = containerSize.current.w
      canvasRef.current.height = containerSize.current.h

      for (let i = 0; i < quantity; i++) {
        const particle = new Particle()
        particle.init()
        particles.current.push(particle)
      }

      setIsInitialized(true)
    }
  }

  const animate = () => {
    if (context.current && canvasRef.current) {
      context.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      for (const particle of particles.current) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }
  }

  const onMouseMove = (e: MouseEvent) => {
    if (canvasContainerRef.current) {
      const rect = canvasContainerRef.current.getBoundingClientRect()
      mouse.current.x = e.clientX - rect.left
      mouse.current.y = e.clientY - rect.top
    }
  }

  return (
    <div ref={canvasContainerRef} className={cn("absolute inset-0", className)}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}
