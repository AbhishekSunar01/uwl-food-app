"use server"

import { auth } from "@clerk/nextjs/server"

const API_BASE = "http://51.21.131.235"

export async function addToCart(foodItemId: number, quantity: number = 1) {
  const { userId } = await auth()
  console.log("Clerk userId:", userId)

  if (!userId) {
    return {
      success: false,
      message: "You must be signed in to add items to cart",
    }
  }

  const res = await fetch(`${API_BASE}/api/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": userId,
    },
    body: JSON.stringify({ foodItemId, quantity }),
  })

  if (!res.ok) {
    return { success: false, message: "Failed to add item to cart" }
  }

  const data = await res.json()
  return { success: true, message: data.message, data: data.data }
}

export default async function getCartItems() {
  const { userId } = await auth()
  console.log("Clerk userId:", userId)

  if (!userId) {
    return {
      success: false,
      message: "You must be signed in to view cart items",
    }
  }

  const res = await fetch(`${API_BASE}/api/cart`, {
    headers: {
      "X-User-Id": userId,
    },
  })

  if (!res.ok) {
    return { success: false, message: "Failed to fetch cart items" }
  }

  const data = await res.json()
  return { success: true, data: data.data }
}
