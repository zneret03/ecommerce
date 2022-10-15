import React from "react"
import { PrivateLayout, Back } from "components"

export default function AddProducts() {
  return (
    <PrivateLayout
      title="Create New Products"
      description="this page where you can create different products you like"
    >
      <Back to="/products" />
      <section>create new products</section>
    </PrivateLayout>
  )
}
