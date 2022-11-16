import React from "react"

export default function Banner() {
    return (
        <div>
            <div className="w-full h-96 bg-gray-200 overflow-hidden">
                <img  className="object-cover w-full h-full" src="images/banner/banner.png" alt="banner1"/>
            </div>

           <div className="flex flex-col items-center flex text-center flex-col my-5 text-sm">
                <p className="w-5/6"> We offer top-quality clothing. This is a local clothing brand/products where our local artists 
                    showcase their best, most comfortable to use, and most affordable products here in ILOILO CITY, 
                    THE CITY OF LOVE!. Don't miss out on getting our affordable and best products here at SHOPERTY. 
                </p >
                <p className="w-5/6">LET'S SUPPORT OUR LOCAL PRODUCTS!</p>
           </div>
        </div>
    )
}