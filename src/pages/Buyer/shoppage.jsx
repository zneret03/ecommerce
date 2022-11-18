import React, { useState, useEffect } from "react"
import { Navbar, DisplayProducts, Footer } from 'components'
import { useSearchParams } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "react-feather"
import { axiosRequest } from "api"

export default function Shoppage() {
    const imageUrl = '/api/v1/images'
    const url = '/api/v1/seller/shop'

    const [searchParams, setSearchParams] = useSearchParams()
    const shopID = searchParams.get('shop')
    const current = parseInt(searchParams.get('page'))
    const [pageNumbers, setPageNumber] = useState([])
    const [currentPage, setCurrent] = useState(current)
    const [length, setLength] = useState([])
    const [shop, setShop] = useState([])
    const [date, setDate] = useState("")

    const click = (page) => {
        if (page === "...") return
        setCurrent(page)
    }

    const numberPerPage = 12

    useEffect(() => {
        setSearchParams({ 'shop': shopID, 'page': currentPage })

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

        const pages = Math.ceil(length / numberPerPage)
        if (currentPage > 3) {
            if ((pages - currentPage) === 2) {
                setPageNumber([
                    1, "...", currentPage, currentPage + 1, currentPage + 2
                ])
            }
            else if ((pages - currentPage) === 1) {
                setPageNumber([
                    1, "...", currentPage - 1, currentPage, currentPage + 1
                ])
            }
            else if (currentPage === pages) {
                setPageNumber([
                    1, "...", currentPage - 2, currentPage - 1, currentPage
                ])
            }
            else {
                setPageNumber([
                    1, "...", currentPage, currentPage + 1, currentPage + 2
                ])
            }
        }
        else {
            if (pages > 5) {
                setPageNumber(Array.from({ length: 5 }, (_, i) => i + 1))
            } else {
                setPageNumber(Array.from({ length: pages }, (_, i) => i + 1))
            }
        }

    }, [currentPage, setSearchParams, length, shopID])

    const arrow = (dir) => {
        if (dir === "left" && currentPage > 1) {
            setCurrent(prevState => prevState - 1)
        }

        if (dir === "right" && currentPage !== pageNumbers.at(-1)) {
            setCurrent(prevState => prevState + 1)
        }
    }

    const set = (value) => {
        setLength(value)
    }

    return (
        <>
            <Navbar />
            <section className="bg-gray-200">
                <div className="w-full md:p-2 p-1 drop-shadow">
                    <div className="bg-white">
                        <div className="flex flex-col md:flex-row w-full p-3">
                            <div className="md:w-60 w-48 overflow-hidden border mr-10">
                                <img className="object-cover w-full h-full" src={`${imageUrl}/${shop.image}`} alt="" />
                            </div>
                            <div className="flex flex-col pr-2 md:w-4/6 w-full mt-3 md:mt-0">
                                <div className="text-3xl text-primary whitespace-normal mb-2">{shop.shopName}</div>
                                <div className="text-sm mb-3 md:mb-0">{shop.description}</div>
                            </div>
                            <div className="md:ml-1 lg:ml-5 flex flex-col gap-y-2 md:gap-y-3 text-sm justify-center border-l-0 md:border-l-2 md:w-2/5 w-full md:pl-5">
                                <div className="flex flex-row gap-x-2 md:gap-y-0 gap-y-2">
                                    <p className="text-gray-400">Products</p>
                                    <p className="text-primary">{shop.products}</p>
                                </div>
                                <div className=" flex flex-row gap-x-2">
                                    <p className="text-gray-400">Location</p>
                                    <p className="text-primary">{shop.address}</p>
                                </div>
                                <div className="flex flex-row gap-x-2">
                                    <p className="text-gray-400">Seller</p>
                                    <p className="text-primary">{shop.seller}</p>
                                </div>
                                <div className="flex flex-row gap-x-2">
                                    <p className="text-gray-400">Joined</p>
                                    <p className="text-primary">{date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <p className="text-2xl text-gray-700 p-5">Available Products</p>
                </div>
                <div className="md:py-1 flex justify-center">
                    <DisplayProducts page={currentPage} set={set} filter={null} className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4" />
                </div>
                {length ?
                    <div className="flex flex-row justify-center w-full text-gray-900/50 text-lg md:text-xl gap-x-3 md:gap-x-5 py-10">
                        <button onClick={() => { arrow("left") }} className="hover:text-primary">
                            <ChevronLeft />
                        </button>

                        {pageNumbers.map(page => {
                            return <button onClick={() => { click(page) }} className={`${(currentPage === page) ? "bg-primary text-white" : "hover:text-primary"} rounded-md px-4`} key={page}>{page}</button>
                        })}

                        <button onClick={() => { arrow("right") }} className="hover:text-primary">
                            <ChevronRight />
                        </button>
                    </div>
                    : null
                }

            </section>
            <Footer />
        </>
    )
}
