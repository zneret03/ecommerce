import React from "react"

const navItems = [
    {
        id: 1,
        title: "Men",
        name: "men",
        path: "/products?filter=men&page=1"
    },
    {
        id: 2,
        title: "Women",
        name: "women",
        path: "/products?filter=women&page=1"
    },
    {
        id: 3,
        title: "Kids",
        name: "kids",
        path: "/products?filter=kids&page=1"
    },
    {
        id: 4,
        title: "Best Selling",
        name: "best",
        path: "/products?filter=best&page=1"
    },
]

export default function HomeNavbar({filter}) {
    return (
        <nav className="md:static bg-white md:px-5 w-full border-b-4 border-primary">
            <div className="flex md:justify-between w-full">
                <ul className="flex justify-center md:justify-start flex-row w-full">
                    {navItems.map(type => {
                        return (
                            <li key={type.id}>
                                <a href={type.path}>
                                    <button className={`${filter === type.name ?'bg-primary text-white': "text-gray-800"}
                                     lg:px-8 md:text-xl text-base font-medium p-5 hover:bg-primary hover:text-white`}>{type.title}</button>
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <div className="md:flex sm:items-center w-100 hidden">
                    <div className="flex">
                        <input
                            type="text"
                            className="mr-2 block w-full md:w-40 lg:w-80 px-4 py-2 text-primary bg-white border rounded-md focus:border-primary focus:outline-none"
                            placeholder="Search..."
                        />
                        <button className="md:block px-4 text-white bg-primary border-l rounded ">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

