import React from "react"
import { useState, useEffect } from "react"
import { ProductCard } from 'components'
import { axiosRequest } from "api"

export default function DisplayProducts({ filter, className, page, setLength }) {
    const product_url = '/api/v1/products'
    const img_url = '/api/v1/images'

    const [products, setProducts] = useState([])

    useEffect(() => {
        const url = filter ? `${product_url}?filter=${filter}&page=${page?page:1}`: product_url
        const getProducts = async () => {
            const response = await axiosRequest.get(url)
            const { status, data } = response

            if (status === 200) {
                const res = data.data
                setProducts(res)
                setLength(data.message)
            }
        }

        getProducts();
    }, [filter, page, setLength])

    return (
            <div className={`${className} mx-2 p-2 gap-2 md:gap-3`}>
                {products.map((product) => {
                    return <ProductCard props={product} imageUrl={`${img_url}/${product.id}`} key={product.id}/>
                })}
            </div>
    )
}