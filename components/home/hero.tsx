"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimate, stagger } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PixelText } from "@/components/ui/pixel-text"
import { PixelShader } from "@/components/ui/pixel-shader"
import { useTheme } from "next-themes"
import { useMobile } from "@/hooks/use-mobile"

export default function Hero() {
  const { theme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const [scope, animate] = useAnimate()
  const [isMounted, setIsMounted] = useState(false)
  const isMobile = useMobile()

  const scrollToNextSection = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    setIsMounted(true)

    animate("h1", { opacity: [0, 1], y: [20, 0] }, { duration: 0.8, delay: 0.2 })
    animate(".pixel-char", { opacity: [0, 1], scale: [0.8, 1] }, { duration: 0.4, delay: stagger(0.05) })
    animate(
      ".hero-content > *",
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.6, delay: stagger(0.2, { startDelay: 0.8 }) },
    )
  }, [animate])

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      <PixelShader className="absolute inset-0 -z-5" pixelSize={isMobile ? 6 : 8} intensity={0.7} glitchAmount={0.1}>
        <div className="w-full h-full bg-primary/5 flex items-center justify-center">
          <div className="text-[120px] md:text-[200px] font-pixel-alt opacity-10">FIX</div>
        </div>
      </PixelShader>

      <div ref={scope} className="container mx-auto px-4 text-center hero-content z-10">
        <motion.div className="mb-4 md:mb-6">
          <PixelText className="text-xs sm:text-sm md:text-base font-pixel-alt text-primary tracking-[0.3em] md:tracking-[0.5em]">
            INDIE GAME STUDIO
          </PixelText>
        </motion.div>

        <h1 className="sr-only">FIXATE.VIP</h1>
        <div className="flex justify-center items-center mb-6 md:mb-8 overflow-hidden">
          {["F", "I", "X", "A", "T", "E", ".", "V", "I", "P"].map((char, index) => (
            <motion.div
              key={index}
              className="pixel-char inline-block text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-pixel-alt tracking-widest"
              style={{ opacity: 0 }}
            >
              {char}
            </motion.div>
          ))}
        </div>

        <motion.p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 md:mb-12 font-pixel px-2">
          Creating immersive pixel worlds and retro-inspired gaming experiences
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size={isMobile ? "default" : "lg"} asChild className="font-pixel-alt w-full sm:w-auto">
            <a href="/projects">OUR GAMES</a>
          </Button>
          <Button
            size={isMobile ? "default" : "lg"}
            variant="outline"
            asChild
            className="font-pixel-alt w-full sm:w-auto"
          >
            <a href="/team">MEET THE TEAM</a>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-8"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollToNextSection}
          className="animate-bounce h-12 w-12"
          aria-label="Scroll down"
        >
          <ArrowDown size={24} />
        </Button>
      </motion.div>

      {/* Animated pixel grid in background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {isMounted &&
          Array.from({ length: isMobile ? 5 : 10 }).map((_, i) => {
            // Safe access to window
            const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1000
            const windowHeight = typeof window !== "undefined" ? window.innerHeight : 800

            return (
              <motion.div
                key={i}
                className="absolute w-3 h-3 md:w-4 md:h-4 bg-primary/20"
                initial={{
                  x: Math.random() * windowWidth,
                  y: Math.random() * windowHeight,
                  opacity: 0,
                }}
                animate={{
                  x: Math.random() * windowWidth,
                  y: Math.random() * windowHeight,
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "linear",
                  delay: Math.random() * 5,
                }}
              />
            )
          })}
      </div>
    </section>
  )
}
