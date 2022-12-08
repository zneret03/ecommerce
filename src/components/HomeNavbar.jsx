import React from "react"
import { Search } from "components"
import { useNavigate, useSearchParams } from "react-router-dom"

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
        title: "Unisex",
        name: "unisex",
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
    const navigate = useNavigate()

    const click = (name) => {
        if (filter === name) {
            navigate(`${url}&page=1`)
        }
        else {
            navigate(`${url}filter=${name}&page=1`)
        }
    }

    return (
        <nav className="md:static bg-white md:px-5 w-full border-b-4 border-primary">
            <div className="flex md:justify-between w-full">
                <ul className="flex justify-center md:justify-start flex-row w-full">
                    {navItems.map(type => {
                        return (
                            <li key={type.id}>
                                <button onClick={() => click(type.name)} className={`${filter === type.name ? 'bg-primary text-white' : "text-gray-800"}
                                     lg:px-8 md:text-xl text-base font-medium p-5 hover:bg-primary hover:text-white`}>{type.title}</button>
                            </li>
                        )
                    })}
                </ul>
                <Search className="md:flex sm:items-center w-100 hidden" hidden={false} />
            </div>
        </nav>
    )
}

