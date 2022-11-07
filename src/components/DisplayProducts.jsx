import React from "react"
import { useState, useEffect } from "react"
import { ProductCard } from 'components'
import { axiosRequest } from "api"
import { useSearchParams } from "react-router-dom"
import { Frown } from "react-feather"

export default function DisplayProducts({ className, set, page }) {
    const product_url = '/api/v1/products'
    const img_url = '/api/v1/images'

    const [products, setProducts] = useState([])
    const [searchParams] = useSearchParams()
    const url = `${product_url}?${searchParams}`
    const [isLoaded, setLoaded] = useState(false)

    const setLength = (length) => {
        set(length)
    }

    useEffect(() => {
        const getProducts = async () => {
            const response = await axiosRequest.get(url)
            const { status, data } = response

            if (status === 200) {
                const res = data.data
                setProducts(res)
                setLength(data.message)
                setLoaded(true)
            }
        }

        getProducts();
    }, [url])

    return (
        <>
            <div className={`${className} gap-2 md:gap-3`}>
                {products.map((product) => {
                    return <ProductCard props={product} imageUrl={`${img_url}/${product.id}`} key={product.id} />
                })}
            </div>
            {products.length === 0 && isLoaded?
                <div className="flex flex-col justify-center items-center p-10 gap-y-3 text-gray-800">
                    <Frown className="w-20 h-20"/>
                    <p className="font-medium text-xl">No product found!</p>
                </div>
                : ""}
        </>
    )
}