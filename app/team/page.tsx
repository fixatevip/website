import type { Metadata } from "next"
import TeamGrid from "@/components/team/team-grid"
import { AsciiBanner } from "@/components/ui/ascii-banner"

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the talented developers and designers behind Fixate.vip",
}

export default function TeamPage() {
  return (
    <main className="container mx-auto px-4 pt-8 md:pt-12 pb-16 md:pb-24 sm:px-6 lg:px-8">
      <AsciiBanner text="OUR TEAM" className="h-24 md:h-32 lg:h-40 mb-6 md:mb-8" animated speed={1.2} size="lg" />
      <p className="text-lg md:text-xl mb-8 md:mb-12 max-w-3xl font-pixel">
        Meet the talented individuals who make up Fixate.vip. We're a diverse team of developers, designers, and digital
        strategists passionate about creating innovative games.
      </p>
      <TeamGrid />
    </main>
  )
}
