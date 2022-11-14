import React, { useState, useEffect } from "react"
import { PrivateLayout, Chart } from "components"
import { DollarSign, ShoppingCart, ShoppingBag } from 'react-feather'
import { axiosRequest } from "api"
import { Frown } from "react-feather"

export default function SellerDashboard() {
  const url = "/api/v1/admin/reports"
  const img_url = "/api/v1/images"
  const [totalSales, setTotalSales] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)
  const [latestOrders, setLatestOrders] = useState([])
  const [sales, setSales] = useState([])
  const [topSelling, setTopSelling] = useState([])


  useEffect(() => {
    const getReports = async () => {
      const response = await axiosRequest.get(url)
      const { status, data } = response

      if (status === 200) {
        setTotalSales(data.data.totalSales)
        setTotalOrders(data.data.totalOrders)
        setTotalProducts(data.data.totalProducts)
        setLatestOrders(data.data.latestOrders)
        setSales(data.data.sales)
        setTopSelling(data.data.topSelling)
      }
    }

    getReports()
  }, [])

  const getDate = (date) => {
    const options = { month: 'numeric', day: 'numeric', year: "numeric" };
    const newDate = new Date(date).toLocaleDateString('en-US', options)
    return <p>{newDate}</p>
  }

  const getStatus = (status) => {
    if (status === 'PREPARING') {
      return (
        <div className='bg-amber-100/75 rounded-full text-center'>
          <p className='text-amber-700 text-sm'>{status}</p>
        </div>
      )
    }
    if (status === 'PENDING') {
      return (
        <div className='bg-yellow-100/75 rounded-full text-center'>
          <p className='text-yellow-700 text-sm'>{status}</p>
        </div>
      )
    }
    if (status === 'SHIPPED') {
      return (
        <div className='bg-orange-100/75 rounded-full text-center'>
          <p className='text-orange-700 text-sm'>{status}</p>
        </div>
      )
    }
    if (status === 'COMPLETE') {
      return (
        <div className='bg-green-100/75 rounded-full text-center'>
          <p className='text-green-700 text-sm'>{status}</p>
        </div>
      )
    }
    if (status === 'CANCELLED') {
      return (
        <div className='bg-red-100/75 rounded-full text-center'>
          <p className='text-red-700 text-sm'>{status}</p>
        </div>
      )
    }

  }

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
            <p className="font-medium text-gray-600 mb-5">Sales Statistics</p>
            {sales ?
              <Chart data={sales} xAxis="date" yAxis="sales" />
              : ""
            }

          </div>

          <div className="rounded h-96 drop-shadow bg-white px-5 py-3">
            <p className="font-medium text-gray-600 mb-3">Top Selling Products</p>
            <div className="grid grid-cols-4 gap-y-2">
              <div className="col-span-3">
                <p className="text-sm text-gray-600">Product Name</p>
              </div>
              <div className="flex justify-end items-center">
                <p className="text-sm text-gray-600">Orders</p>
              </div>
            </div>

            {topSelling.map(product => {
              return (
                <div className="grid grid-cols-4 gap-y-2 my-3">
                  <div className="col-span-3">
                    <div className="flex flex-row items-center gap-x-4">
                      <div className="w-8 h-8 overflow-hidden">
                        <img className="object-cover w-full h-full" src={`${img_url}/${product.image}`} alt={`${product.productName}`} />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-medium text-gray-700">{product.productName}</p>
                        <p className="text-gray-700">₱ {product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end items-center">
                    <p className="text-gray-700">{product.quantity}</p>
                  </div>
                </div>
              )
            })}

          </div>
          <div className="col-span-3 rounded md:h-full drop-shadow bg-white p-3">
            <p className="font-medium text-gray-600 mb-3">Latest Orders</p>
            {latestOrders.length > 0?
              latestOrders.map((order) => {
                return (
                  <div className="flex md:flex-row flex-col justify-between border-b-2 border-gray-100 p-3" key={order.id}>
                    <div className="flex flex-row gap-x-5">
                      <p className="text-gray-600">{order.id}</p>
                      <p className="font-medium">{order.buyer}</p>
                    </div>
                    <div className="md:grid md:grid-cols-4 flex flex-col gap-x-4 text-gray-700">
                      <p className="">{order.product}</p>
                      <p className="">₱ {order.price.toLocaleString()}</p>
                      {getStatus(order.status)}
                      {getDate(order.dateCreated)}
                    </div>
                  </div>
                )
              }) :

              <div className="flex flex-col justify-center items-center p-10 gap-y-3 text-gray-800">
                <Frown className="w-20 h-20" />
                <p className="font-medium text-xl">No Orders</p>
              </div>
            }
          </div>
        </div>
      </section>
    </PrivateLayout>
  )
}
