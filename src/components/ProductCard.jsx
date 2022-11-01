import React from "react"

export default function ProductCard({imageUrl, props}) {
    return (
        <div className="flex flex-col w-full bg-white rounded-sm shadow-md overflow-hidden">
            <div className="h-5/6 overflow-hidden">
                <img className="object-cover w-full h-full" src={imageUrl} alt={`${props.productName}`}/>
            </div>
            <div className="flex flex-col justify-between px-5 py-2 h-2/6">
                <h5 className="text-l tracking-tight text-gray-700">{props.productName}</h5>
                <div className="flex flex-row justify-between">
                    <span className="text-l text-orange-600">₱{props.price}</span>
                    <p className="text-gray-400">Stock: {props.quantity}</p>
                </div>
            </div>
        </div>
    )
}