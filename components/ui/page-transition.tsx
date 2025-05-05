"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { AsciiLoader } from "@/components/ui/ascii-loader"
import { MobileLoading } from "@/components/ui/mobile-loading"
import { useMobile } from "@/hooks/use-mobile"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState("LOADING")
  const [key, setKey] = useState(pathname)
  const isMobile = useMobile()

  // Generate a loading text based on the current path
  const generateLoadingText = (path: string) => {
    const pathSegment = path.split("/")[1]
    if (!pathSegment) return "LOADING HOME"
    return `LOADING ${pathSegment.toUpperCase()}`
  }

  useEffect(() => {
    // Only show loading on client-side navigation
    if (pathname !== key) {
      setIsLoading(true)
      setLoadingText(generateLoadingText(pathname))

      // Short timeout to ensure the loader is visible
      const timeout = setTimeout(
        () => {
          setIsLoading(false)
          setKey(pathname)
        },
        isMobile ? 600 : 800,
      )

      return () => clearTimeout(timeout)
    }
  }, [pathname, key, isMobile])

  // If we're not loading, render the children directly
  if (!isLoading) {
    return (
      <motion.div
        key={key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="pixel-transition"
      >
        {children}
      </motion.div>
    )
  }

  // If we are loading, show the appropriate loader based on device
  return (
    <>
      {isMobile ? (
        <MobileLoading isLoading={isLoading} />
      ) : (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AsciiLoader text={loadingText} speed={1.5} />
        </motion.div>
      )}
    </>
  )
}
