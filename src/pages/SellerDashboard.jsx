import React from "react"
import { PrivateLayout } from "components"

export default function SellerDashboard() {
  

  return (
    <PrivateLayout
      title="Dashboard"
      description="barchart and other forecasting data, summary are presented here"
    >
      <section className="flex flew-row">
        <div className="flex flex-col gap-x-5">
          <div className="bg-black">

          </div>
          <div className="bg-black ">

          </div>
        </div>
        <div className="flex flex-col gap-x-5">
          <div className="bg-black">

          </div>
          <div className="bg-black ">

          </div>
        </div>
      </section>
    </PrivateLayout>
  )
}
