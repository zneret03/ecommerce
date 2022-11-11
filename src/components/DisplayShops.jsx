import React from "react"
import { useState, useEffect } from "react"
import { axiosRequest } from "api"
import { useSearchParams } from "react-router-dom"
import { Frown } from "react-feather"

export default function DisplayShops({ className, set, filter }) {
    const product_url = '/api/v1/products'
    const img_url = '/api/v1/images'

    const [shops, setShops] = useState([])
    const [searchParams] = useSearchParams()
    const url = (!filter) ? `${product_url}?${searchParams}` : `${product_url}?filter=${filter}&page=1`
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
                setShops(res)
                setLength(data.message)
                setLoaded(true)
            }
        }

        getProducts();
    }, [url])

    return (
        <>
            <div className={`${className} gap-2 md:gap-3`}>
                {shops.map((shop) => {
                    return (
                        <a href={`/shop?shop=${shop.id}&page=1`} key={shop.id}>
                            <div className="m-1 group flex flex-col w-full lg:w-72 bg-white drop-shadow overflow-hidden inline-block hover:outline outline-primary">
                                <div className="h-52 md:h-60 overflow-hidden">
                                    <img className="object-cover w-full h-full" src={`${img_url}/${shop.id}`} alt={`${shop.shopName}`} />
                                </div>
                                <div className="flex flex-col justify-between p-3 group-hover:bg-primary">
                                    <div className="text-xl truncate group-hover:text-white text-primary">{shop.shopName}</div>
                                    <span className="text-base text-gray-600 group-hover:text-white/75">{shop.address}</span>
                                </div>
                            </div>
                        </a>
                    )
                })}
            </div>
            {shops.length === 0 && isLoaded ?
                <div className="flex flex-col justify-center items-center p-10 gap-y-3 text-gray-800">
                    <Frown className="w-20 h-20" />
                    <p className="font-medium text-xl">No Shops found!</p>
                </div>
                : ""}
        </>
    )
}