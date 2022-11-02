import React from "react"
import { ShoppingCart } from "react-feather"
import { Link } from "react-router-dom"

const navItems = [
    {
        id: 1,
        title: "Home",
        path: "/",
    },
    {
        id: 2,
        title: "My Purchase",
        path: "/",
    },
    {
        id: 3,
        title: "My Account",
        path: "/",
    },
    {
        id: 4,
        title: "Logout",
        path: "/logout",
    },
]

export default function Navbar() {
    return (
        <nav className="bg-white border-gray-200 px-2 py-2.5 drop-shadow w-full">
            <div className="mr-5 flex justify-between items-center">
                <a href="/">
                    <img src="images/logo.png" className="h-10 sm:h-9" alt="Logo" />
                </a>
                <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                        {navItems.map(type => {
                            return (
                                <li key={type.id}> 
                                    <Link to={type.path}>
                                        <span class="block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent md:p-0 hover:text-amber-600" aria-current="page">{type.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                        <li> 
                            <Link to="/">
                                <ShoppingCart className="hover:text-amber-600"/>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

