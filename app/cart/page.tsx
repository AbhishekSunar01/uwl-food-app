import getCartItems from "../actions/cart"

export default async function CartPage() {
  const result = await getCartItems()
  console.log(result)
  return <div>Cart Page</div>
}
