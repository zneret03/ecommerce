import React from "react"
import { useState, useEffect } from "react"
import { axiosRequest } from "api"
import { useLocation } from "react-router-dom"

export default function ProductPage() {
    const url = '/api/v1/product'
    const query = useLocation()
    const prodID = query.pathname.substring(query.pathname.lastIndexOf('/') + 1)
    const [product, setProduct] = useState([])

    useEffect(() => {
        const getProduct = async() => {
            const response = await axiosRequest.get(`${url}/${prodID}`)
            const {status, data} = response
            if(status===200) {
                const prod = data.data
                setProduct(prod)
            }
        }

        getProduct()
    }, [prodID])

    return (
        <div>
            <p>{product.productName}</p>
            <p>{product.description}</p>
        </div>
    )
}