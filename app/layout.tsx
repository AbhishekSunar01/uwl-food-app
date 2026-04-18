import { Geist, Geist_Mono, Manrope } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        manrope.variable
      )}
    >
      <body>
        <ClerkProvider>
          <Navbar />
          <ThemeProvider>
            <div className="mx-72 my-6">{children}</div>
          </ThemeProvider>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  )
}
