import type React from "react"
import type { Metadata } from "next"
import { VT323, Press_Start_2P } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import { ThemeProvider } from "@/components/theme-provider"
import { PixelatedBackground } from "@/components/ui/pixelated-background"
import { PageTransition } from "@/components/ui/page-transition"
import { PixelCursor } from "@/components/ui/pixel-cursor"

const pixelFont = VT323({
  subsets: ["latin"],
  variable: "--font-pixel",
  weight: "400",
})

const pixelFontAlt = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-pixel-alt",
  weight: "400",
})

export const metadata: Metadata = {
  title: {
    default: "Fixate.vip | Indie Game Studio",
    template: "%s | Fixate.vip",
  },
  description: "An indie game development team creating immersive pixel worlds and retro-inspired gaming experiences",
  keywords: ["game development", "indie games", "pixel art", "retro games", "game studio"],
  authors: [{ name: "Fixate Team" }],
  creator: "Fixate.vip",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fixate.vip",
    title: "Fixate.vip | Indie Game Studio",
    description: "An indie game development team creating immersive pixel worlds and retro-inspired gaming experiences",
    siteName: "Fixate.vip",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Fixate.vip Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fixate.vip | Indie Game Studio",
    description: "An indie game development team creating immersive pixel worlds and retro-inspired gaming experiences",
    images: ["/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${pixelFont.variable} ${pixelFontAlt.variable} font-pixel antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="fixate-theme"
        >
          <div className="relative min-h-screen bg-background overflow-hidden">
            <PixelatedBackground />
            <PixelCursor />
            <Header />
            <PageTransition>{children}</PageTransition>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
