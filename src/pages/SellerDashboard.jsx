import React, { useState } from "react"
import { PrivateLayout } from "components"
import { DollarSign, ShoppingCart, ShoppingBag } from 'react-feather'

export default function SellerDashboard() {
  const [totalSales, setTotalSales] = useState(999999)
  const [totalOrders, setTotalOrders] = useState(999999)
  const [totalProducts, setTotalProducts] = useState(999999)
  const [latestOrders, setLatestOrders] = useState([1,1,1])
  const [sales , setSales] = useState()


  return (
    <PrivateLayout
      title="Dashboard"
      description="barchart and other forecasting data, summary are presented here"
      size="w-full"
    >
      <section className="flex flew-row">
        <div className="md:grid md:grid-cols-3 flex flex-col w-full gap-x-3 gap-y-5">
          <div className="flex flex-row gap-x-5 bg-orange-500 p-5 rounded w-full drop-shadow">
            <div className="flex justify-center bg-white rounded-full w-14 h-14 border-4 border-orange-200 p-3">
              <DollarSign className="w-full h-full text-orange-500" />
            </div>
            <div className="flex flex-col">
              <p className="text-white/75 text-sm">Total Sales</p>
              <p className="font-medium text-white text-2xl">₱ {totalSales.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex flex-row gap-x-5 bg-green-500 p-5 rounded w-full drop-shadow">
            <div className="flex justify-center bg-white rounded-full w-14 h-14 border-4 border-green-200 py-3 pr-3 pl-2">
              <ShoppingCart className="w-full h-full text-green-500" />
            </div>
            <div className="flex flex-col">
              <p className="text-white/75 text-sm">Total Orders</p>
              <p className="font-medium text-white text-2xl">{totalOrders.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex flex-row gap-x-5 bg-violet-500 p-5 rounded w-full drop-shadow">
            <div className="flex justify-center bg-white rounded-full w-14 h-14 border-4 border-violet-200 p-3">
              <ShoppingBag className="w-full h-full text-violet-500" />
            </div>
            <div className="flex flex-col">
              <p className="text-white/75 text-sm">Total Products</p>
              <p className="font-medium text-white text-2xl">{totalProducts.toLocaleString()}</p>
            </div>
          </div>

          <div className="col-span-2 rounded h-96 drop-shadow bg-white p-3">
            <p className="font-medium text-gray-600">Sales Statistics</p>




          </div>
          <div className="rounded h-96 drop-shadow bg-white p-3">
            <p className="font-medium text-gray-600">Summary</p>
            <div className="flex justify-center p-5">
              <p className="text-xl text-gray-700">Recent Month</p>



            </div>
          </div>

          <div className="col-span-3 rounded md:h-full drop-shadow bg-white p-3">
            <p className="font-medium text-gray-600 mb-3">Latest Orders</p>
            {latestOrders.map((order) => {
              return (
                <div className="flex md:flex-row flex-col justify-between border-b-2 border-gray-100 p-3">
                  <div className="flex flex-row gap-x-5">
                    <p className="text-gray-600">999</p>
                    <p className="font-medium">Full Name</p>
                  </div>
                  <div className="md:grid md:grid-cols-4 flex flex-col gap-x-4 text-gray-700 text-center">
                    <p className="">product name</p>
                    <p className="">price</p>
                    <div className="bg-green-100/75 rounded-full">
                      <p className="text-green-700">Status</p>
                    </div>
                    <p className="">date</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </PrivateLayout>
  )
}
