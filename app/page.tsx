import { Hero } from "@/components/hero"
import ProductCard from "@/components/product-card"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col gap-12 p-6">
      <Hero />
      <h2 className="mb-6 text-2xl font-semibold">Products</h2>
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  )
}
