"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"

// Featured project
const featuredProject = {
  id: 1,
  title: "Misirlou",
  description: "A web-based endless bullet hell rogue-like game inspired by Vampire Survivors.",
  image: "/images/misirlou-logo.png",
  tags: ["Three.js", "JavaScript", "WebGL", "Game Development"],
  url: "/projects",
}

export default function FeaturedProjects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const isMobile = useMobile()

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4"
          >
            Featured Game
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base"
          >
            Check out our latest release that showcases our passion for game development
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
          >
            <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden bg-black flex items-center justify-center">
              <Image
                src={featuredProject.image || "/placeholder.svg"}
                alt={featuredProject.title}
                width={isMobile ? 280 : 400}
                height={isMobile ? 140 : 200}
                className="object-contain transition-transform duration-500 group-hover:scale-110"
                priority
              />
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-semibold mb-2">{featuredProject.title}</h3>
              <p className="text-muted-foreground mb-4 text-sm md:text-base">{featuredProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {featuredProject.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size={isMobile ? "default" : "sm"} asChild className="w-full sm:w-auto">
                <Link href={featuredProject.url} className="flex items-center justify-center gap-2">
                  Play Now <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/projects" className="flex items-center justify-center gap-2">
              View All Games <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
