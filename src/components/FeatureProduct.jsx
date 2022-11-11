import React from "react"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "react-feather"
import { DisplayProducts, DisplayShops } from 'components'

export default function FeatureProduct({ name, filter }) {

    const ref = useRef(null)
    const left = () => {
        ref.current.scrollLeft -= ref.current.scrollWidth / 10
    }

    const right = () => {
        ref.current.scrollLeft += ref.current.scrollWidth / 10
    }

    const highlighted = name.split(" ")[0]
    const normal = name.slice(highlighted.length, name.length)

    return (
        <div className="flex flex-col px-4 md:px-7">
            <div className="flex flex-row justify-between items-center mb-5 md:mb-0">
                <a href={`/products?filter=${filter}&page=1`} className="flex flex-row text-xl font-bold">
                    <h6 className="text-primary mr-2">{highlighted}</h6>
                    <h6 className="w-max text-gray-900">{normal}</h6>
                </a>
                <div className="mx-4 w-full bg-gray-200 h-1 "></div>
                <div className="hidden sm:grid grid-cols-2 gap-2">
                    <button onClick={left} className="bg-gray-200 text-gray-600 hover:bg-primary hover:text-white">
                        <ChevronLeft />
                    </button>
                    <button onClick={right} className="bg-gray-200 text-gray-600 hover:bg-primary hover:text-white">
                        <ChevronRight />
                    </button>
                </div>
            </div>

            <div ref={ref} className="p-4 overflow-x-scroll sm:overflow-x-hidden scroll-smooth">
                {filter === 'shops'
                    ? <DisplayShops className="flex flew-row flex-nowrap w-max" filter={filter} set={(e) => { }}/>
                    : <DisplayProducts className="flex flew-row flex-nowrap w-max" filter={filter} set={(e) => { }} />
                }

            </div>
        </div>
    )
}