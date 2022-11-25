import React, { useState, useEffect } from "react"
import { HomeNavbar, Navbar, DisplayProducts, DisplayShops, Footer } from 'components'
import { useSearchParams } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "react-feather"

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams()

    const filter = searchParams.get('filter')
    const current = parseInt(searchParams.get('page'))
    const keyword = searchParams.get('keyword')

    const [pageNumbers, setPageNumber] = useState([])
    const [currentPage, setCurrent] = useState(current)
    const [length, setLength] = useState([])

    const click = (page) => {
        if (page === "...") return
        setCurrent(page)
    }

    const numberPerPage = 12

    useEffect(() => {
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

    }, [currentPage, filter, keyword, setSearchParams, length])

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
            <HomeNavbar />
            <section className="bg-gray-200">
                <div className="w-full flex justify-center gap-x-5">
                    {keyword ? <p className="text-2xl text-gray-700 py-5">Results for {keyword}</p> : null}
                    {filter ? <p className="text-2xl text-gray-700 py-5">{filter.toLocaleUpperCase()}</p> : null}
                </div>
                <div className="md:py-4 flex justify-center">
                {filter === 'shops'
                    ? <DisplayShops className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4" page={currentPage} set={set} filter={null}/>
                    : <DisplayProducts className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4" page={currentPage} set={set} filter={null} />
                }
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
