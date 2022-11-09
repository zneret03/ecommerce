import React from "react"
import { useState, useEffect } from "react"
import { axiosRequest } from "api"
import { useLocation } from "react-router-dom"
import { Navbar, FeatureProduct, Footer, Seller } from "components"
import { Plus, Minus, ShoppingCart } from "react-feather"
import swal from "sweetalert2"

export default function ProductPage() {
    const url = '/api/v1/product'
    const imageUrl = '/api/v1/images'
    const query = useLocation()
    const prodID = query.pathname.substring(query.pathname.lastIndexOf('/') + 1)
    const [product, setProduct] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [isLoaded, setLoaded] = useState(false)
    const [refresh, setRefresh ] = useState(false)

    useEffect(() => {
        const getProduct = async () => {
            const response = await axiosRequest.get(`${url}/${prodID}`)
            const { status, data } = response
            if (status === 200) {
                const prod = data.data
                setProduct(prod)
                setLoaded(true)
            }
        }
        getProduct()
    }, [prodID])

    const left = () => {
        if (quantity > 1 && product.quantity > 0)
            setQuantity(prevState => prevState - 1)

    }

    const right = () => {
        if (product.quantity > 0 && product.quantity > quantity)
            setQuantity(prevState => prevState + 1)
    }

    const addCart = async (event) => {
        event.preventDefault()
        try {
            const datas = { id: prodID, quantity }
            const response = await axiosRequest.post("/api/v1/user/cart", datas)

            const { status } = response

            if (status === 201) {
                setRefresh(prevState => !prevState)
                swal.fire({
                    title: "Product added to cart!",
                    icon: "success",
                })
            }
        }
        catch {

        }
    }

    return (
        <>
            <Navbar refresh={refresh}/>
            <section className="bg-gray-200 w-100 p-3">
                <div className="bg-white px-3 py-4 flex flex-col md:flex-row mb-3">
                    <div className="w-full md:w-3/6 overflow-hidden">
                        <img className="object-cover w-full h-full" src={`${imageUrl}/${prodID}`} alt="" />
                    </div>
                    {isLoaded ?
                        <div className="flex flex-col justify-between w-full mt-5 md:mt-2 md:mt-0 md:pl-10 md:pr-5 md:w-3/6">
                            <div className="flex flex-col h-full text-gray-800 gap-y-5">
                                <div className="flex flex-row gap-y-2 justify-between">
                                    <div className="text-4xl font-medium">{product.productName}</div>
                                    <div className="flex flex-row gap-x-2 items-center text-sm">
                                        <p className="font-medium">{product.sold}</p>
                                        <p className="text-gray-500">Sold</p>
                                    </div>
                                </div>
                                <div className="text-4xl font-medium py-4 px-6 bg-gray-100 text-primary">₱{product.price.toLocaleString()}</div>
                                <div className="flex flex-col gap-y-2">
                                    <div className="text-lg font-medium mr-5 text-gray-700">Description</div>
                                    <div className="text-base h-full md:h-2/5">{product.description}</div>
                                </div>
                                <div className="flex flex-col gap-y-5">
                                    <div className="flex flex-col gap-y-2">
                                        <div className="text-lg font-medium mr-5 text-gray-700">Product Details</div>
                                        <div className="grid grid-cols-2 w-max gap-x-7 gap-y-2">
                                            <div className="text-base">Gender:</div>
                                            <div className="text-base ">{product.gender}</div>
                                            <div className="text-base">Category:</div>
                                            <div className="text-base ">{product.category}</div>
                                            <div className="text-base">Stock:</div>
                                            <div className="text-base ">{product.quantity}</div>
                                        </div>
                                    </div>
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
                                            type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} readOnly/>
                                        <button onClick={right} className="flex justify-center items-center w-10 h-10 text-gray-600 hover:bg-primary hover:text-white border border-solid border-gray-300">
                                            <Plus className="w-3/5" />
                                        </button>
                                    </div>
                                </div>
                                {product.quantity > 0 ?
                                    <button onClick={addCart} className="flex justify-center w-full items-center p-5 gap-x-3 bg-primary text-white">
                                        <ShoppingCart />
                                        <span>Add to Cart</span>
                                    </button> :
                                    <div className="w-full bg-gray-200 p-5 flex justify-center font-medium">OUT OF STOCK</div>
                                }

                            </div>
                        </div>
                        : null}
                </div>
                {isLoaded ?
                    <Seller shopID={product.shop} />
                    : null
                }
                <div className="bg-white py-5 mt-3 ">
                    <FeatureProduct name={"Similar"} filter={"Similar"} />
                </div>
            </section>
            <Footer />
        </>
    )
}