import React from "react"
import { useState, useEffect } from "react"
import { ProductCard } from 'components'
import { axiosRequest } from "api"

export default function DisplayProducts({ filter, className }) {
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
            <div className={`${className}  gap-2`}>
                {products.map((product) => {
                    return <ProductCard props={product} imageUrl={`${img_url}/${product.id}`} />
                })}
            </div>
    )
}