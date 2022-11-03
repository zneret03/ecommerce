import React from "react"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "react-feather"
import { DisplayProducts } from 'components'

export default function FeatureProduct({filter}) {

    const ref = useRef(null)
    const left = () => {
        ref.current.scrollLeft -= ref.current.scrollWidth/10
    }

    const right = () => {
        ref.current.scrollLeft += ref.current.scrollWidth/10
    }

    return (
        <div className="flex flex-col px-4 md:px-7 my-5">
            <div className="flex flex-row justify-between items-center mb-5 md:mb-0">
                <div className="flex flex-row text-xl font-bold">
                    <h6 className="text-primary mr-1">{filter}</h6>
                    <h6>Products</h6>
                </div>
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

            <div ref={ref} className="py-1 md:py-5 overflow-x-scroll sm:overflow-x-hidden scroll-smooth">
                <DisplayProducts filter={null} className="flex flew-row flex-nowrap w-max" />
            </div>
        </div>
    )
}