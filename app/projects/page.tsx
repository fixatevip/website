import type { Metadata } from "next"
import ProjectsGrid from "@/components/projects/projects-grid"
import ProjectsFilter from "@/components/projects/projects-filter"
import { AsciiBanner } from "@/components/ui/ascii-banner"

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore our portfolio of innovative digital projects and solutions",
}

export default function ProjectsPage() {
  return (
    <main className="container mx-auto px-4 pt-8 md:pt-12 pb-16 md:pb-24 sm:px-6 lg:px-8">
      <AsciiBanner text="PROJECTS" className="h-24 md:h-32 lg:h-40 mb-6 md:mb-8" animated speed={1.2} size="lg" />
      <ProjectsFilter />
      <ProjectsGrid />
    </main>
  )
}
