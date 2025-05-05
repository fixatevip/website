"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Ensure component is mounted before accessing theme to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Toggle between light and dark themes
  const toggleTheme = () => {
    console.log("Current theme:", theme)
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Show a loading state before mounting to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-10 h-10">
        <span className="sr-only">Toggle theme</span>
        <div className="w-5 h-5 bg-foreground/20 animate-pulse" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Toggle theme"
      className="relative w-10 h-10 overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {theme === "light" ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative">
              <Sun className="h-5 w-5" />
              {isHovered && (
                <div className="absolute inset-0 grid grid-cols-5 grid-rows-5">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="bg-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: Math.random() }}
                      transition={{
                        duration: 0.2,
                        repeat: 3,
                        repeatType: "reverse",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative">
              <Moon className="h-5 w-5" />
              {isHovered && (
                <div className="absolute inset-0 grid grid-cols-5 grid-rows-5">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="bg-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: Math.random() }}
                      transition={{
                        duration: 0.2,
                        repeat: 3,
                        repeatType: "reverse",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  )
}
