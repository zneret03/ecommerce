import React, { useState, useEffect } from "react"
import { HomeNavbar, Navbar, DisplayProducts, Footer } from 'components'
import { useSearchParams } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "react-feather"

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams()
    const filter = searchParams.get('filter')
    const [pageNumbers, setPageNumber] = useState([])
    const current = parseInt(searchParams.get('page'))
    const [currentPage, setCurrent] = useState(current)
    const [length, setLength] = useState([])

    const click = (page) => {
        if (page === "...") return
        setCurrent(page)
    }

    const numberPerPage = 12

    useEffect(() => {
        setSearchParams({ 'filter': filter, 'page': currentPage })
        const pages = Math.ceil(length/numberPerPage)
        if (currentPage > 3) {
            if((pages-currentPage) === 2) {
                setPageNumber([
                    1, "...", currentPage, currentPage + 1, currentPage + 2
                ])
            }
            else if((pages-currentPage) === 1) {
                setPageNumber([
                    1, "...", currentPage -1, currentPage, currentPage + 1
                ])
            }
            else if(currentPage === pages) {
                setPageNumber([
                    1, "...", currentPage -2, currentPage -1, currentPage
                ])
            }
            else {
                setPageNumber([
                    1, "...", currentPage, currentPage + 1, currentPage +2
                ])
            }
        } 
        else {
            if(pages > 5) {
                setPageNumber(Array.from({length: 5}, (_, i) => i + 1))
            } else {
                setPageNumber(Array.from({length: pages}, (_, i) => i + 1))
            }
        }

    }, [currentPage, filter, setSearchParams, length])

    const arrow = (dir) => {
        if (dir === "left" && currentPage > 1) {
            setCurrent(prevState => prevState - 1)
        }

        if (dir === "right" && currentPage !== pageNumbers.at(-1)) {
            setCurrent(prevState => prevState + 1)
        }
    }

    return (
        <>
            <Navbar />
            <HomeNavbar filter={filter} />
            <section className="bg-gray-200">
                <div className="py-1 md:py-4 flex justify-center">
                    <DisplayProducts filter={filter} page={currentPage} setLength={setLength} className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4" />
                </div>
                <div className="flex flex-row justify-center w-full text-gray-900/50 text-xl gap-x-5 py-10">
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
            </section>
            <Footer />
        </>
    )
}