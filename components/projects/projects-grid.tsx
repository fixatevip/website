"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { PixelText } from "@/components/ui/pixel-text"
import { AsciiArt } from "@/components/ui/ascii-art"
import { useMobile } from "@/hooks/use-mobile"

// Project data
const projects = [
  {
    id: 1,
    title: "Misirlou",
    description: "A web-based endless bullet hell rogue-like game inspired by Vampire Survivors.",
    image: "/images/misirlou-logo.png",
    tags: ["Three.js", "JavaScript", "WebGL", "Game Development", "Rogue-like"],
    category: "web",
    url: "https://example.com/misirlou",
    details:
      "Misirlou is an action-packed web game built with Three.js that combines the addictive gameplay of Vampire Survivors with unique bullet hell mechanics. Players must survive waves of enemies while collecting power-ups and unlocking new abilities in this endless rogue-like experience.",
  },
]

export default function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const isMobile = useMobile()

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  return (
    <>
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            layoutId={`project-card-${project.id}`}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative h-40 sm:h-48 overflow-hidden bg-black flex items-center justify-center">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={isMobile ? 220 : 300}
                height={isMobile ? 110 : 150}
                className="object-contain transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                <Button variant="outline" className="text-white border-white hover:bg-white/20 font-pixel">
                  <PixelText>View Game</PixelText>
                </Button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg md:text-xl font-pixel-alt mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-3 font-pixel text-sm md:text-base">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, isMobile ? 2 : 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs font-pixel">
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > (isMobile ? 2 : 3) && (
                  <Badge variant="outline" className="text-xs font-pixel">
                    +{project.tags.length - (isMobile ? 2 : 3)}
                  </Badge>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-3xl font-pixel sm:max-w-lg md:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-pixel-alt text-xl md:text-2xl">{selectedProject?.title}</DialogTitle>
            <DialogDescription className="font-pixel text-sm md:text-base">
              {selectedProject?.description}
            </DialogDescription>
          </DialogHeader>

          {selectedProject && (
            <div className="mt-4">
              <div className="relative h-48 md:h-64 lg:h-80 mb-4 rounded-md overflow-hidden bg-black flex items-center justify-center">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  width={isMobile ? 280 : 400}
                  height={isMobile ? 140 : 200}
                  className="object-contain"
                />
              </div>

              <AsciiArt
                className="h-12 md:h-16 mb-4 bg-background/50 rounded p-2"
                text={selectedProject.title}
                animated
              />

              <p className="mb-4 font-pixel text-sm md:text-base">{selectedProject.details}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-pixel text-xs md:text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button asChild className="font-pixel-alt w-full sm:w-auto">
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink size={16} />
                  Play Game
                </a>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
