import React from "react"

export default function ProductCard({ imageUrl, props }) {
    return (
        <a href={`/product/${props.id}`} >
            <div className="m-1 group flex flex-col w-full lg:w-72 bg-white drop-shadow overflow-hidden inline-block hover:outline outline-primary">
                <div className="h-52 md:h-60 overflow-hidden">
                    <img className="object-cover w-full h-full" src={imageUrl} alt={`${props.productName}`} />
                </div>
                <div className="flex flex-col justify-between p-3 h-24 group-hover:bg-primary">
                    <div className="text-base md:text-lg text-gray-700 truncate h-12 group-hover:text-white">{props.productName}</div>
                    <div className="flex flex-row justify-between items-end ">
                        <span className="text-base md:text-xl text-primary group-hover:text-white">₱{props.price.toLocaleString()}</span>
                        <div className="flex flex-row gap-x-1 items-center text-sm">
                            <p className="text-gray-500">{props.sold}</p>
                            <p className="text-gray-500">Sold</p>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}