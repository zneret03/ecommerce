import React from "react"
import { useState, useEffect } from "react"
import { axiosRequest } from "api"
import { useLocation } from "react-router-dom"
import { Navbar, FeatureProduct } from "components"
import { Plus, Minus, ShoppingCart } from "react-feather"

export default function ProductPage() {
    const url = '/api/v1/product'
    const imageUrl = '/api/v1/images'
    const query = useLocation()
    const prodID = query.pathname.substring(query.pathname.lastIndexOf('/') + 1)
    const [product, setProduct] = useState([])
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const getProduct = async () => {
            const response = await axiosRequest.get(`${url}/${prodID}`)
            const { status, data } = response
            if (status === 200) {
                const prod = data.data
                setProduct(prod)
            }
        }

        getProduct()
    }, [prodID])

    const left = () => {
        if (quantity > 1)
            setQuantity(prevState => prevState - 1)

    }

    const right = () => {
        setQuantity(prevState => prevState + 1)
    }

    return (
        <>
            <Navbar />
            <section className="bg-gray-200 w-100 p-3">
                <div className="bg-white px-3 py-4 flex flex-col md:flex-row">
                    <div className="w-full md:w-2/5 overflow-hidden">
                        <img className="object-cover w-full h-full" src={`${imageUrl}/${prodID}`} alt="" />
                    </div>
                    <div className="flex flex-col justify-between w-full mt-2 md:mt-0 md:pl-10 md:pr-5 md:w-3/5">
                        <div className="flex flex-col h-full text-gray-800 gap-y-5">
                            <div className="text-4xl font-medium">{product.productName}</div>
                            <div className="text-4xl font-medium py-4 px-6 bg-gray-100 text-primary">₱{product.price}</div>
                            <div className="flex flex-col gap-y-2">
                                <div className="text-lg font-medium mr-5 text-gray-700">Description</div>
                                <div className="text-base h-full md:h-2/5">{product.description}</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-3 pt-5">
                            <div className="flex flex-row items-center justify-between h-10">
                                <div className="text-lg font-medium mr-5 text-gray-700">Quantity</div>
                                <div className="flex flex-row items-center">
                                    <button onClick={left} className="flex justify-center items-center w-10 h-10 text-gray-600 hover:bg-primary hover:text-white border border-solid border-gray-300">
                                        <Minus className="w-3/5" />
                                    </button>
                                    <input id="quantity" className="form-control text-center w-12 block text-xl font-normal h-10 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-600 focus:outline-none"
                                        type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                    <button onClick={right} className="flex justify-center items-center w-10 h-10 text-gray-600 hover:bg-primary hover:text-white border border-solid border-gray-300">
                                        <Plus className="w-3/5" />
                                    </button>
                                </div>
                            </div>
                            <button className="flex justify-center w-full items-center p-5 gap-x-3 bg-primary text-white">
                                <ShoppingCart />
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-white py-5 mt-3 ">
                    <FeatureProduct name={"Similar"} filter={"Similar"} />
                </div>
            </section>
        </>
    )
}