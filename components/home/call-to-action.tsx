"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export default function CallToAction() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const isMobile = useMobile()

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Join Our Gaming Community</h2>
          <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">
            Connect with our team and other players. Follow our development journey, get early access to new releases,
            and participate in game testing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size={isMobile ? "default" : "lg"} asChild className="w-full sm:w-auto">
              <Link href="/contact" className="flex items-center justify-center gap-2">
                Join Discord <ArrowRight size={16} />
              </Link>
            </Button>
            <Button size={isMobile ? "default" : "lg"} variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/projects">Play Our Games</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
