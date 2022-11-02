import React from "react"
import { useState, useEffect } from "react"
import { ProductCard } from 'components'
import { axiosRequest } from "api"

export default function DisplayProducts({ filter }) {
    const product_url = '/api/v1/products'
    const img_url = '/api/v1/images'

    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const url = filter ? `${product_url}/${filter}`: product_url
            const response = await axiosRequest.get(url)
            const { status, data } = response

            if (status === 200) {
                const res = data.data
                setProducts(res)
            }
        }

        getProducts();
    }, [filter])

    return (
        <section className="bg-gray-100">
            <div className="grid grid-cols-2 gap-2 md:gap-4 p-3 md:p-6 md:grid-cols-3 lg:grid-cols-5">
                {products.map((product) => {
                    return <ProductCard props={product} imageUrl={`${img_url}/${product.id}`} />
                })}
            </div>
        </section>
    )
}