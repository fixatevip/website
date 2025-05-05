"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code, Layers, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: <Code className="h-6 w-6" />,
    title: "Clean Code",
    description: "We write clean, maintainable code that follows best practices and industry standards.",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Modern Stack",
    description: "We use the latest technologies and frameworks to build fast, scalable, and secure applications.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Performance",
    description: "We optimize for performance to ensure your application loads quickly and runs smoothly.",
  },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Who We Are</h2>
            <p className="text-muted-foreground mb-6">
              Fixate.vip is a team of passionate developers and designers dedicated to creating exceptional digital
              experiences. We combine technical expertise with creative thinking to deliver solutions that not only meet
              but exceed our clients' expectations.
            </p>
            <p className="text-muted-foreground mb-8">
              Our approach is collaborative and client-focused. We believe in transparent communication, agile
              methodologies, and delivering value at every stage of the project. Whether you're a startup or an
              established business, we have the skills and experience to bring your vision to life.
            </p>

            <Button asChild>
              <Link href="/team" className="flex items-center gap-2">
                Meet Our Team <ArrowRight size={16} />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image src="/placeholder.svg?height=800&width=600" alt="Our Team" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6">
                <span className="text-white/80 text-sm">Our workspace</span>
                <h3 className="text-white text-xl font-bold">Where innovation happens</h3>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
