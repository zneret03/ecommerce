import React, { useState, useEffect } from "react"
import { axiosRequest } from "api"
import { ShoppingBag } from "react-feather"

export default function Seller({ shopID }) {
    const url = '/api/v1/seller/shop'
    const imageUrl = '/api/v1/images'
    const [shop, setShop] = useState([])
    const [date, setDate] = useState("")

    useEffect(() => {
        const getShop = async () => {
            const response = await axiosRequest.get(`${url}?shop=${shopID}&page=1`)
            const { status, data } = response
            if (status === 200) {
                const dat = data.data
                setShop(dat)

                const options = { month: 'long', year: "numeric" };
                const newDate = new Date(dat.dateCreated).toLocaleDateString('en-US', options)
                setDate(newDate)
            }
        }
        getShop()
    }, [shopID])

    return (
        <div className="flex flex-col md:flex-row gap-y-2 px-2 lg:px-5 bg-white py-5">
            <div className="w-2/4 flex flex-row">
                <div className="w-24 h-24 rounded-full mr-5 overflow-hidden border">
                    <img className="object-cover w-full h-full" src={`${imageUrl}/${shop.id}`} alt="" />
                </div>
                <div className="flex flex-col gap-y-1 justify-center">
                    <div className="text-2xl text-gray-700 whitespace-normal">{shop.shopName}</div>
                </div>
            </div>

            <div className="flex flex-row gap-y-1 justify-between border-t-2 md:border-l-2 md:border-t-0 md:pl-10 w-full px-5">
                <div className="md:ml-1 lg:ml-5 grid grid-rows-2 py-2 py-4 text-sm">
                    <div className=" flex flex-row gap-x-2 md:gap-y-0 gap-y-2">
                        <p className="text-gray-400">Products</p>
                        <p className="text-primary">{shop.products}</p>
                    </div>
                    <div className=" flex flex-row gap-x-2">
                        <p className="text-gray-400">Location</p>
                        <p className="text-primary">{shop.address}</p>
                    </div>
                </div>
                <div className="md:ml-1 lg:ml-2 grid grid-rows-2 py-4 text-sm">
                    <div className="flex flex-row gap-x-2">
                        <p className="text-gray-400">Seller</p>
                        <p className="text-primary">{shop.seller}</p>
                    </div>
                    <div className="flex flex-row gap-x-2">
                        <p className="text-gray-400">Joined</p>
                        <p className="text-primary">{date}</p>
                    </div>
                </div>
                <div className="md:flex hidden flex-col justify-center">
                    <button className="flex border py-3 px-5 text-gray-600 gap-x-2 justify-center">
                        <ShoppingBag />
                        <p>View Shop</p>
                    </button>
                </div>
            </div>
            <div className="md:hidden flex flex-col justify-center">
                <button className="flex border py-3 px-5 text-gray-600 gap-x-2 justify-center">
                    <ShoppingBag />
                    <p>View Shop</p>
                </button>
            </div>
        </div >
    )
}