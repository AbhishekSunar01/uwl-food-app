import Link from "next/link"
import getCartItems from "../actions/cart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type CartItemView = {
  id: number
  name: string
  category: string
  imageUrl: string
  unitPrice: number
  quantity: number
  lineTotal: number
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function pickString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value
    }
  }
  return ""
}

function pickNumber(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value
    }

    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value)
      if (Number.isFinite(parsed)) {
        return parsed
      }
    }
  }
  return 0
}

function normalizeCartItems(payload: unknown): CartItemView[] {
  if (!Array.isArray(payload)) return []

  return payload.map((rawItem, index) => {
    const item = isRecord(rawItem) ? rawItem : {}
    const nestedFoodItem = isRecord(item.foodItem) ? item.foodItem : {}

    const id = pickNumber(
      item.foodId,
      item.foodItemId,
      item.id,
      nestedFoodItem.foodId,
      nestedFoodItem.id,
      index + 1
    )

    const name =
      pickString(
        item.foodName,
        item.name,
        item.title,
        nestedFoodItem.foodName,
        nestedFoodItem.name,
        nestedFoodItem.title
      ) || `Item #${id}`

    const category = pickString(
      item.foodCategory,
      item.category,
      nestedFoodItem.foodCategory,
      nestedFoodItem.category
    )

    const imageUrl = pickString(
      item.imageUrl,
      item.image,
      nestedFoodItem.imageUrl,
      nestedFoodItem.image
    )

    const unitPrice = pickNumber(
      item.foodPrice,
      item.price,
      item.unitPrice,
      nestedFoodItem.foodPrice,
      nestedFoodItem.price,
      nestedFoodItem.unitPrice
    )

    const quantity = Math.max(
      1,
      pickNumber(item.quantity, item.qty, item.count)
    )
    const lineTotal =
      pickNumber(item.lineTotal, item.subtotal, item.total) ||
      unitPrice * quantity

    return {
      id,
      name,
      category,
      imageUrl,
      unitPrice,
      quantity,
      lineTotal,
    }
  })
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)

export default async function CartPage() {
  const result = await getCartItems()

  if (!result.success) {
    return (
      <div className="mx-auto flex min-h-[70svh] w-full max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl font-semibold">Your cart is unavailable</h1>
        <p className="text-muted-foreground">
          {result.message ?? "Please sign in to view your cart."}
        </p>
        <Button asChild>
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </div>
    )
  }

  const items = normalizeCartItems(result.data)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0)

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70svh] w-full max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="text-muted-foreground">
          Looks like you have not added anything yet.
        </p>
        <Button asChild>
          <Link href="/">Browse food items</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <h1 className="mb-1 text-3xl font-semibold">Your cart</h1>
      <p className="mb-8 text-muted-foreground">
        {totalItems} {totalItems === 1 ? "item" : "items"} in your order
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={`${item.id}-${item.name}`} className="py-0">
              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-[120px_1fr_auto] sm:items-center">
                <div className="h-28 overflow-hidden rounded-2xl bg-muted">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                      No image
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-lg font-medium">{item.name}</h2>
                  {item.category && (
                    <p className="text-sm text-muted-foreground">
                      {item.category}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-muted-foreground">
                    {formatPrice(item.unitPrice)} each
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-sm text-muted-foreground">
                    Qty {item.quantity}
                  </p>
                  <p className="text-lg font-semibold">
                    {formatPrice(item.lineTotal)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="h-px w-full bg-border" />
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <Button className="mt-2 w-full">Checkout</Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Continue shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
