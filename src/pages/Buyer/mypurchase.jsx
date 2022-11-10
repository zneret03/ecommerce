import React, { useEffect, useState } from 'react'
import { Navbar, Footer } from 'components'
import { axiosRequest } from "api"
import { Frown } from "react-feather"
import { MapPin } from "react-feather"

export default function MyPurchase() {
    const order_url = '/api/v1/mypurchase'
    const imageUrl = "/api/v1/images"
    const [products, setProducts] = useState([])
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        const getCart = async () => {
            const response = await axiosRequest.get(order_url)
            const { status, data } = response
            if (status === 200) {
                const prod = data.data

                setProducts(prod)
                setLoaded(true)
            }
        }
        getCart()
    }, [])

    const getDate = (date) => {
        const options = { month: 'numeric', day: 'numeric', year: "numeric" };
        const newDate = new Date(date).toLocaleDateString('en-US', options)
        return <p>{newDate}</p>
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col w-full text-gray-800">
                <div className="font-bold text-3xl bg-white px-10 py-5">My Purchase</div>
                <div className="w-full py-2 px-5 bg-gray-100 flex flex-col gap-y-3 ">
                    <div className="flex flex-col gap-y-2 mb-10">
                        <div className="md:grid md:grid-cols-8 bg-white px-5 md:px-10 py-3">
                            <div className="md:col-span-3">
                                <p className="text-base md:text-xl font-medium">Products Ordered</p>
                            </div>
                            <div className="hidden md:flex items-center justify-center">
                                <p>Price</p>
                            </div>
                            <div className="hidden md:flex items-center justify-center">
                                <p>Quantity</p>
                            </div>
                            <div className="hidden md:flex items-center justify-center">
                                <p>Total</p>
                            </div>
                            <div className="hidden md:flex items-center justify-center">
                                <p>Date</p>
                            </div>
                            <div className="hidden md:flex items-center justify-end">
                                <p>Status</p>
                            </div>
                        </div>

                        {isLoaded ? products.map((product) => {
                            return (
                                <div className="py-3 px-5 md:px-10 bg-white w-full flex flex-col gap-y-5" key={product.orderID}>
                                    <div className="md:grid md:grid-cols-8 bg-white flex flex-col gap-y-1">
                                        <div className="md:col-span-3 flex flex-col gap-y-2">
                                            <div className="flex flex-row justify-between">
                                                <p className="text-sm text-gray-600">{product.shop}</p>
                                                <div className="flex md:hidden items-center  justify-end text-primary ">
                                                    <p>{product.status}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-row gap-x-5 items-center">
                                                <div className="bg-gray-200 md:w-16 md:h-16 w-32 h-32">
                                                    <img className="object-cover w-full h-full" src={`${imageUrl}/${product.id}`} alt="" />
                                                </div>
                                                <p className="text-xl">{product.productName}</p>
                                            </div>
                                        </div>
                                        <div className="md:flex items-center grid grid-cols-4 md:justify-center gap-x-2">
                                            <p className="md:hidden block">Price: </p>
                                            <p>₱ {product.price.toLocaleString()}</p>
                                        </div>
                                        <div className="md:flex items-center  grid grid-cols-4 md:justify-center gap-x-2">
                                            <p className="md:hidden block">Quantity: </p>
                                            <p>{product.quantity}</p>
                                        </div>
                                        <div className="md:flex items-center  grid grid-cols-4 md:justify-center gap-x-2">
                                            <p className="md:hidden block">Total: </p>
                                            <p>₱ {(product.quantity * product.price).toLocaleString()}</p>
                                        </div>
                                        <div className="md:flex items-center grid grid-cols-4 md:justify-center  ">
                                            <p className="md:hidden block">Date: </p>
                                            {getDate(product.dateCreated)}
                                        </div>
                                        <div className="hidden md:flex items-center  md:justify-end text-primary ">
                                            <p>{product.status}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-x-2 text-gray-600">
                                        < MapPin className="w-4 h-4" />
                                        <p className="font-medium">{product.fullname}</p>
                                        <p className="font-medium">{product.number}</p>
                                        <p>{product.address}</p>
                                    </div>
                                </div>
                            )
                        }) : null}

                        {products.length === 0 && isLoaded ?
                            <div className="flex flex-col justify-center items-center p-10 gap-y-3 text-gray-800">
                                <Frown className="w-20 h-20" />
                                <p className="font-medium text-xl">No Purchase History</p>
                            </div>
                            : ""}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}