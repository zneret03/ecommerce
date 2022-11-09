import React, { useEffect, useState } from 'react'
import { Navbar } from 'components'
import { Plus, Minus, Frown } from "react-feather"
import { axiosRequest } from "api"

export default function Cart() {
    const cart_url = "/api/v1/user/cart"
    const imageUrl = "/api/v1/images"
    const [products, setProducts] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const [subtotal, setSubtotal] = useState(0)
    const [shipping, setShipping] = useState(0)
    const [tax, setTax] = useState(0)
    const [total, setTotal] = useState(0)
    const [empty, setEmpty] = useState(true)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const getCart = async () => {
            const response = await axiosRequest.get(cart_url)
            const { status, data } = response
            if (status === 200) {
                const prod = data.data

                setProducts(prod)

                if (prod) {
                    const prices = prod.map((product) => {
                        return product.price * product.quantity
                    })

                    const subPrice = prices.reduce((a, b) => a + b, 0)
                    const shippingPrice = 0
                    const taxPrice = 0
                    const totalPrice = (subPrice + shippingPrice) - taxPrice


                    setSubtotal(subPrice)
                    setShipping(shippingPrice)
                    setTax(taxPrice)
                    setTotal(totalPrice)

                    setLoaded(true)
                    setEmpty(false)
                }
            }
        }
        getCart()
    }, [])

    const remove = async (id) => {
        const response = await axiosRequest.delete(`${cart_url}/${id}`)
        const { status } = response
        if (status === 200) {
            const filtered = products.filter(product => { return product.id !== id })
            setProducts(filtered)
            setRefresh(prevState => !prevState)

            if (filtered.length === 0) {
                setEmpty(true)
            }

            const prices = filtered.map((product) => {
                return product.price * product.quantity
            })

            const subPrice = prices.reduce((a, b) => a + b, 0)
            const shippingPrice = 0
            const totalPrice = subPrice + shippingPrice

            setSubtotal(subPrice)
            setShipping(shippingPrice)
            setTotal(totalPrice)
        }
    }

    return (
        <>
            <Navbar refresh={refresh}/>
            <div className="flex flex-col md:flex-row w-screen bg-white text-gray-800">
                <div className="md:w-2/3 p-8">
                    <p className="font-bold text-3xl mb-5">Cart</p>
                    {isLoaded ? products.map((product) => {
                        return (
                            <div className="flex flex-row border-t-2 py-4 w-full justify-between" key={product.id}>
                                <div className="flex flex-row gap-x-4 ">
                                    <div className="bg-gray-200 md:w-52 md:h-52 hidden md:block">
                                        <img className="object-cover w-full h-full" src={`${imageUrl}/${product.id}`} alt="" />
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <div>
                                            <a href={`/product/${product.id}`} className="font-medium text-2xl">{product.productName}</a>
                                            <div className="flex flex-col gap-y-1 mt-2 text-sm">
                                                <p>Category: {product.category}</p>
                                                <p>Gender: {product.gender}</p>

                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-x-4 h-7 md:mt-0 mt-5">
                                            <div className="text-sm">Quantity:</div>
                                            <div className="flex flex-row items-center">
                                                <button className="flex justify-center items-center w-7 h-7 text-gray-600 hover:bg-primary hover:text-white border border-solid border-gray-300">
                                                    <Minus className="w-3/5" />
                                                </button>
                                                <input id="quantity" className="form-control text-center w-12 block text-xl font-normal h-7 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-600 focus:outline-none"
                                                    value={product.quantity} type="number" readOnly />
                                                <button className="flex justify-center items-center w-7 h-7 text-gray-600 hover:bg-primary hover:text-white border border-solid border-gray-300">
                                                    <Plus className="w-3/5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <div className="flex flex-col gap-y-1 items-end">
                                        <p className="font-medium text-3xl text-primary">₱ {(product.price * product.quantity).toLocaleString()}</p>
                                        <p className="text-xl text-gray-700">₱ {product.price.toLocaleString()}</p>
                                    </div>
                                    <button onClick={() => { remove(product.id) }} className="text-red-600">Remove</button>
                                </div>
                            </div>
                        )
                    }) : null}

                    <div className={`${(empty) ? "flex" : "hidden"} flex-col justify-center items-center p-10 gap-y-3 text-gray-800`}>
                        <Frown className="w-20 h-20" />
                        <p className="font-medium text-xl">Empty Cart</p>
                    </div>

                </div>
                <div className="md:w-1/3 bg-gray-100 flex flex-col justify-between h-full md:h-screen p-8 text-lg">
                    <div className="flex flex-col gap-y-10">
                        <p className="font-bold text-3xl">Summary</p>
                        <div className="flex flex-col gap-y-2">
                            <div className="flex flex-row justify-between">
                                <p>Subtotal</p>
                                <p>₱ {subtotal.toLocaleString()}</p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p>Shipping</p>
                                <p>₱ {shipping.toLocaleString()}</p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p>Tax</p>
                                <p>₱ {tax.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full text-2xl font-medium gap-y-5 mt-10 md:mt-0">
                        <div className="flex flex-row justify-between">
                            <p>Total</p>
                            <p className="font-bold">₱ {total.toLocaleString()}</p>
                        </div>
                        <a href="/checkout">
                            <button className="w-full bg-primary text-white py-5">Checkout</button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}