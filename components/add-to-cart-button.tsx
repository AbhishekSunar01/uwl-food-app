"use client"

import { useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { addToCart } from "@/app/actions/cart"
import { ShoppingCart, Check, Loader2 } from "lucide-react"

export default function AddToCartButton({
  foodItemId,
}: {
  foodItemId: number
}) {
  const { isSignedIn } = useAuth()
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")

  async function handleClick() {
    if (!isSignedIn) {
      window.location.href = "/sign-in"
      return
    }

    setStatus("loading")

    const result = await addToCart(foodItemId)

    if (result.success) {
      setStatus("success")
      setTimeout(() => setStatus("idle"), 1500)
    } else {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 2000)
    }
  }

  return (
    <Button
      className="w-1/2 cursor-pointer"
      onClick={handleClick}
      disabled={status === "loading"}
    >
      {status === "loading" && <Loader2 className="animate-spin" />}
      {status === "success" && <Check />}
      {status === "idle" && <ShoppingCart />}
      {status === "loading"
        ? "Adding..."
        : status === "success"
          ? "Added!"
          : "Add"}
    </Button>
  )
}
