import { Hero } from "@/components/hero"
import ProductCard from "@/components/product-card"
import { foodItem } from "@/types/food-item"

export default async function Page() {
  try {
    const res = await fetch("http://51.21.131.235:8080/api/food-item")
    const data = await res.json()
    console.log(data)
    return (
      <div className="flex min-h-svh flex-col gap-6 p-6">
        <Hero />
        <h2 className="text-2xl font-semibold">Products</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.data.map((item: foodItem) => (
            <ProductCard key={item.foodId} foodItem={item} />
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error(error)

    return (
      <div className="p-6">
        <h2 className="text-red-500">Failed to load products</h2>
      </div>
    )
  }
}
