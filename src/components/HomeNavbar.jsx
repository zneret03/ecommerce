import React from "react"
import {Search} from "components"
import { useSearchParams } from "react-router-dom"

const navItems = [
    {
        id: 1,
        title: "Men",
        name: "men",
    },
    {
        id: 2,
        title: "Women",
        name: "women",
    },
    {
        id: 3,
        title: "Kids",
        name: "kids",
    },
    {
        id: 4,
        title: "Best Selling",
        name: "best",
    },
]

export default function HomeNavbar() {
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')
    const filter = searchParams.get('filter')
    const url = keyword ? `/products?keyword=${keyword}&` : `/products?`

    return (
        <nav className="md:static bg-white md:px-5 w-full border-b-4 border-primary">
            <div className="flex md:justify-between w-full">
                <ul className="flex justify-center md:justify-start flex-row w-full">
                    {navItems.map(type => {
                        return (
                            <li key={type.id}>
                                <a href={`${url}filter=${type.name}&page=1`}>
                                    <button className={`${filter === type.name ?'bg-primary text-white': "text-gray-800"}
                                     lg:px-8 md:text-xl text-base font-medium p-5 hover:bg-primary hover:text-white`}>{type.title}</button>
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <Search className="md:flex sm:items-center w-100 hidden" hidden={false}/>
            </div>
        </nav>
    )
}

