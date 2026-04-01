"use client"

import { useEffect, useState } from "react"
import { User } from "lucide-react"
import { Croissant } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 border-b px-72 py-4 transition-all duration-300 ${
        scrolled
          ? "border-transparent bg-background/60 backdrop-blur-md"
          : "bg-background"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-3xl font-bold">
          <div className="text-primary">
            <Croissant width={40} height={40} />
          </div>
          Food Ordering App
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="rounded px-3 py-2">
            Home
          </Link>
          <Link href="/" className="rounded px-3 py-2">
            Menu
          </Link>
          <Link href="/" className="rounded px-3 py-2">
            Orders
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-secondary px-3 py-2"
          >
            <User className="h-5 w-5" />
            Abhishek
          </Link>
        </div>
      </div>
    </nav>
  )
}
