import { Hero } from "@/components/hero"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col gap-12 p-6">
      <Hero />
      <h2 className="mb-6 text-2xl font-semibold">Products</h2>
    </div>
  )
}
