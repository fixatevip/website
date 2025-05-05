import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AsciiBanner } from "@/components/ui/ascii-banner"
import { DiscordIcon } from "@/components/ui/discord-icon"

export const metadata: Metadata = {
  title: "Contact",
  description: "Join the Fixate.vip Discord community",
}

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 pt-8 md:pt-12 pb-16 md:pb-24 sm:px-6 lg:px-8">
      <AsciiBanner text="CONTACT US" className="h-24 md:h-32 lg:h-40 mb-6 md:mb-8" animated speed={1.2} size="lg" />

      <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
        <div className="bg-card border border-border rounded-lg p-6 md:p-8 w-full text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-pixel-alt">Join Our Community</h2>

          <p className="text-lg md:text-xl mb-6 md:mb-8 font-pixel">
            Connect with the Fixate.vip team and community on our Discord server.
          </p>

          <Button
            size="lg"
            className="flex items-center gap-3 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full sm:w-auto"
            asChild
          >
            <Link href="https://discord.gg/example" target="_blank" rel="noopener noreferrer">
              <DiscordIcon size={24} />
              Join Our Discord Server
            </Link>
          </Button>

          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
            <p className="text-muted-foreground text-sm md:text-base">
              Our Discord server is the best place to get in touch with our team, ask questions, share ideas, and stay
              updated on our latest projects.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
