import type { Metadata } from "next"
import Hero from "@/components/home/hero"
import FeaturedProjects from "@/components/home/featured-projects"
import CallToAction from "@/components/home/call-to-action"
import { AsciiBanner } from "@/components/ui/ascii-banner"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Fixate.vip - An indie game development team creating immersive pixel worlds and retro-inspired gaming experiences",
}

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <div className="w-full py-12">
        <AsciiBanner text="FIXATE.VIP" className="h-32 md:h-40" animated speed={1.5} size="xl" />
      </div>
      <FeaturedProjects />
      <CallToAction />
    </main>
  )
}
