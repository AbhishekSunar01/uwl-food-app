"use client"

import { useEffect, useState } from "react"
import { Croissant } from "lucide-react"
import Link from "next/link"
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs"

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
          <Link href="/cart" className="rounded px-3 py-2">
            Cart
          </Link>
          <Show when="signed-out">
            <SignInButton>
              <button className="cursor-pointer rounded px-3 py-2">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="cursor-pointer rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </nav>
  )
}
