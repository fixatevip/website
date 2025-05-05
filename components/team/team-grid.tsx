"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Github, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { DiscordIcon } from "@/components/ui/discord-icon"
import { useMobile } from "@/hooks/use-mobile"

// Actual team data
const teamMembers = [
  {
    id: 1,
    name: "slideshow",
    role: "Owner & Lead Developer",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1934.JPG-DdRVYH0u2pdXnxsM1uhtoUMWWmYyHi.jpeg",
    bio: "Lead developer and founder of fixate.vip. Specializes in creating innovative digital experiences with a focus on pixel-perfect design and cutting-edge technology.",
    social: {
      github: "https://github.com/slideshowpptx",
      twitter: "https://x.com/slideshowpptx",
      discord: "http://discordapp.com/users/961902505686626325",
      linkedin: "#",
    },
  },
  {
    id: 2,
    name: "zigwangles",
    role: "Backend/Functionality Developer",
    image: "/images/zigwangles-profile.jpeg",
    bio: "Backend developer specializing in creating robust and scalable functionality. Focuses on system architecture and performance optimization.",
    social: {
      github: "https://github.com/zigwangles",
      twitter: "https://x.com/zigwangles",
      discord: "https://discordapp.com/users/1211702740833796127",
      linkedin: "#",
    },
  },
  {
    id: 3,
    name: "zoalc",
    role: "UI/UX Developer",
    image: "/images/zoalc-profile.jpeg",
    bio: "UI/UX developer with a passion for creating beautiful and intuitive user interfaces. Specializes in frontend development and user experience design.",
    social: {
      github: "https://github.com/zoalcdev",
      twitter: "https://x.com/zoalcdev",
      discord: "https://discordapp.com/users/1182424181124632677",
      linkedin: "#",
    },
  },
]

export default function TeamGrid() {
  const [selectedMember, setSelectedMember] = useState<(typeof teamMembers)[0] | null>(null)
  const isMobile = useMobile()

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            layoutId={`team-card-${member.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
            onClick={() => setSelectedMember(member)}
          >
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
              {/* Circular profile image with border */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary/30">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized={member.image.startsWith("http")} // Only use unoptimized for remote images
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 z-20">
                <div className="flex gap-2">
                  {member.social.github !== "#" && (
                    <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 h-10 w-10" asChild>
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <Github size={18} />
                      </a>
                    </Button>
                  )}
                  {member.social.twitter !== "#" && (
                    <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 h-10 w-10" asChild>
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <Twitter size={18} />
                      </a>
                    </Button>
                  )}
                  {member.social.discord !== "#" && (
                    <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 h-10 w-10" asChild>
                      <a href={member.social.discord} target="_blank" rel="noopener noreferrer" aria-label="Discord">
                        <DiscordIcon size={18} />
                      </a>
                    </Button>
                  )}
                  {member.social.linkedin !== "#" && (
                    <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 h-10 w-10" asChild>
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <Linkedin size={18} />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg md:text-xl font-pixel-alt mb-1 md:mb-2">{member.name}</h3>
              <p className="text-muted-foreground font-pixel text-sm md:text-base">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
        <DialogContent className="max-w-2xl font-pixel sm:max-w-lg md:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-pixel-alt text-xl md:text-2xl">{selectedMember?.name}</DialogTitle>
            <DialogDescription className="font-pixel text-sm md:text-base">{selectedMember?.role}</DialogDescription>
          </DialogHeader>

          {selectedMember && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-48 md:h-64 rounded-full overflow-hidden border-4 border-primary/30 mx-auto w-48 md:w-64">
                {/* Circular image in dialog */}
                <Image
                  src={selectedMember.image || "/placeholder.svg"}
                  alt={selectedMember.name}
                  fill
                  className="object-cover"
                  unoptimized={selectedMember.image.startsWith("http")} // Only use unoptimized for remote images
                />
              </div>

              <div>
                <p className="mb-4 font-pixel text-sm md:text-base">{selectedMember.bio}</p>

                <div className="flex flex-wrap gap-2">
                  {selectedMember.social.github !== "#" && (
                    <Button size="icon" variant="outline" className="h-10 w-10" asChild>
                      <a
                        href={selectedMember.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <Github size={18} />
                      </a>
                    </Button>
                  )}
                  {selectedMember.social.twitter !== "#" && (
                    <Button size="icon" variant="outline" className="h-10 w-10" asChild>
                      <a
                        href={selectedMember.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                      >
                        <Twitter size={18} />
                      </a>
                    </Button>
                  )}
                  {selectedMember.social.discord !== "#" && (
                    <Button size="icon" variant="outline" className="h-10 w-10" asChild>
                      <a
                        href={selectedMember.social.discord}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Discord"
                      >
                        <DiscordIcon size={18} />
                      </a>
                    </Button>
                  )}
                  {selectedMember.social.linkedin !== "#" && (
                    <Button size="icon" variant="outline" className="h-10 w-10" asChild>
                      <a
                        href={selectedMember.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={18} />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
