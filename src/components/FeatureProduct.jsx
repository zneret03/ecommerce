import React from "react"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "react-feather"
import { DisplayProducts } from 'components'

export default function FeatureProduct({name, filter}) {

    const ref = useRef(null)
    const left = () => {
        ref.current.scrollLeft -= ref.current.scrollWidth/10
    }

    const right = () => {
        ref.current.scrollLeft += ref.current.scrollWidth/10
    }

    return (
        <div className="flex flex-col px-4 md:px-7">
            <div className="flex flex-row justify-between items-center mb-5 md:mb-0">
                <a href={`/products?filter=${filter}&page=1`} className="flex flex-row text-xl font-bold">
                    <h6 className="text-primary mr-1">{name}</h6>
                    <h6>Products</h6>
                </a>
                <div className="mx-4 w-3/4 lg:w-4/5 bg-gray-200 h-1 "></div>
                <div className="hidden sm:grid grid-cols-2 gap-2">
                    <button onClick={left} className="bg-gray-200 text-gray-600 hover:bg-primary hover:text-white">
                        <ChevronLeft/>
                    </button>
                    <button onClick={right} className="bg-gray-200 text-gray-600 hover:bg-primary hover:text-white">
                        <ChevronRight/>
                    </button>
                </div>
            </div>

            <div ref={ref} className="p-4 overflow-x-scroll sm:overflow-x-hidden scroll-smooth">
                <DisplayProducts className="flex flew-row flex-nowrap w-max" set={(e) => {}}/>
            </div>
        </div>
    )
}