import React from "react"
import { Link } from "react-router-dom"

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
        title: "Best Selling Products",
        name: "best",
    },
]

export default function HomeNavbar({ filtered, selected }) {
    return (
        <nav className="bg-white pl-4 pr-5 w-full border-b-4 md:border-amber-600">
            <div className="hidden md:flex justify-center md:justify-between w-full">
                <ul className="flex flex-row">
                    {navItems.map(type => {
                        return (
                            <li key={type.id}>
                                <Link to={type.path}>
                                    <button onClick={() => {filtered(type.name, type.id)}} className={`${selected === type.id ?'bg-amber-600 text-white': "text-gray-800"}
                                    px-6 lg:px-8 md:text-xl font-medium py-5 hover:bg-amber-600 hover:text-white`}>{type.title}</button>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <div className="flex sm:items-center">
                    <div className="flex">
                        <input
                            type="text"
                            className="mr-2 block md:w-40 lg:w-80 px-4 py-2 text-amber-800 bg-white border rounded-md focus:border-amber-400 focus:outline-none"
                            placeholder="Search..."
                        />
                        <button className="px-4 text-white bg-amber-600 border-l rounded ">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

