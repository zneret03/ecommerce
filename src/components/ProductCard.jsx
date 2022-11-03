import React from "react"
import { Link } from "react-router-dom"

export default function ProductCard({imageUrl, props}) {
    return (
        <Link to={`/product/${props.id}`}>
            <div className="flex flex-col w-full lg:w-72 bg-white rounded-sm shadow-md overflow-hidden inline-block">
                <div className="h-60 overflow-hidden">
                    <img className="object-cover w-full h-full" src={imageUrl} alt={`${props.productName}`}/>
                </div>
                <div className="flex flex-col justify-between px-5 py-2 h-2/6">
                    <h5 className="text-xl tracking-tight text-gray-700">{props.productName}</h5>
                    <div className="flex flex-row justify-between">
                        <span className="text-xl text-primary">₱{props.price}</span>
                        <p className="text-gray-400">Stock: {props.quantity}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}