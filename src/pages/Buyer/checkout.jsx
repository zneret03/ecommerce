import React, { useEffect, useState } from 'react'
import { Navbar, Footer, InputField } from 'components'
import { MapPin } from "react-feather"
import { axiosRequest } from "api"
import swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const initialState = {
    fullname: "",
    number: "",
    address: "",
}

export default function Checkout() {
    const cart_url = "/api/v1/user/cart"
    const user_url = '/api/v1/user/delivery'
    const checkout_url = '/api/v1/checkout'
    const imageUrl = "/api/v1/images"
    const [products, setProducts] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const [subtotal, setSubtotal] = useState(0)
    const [shipping, setShipping] = useState(0)
    const [tax, setTax] = useState(0)
    const [total, setTotal] = useState(0)

    const navigate = useNavigate();

    const [{ fullname, number, address }, setState] = useState(initialState)

    const onChange = (event) => {
        const { name, value } = event.target
        setState((prevState) => ({ ...prevState, [name]: value }))
    }

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
                }
            }
        }

        const getUser = async() => {
            try {
                const response = await axiosRequest.get(user_url)
                const { status, data } = response

                if (status === 200) {
                    setState(data.data)
                }
            } catch (e) {

            }
        }

        getUser()
        getCart()
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault()
        const datas = {fullname, number, address}
        const response = await axiosRequest.post(checkout_url, datas)
        const { status } = response
        if (status === 201) {
            swal.fire({
                title: "Order Successfull!",
                icon: "success",
            }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/mypurchase')
                }
              })
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col w-full text-gray-800">
                <form onSubmit={(event) => onSubmit(event)}>
                    <div className="font-bold text-3xl bg-white px-10 py-5">Checkout</div>
                    <div className="w-full py-2 px-5 bg-gray-100 flex flex-col gap-y-3">
                        <div className="bg-white p-8 flex flex-col gap-y-3">
                            <div className="flex flex-row text-primary gap-x-2 items-center">
                                <MapPin className="w-4 h-4" />
                                <p className="text-base font-medium">Delivery Address</p>
                            </div>
                            <div className="flex flex-col text-gray-800 gap-x-5 gap-y-1">

                                <div className="flex flex-row justify-between items-center">
                                    <p className="w-32">Full Name:</p>
                                    <InputField
                                        type="text"
                                        name="fullname"
                                        value={fullname}
                                        onChange={(event) => onChange(event)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <p className="w-32">Number:</p>
                                    <InputField
                                        id = "quantity"
                                        type="number"
                                        name="number"
                                        value={number}
                                        onChange={(event) => onChange(event)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <p className="w-32">Address:</p>
                                    <InputField
                                        type="text"
                                        name="address"
                                        value={address}
                                        onChange={(event) => onChange(event)}
                                        required
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <div className="grid grid-cols-6 bg-white px-10 py-3">
                                <div className="col-span-3">
                                    <p className="text-xl font-medium">Products Ordered</p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <p>Price</p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <p>Quantity</p>
                                </div>
                                <div className="flex items-center justify-end">
                                    <p>Total</p>
                                </div>
                            </div>

                            {isLoaded ? products.map((product) => {
                                return (
                                    <div className="py-3 px-10 bg-white w-full" key={product.id}>
                                        <div className="grid grid-cols-6 bg-white">
                                            <div className="col-span-3 flex flex-col gap-y-2">
                                                <p className="text-sm text-gray-600">{product.shop}</p>
                                                <div className="flex flex-row gap-x-5 items-center">
                                                    <div className="bg-gray-200 w-16 h-16 hidden md:block">
                                                        <img className="object-cover w-full h-full" src={`${imageUrl}/${product.image}`} alt="" />
                                                    </div>
                                                    <p className="text-xl">{product.productName}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <p>₱ {product.price.toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <p>{product.quantity}</p>
                                            </div>
                                            <div className="flex items-center justify-end text-primary ">
                                                <p>₱ {(product.quantity * product.price).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : null}
                        </div>
                    </div>
                    <div className="flex bg-gray-100 px-5">
                        <div className="flex bg-white w-full mb-10 justify-end p-5">
                            <div className="flex flex-col w-full md:w-2/5 text-sm text-gray-500 gap-y-2">
                                <div className="flex flex-row justify-between items-center">
                                    <p>Merchandise Subtotal:</p>
                                    <p>₱ {subtotal.toLocaleString()}</p>
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <p>Shipping Total:</p>
                                    <p>₱ {shipping.toLocaleString()}</p>
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <p>Tax Total:</p>
                                    <p>₱ {tax.toLocaleString()}</p>
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <p>Total Payment:</p>
                                    <p className="text-primary text-3xl">₱ {total.toLocaleString()}</p>
                                </div>
                                <button type="submit" className="w-full bg-primary text-white py-4 mt-5">Place Order</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}