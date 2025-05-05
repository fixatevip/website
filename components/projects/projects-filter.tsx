"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

const categories = [
  { id: "all", label: "All Games" },
  { id: "web", label: "Web" },
  { id: "game", label: "Mobile" },
]

export default function ProjectsFilter() {
  const [activeCategory, setActiveCategory] = useState("all")
  const isMobile = useMobile()

  return (
    <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
      {categories.map((category) => (
        <div key={category.id} className="relative">
          <Button
            variant={activeCategory === category.id ? "default" : "outline"}
            size={isMobile ? "default" : "sm"}
            onClick={() => setActiveCategory(category.id)}
            className="relative z-10 min-w-[80px] md:min-w-[100px]"
          >
            {category.label}
          </Button>
          {activeCategory === category.id && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-primary rounded-md"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
