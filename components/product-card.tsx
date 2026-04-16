import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { foodItem } from "@/types/food-item"

type ProductCardProps = {
  foodItem: foodItem
}

export default function ProductCard({ foodItem }: ProductCardProps) {
  return (
    <Card className="relative w-full pt-0">
      <div className="absolute inset-0 z-30 h-60 bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 h-60 w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader className="">
        <CardTitle>{foodItem.foodName}</CardTitle>
        <CardDescription>${foodItem.foodPrice}</CardDescription>
        <Button className="w-1/2">Add</Button>
      </CardHeader>
    </Card>
  )
}
