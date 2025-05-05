"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { DiscordIcon } from "@/components/ui/discord-icon"

export default function ContactInfo() {
  const contactItems = [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Address",
      content: "123 Innovation Street, Tech City, TC 10101",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      content: "+1 (555) 123-4567",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      content: "hello@fixate.vip",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Working Hours",
      content: "Mon - Fri: 9AM - 6PM",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-muted-foreground">
          Have a project in mind or want to learn more about our services? We'd love to hear from you. Reach out to us
          using any of the methods below.
        </p>
      </div>

      <div className="space-y-6">
        {contactItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start"
          >
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
              {item.icon}
            </div>
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-muted-foreground">{item.content}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-6 border-t border-border">
        <h3 className="font-medium mb-4">Connect With Us</h3>
        <div className="flex space-x-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary transition-colors"
            aria-label="Twitter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-twitter"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary transition-colors"
            aria-label="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-github"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary transition-colors"
            aria-label="Discord"
          >
            <DiscordIcon size={16} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary transition-colors"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-linkedin"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
