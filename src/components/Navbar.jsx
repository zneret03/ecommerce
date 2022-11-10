import React, { useEffect, useState } from "react"
import { ShoppingCart } from "react-feather"
import { Link } from "react-router-dom"
import { Search } from 'components'
import { axiosRequest } from "api"

const navItems = [
    {
        id: 1,
        title: "Home",
        path: "/",
    },
    {
        id: 2,
        title: "My Purchase",
        path: "/mypurchase",
    },
    {
        id: 3,
        title: "My Account",
        path: "/myaccount",
    },
    {
        id: 4,
        title: "Logout",
        path: "/logout",
    },
]

export default function Navbar({refresh}) {
    const [isOpen, setOpen] = useState(false)
    const [length, setLength] = useState(0)
    const openMenu = () => {
        setOpen(prevState => !prevState)
    }

    const cart_url = "/api/v1/user/cart"

    useEffect(() => {
        const getCart = async () => {
            const response = await axiosRequest.get(cart_url)
            const { status, data } = response
            if (status === 200) {
                const num = data.message
                setLength(num)
            }
        }
        getCart()
    }, [refresh])

    return (
        <nav className="sticky top-0 bg-white border-gray-200 px-4 py-2 drop-shadow w-full z-10">
            <div className="flex md:flex-row flex-col justify-between items-center ">
                <div className="flex justify-between items-center w-full">
                    <Link to="/">
                        <img src="/images/logo.png" alt="Logo" />
                    </Link>
                    <div className="flex flex-row">
                        <Link to="/cart" className="pr-5 pl-4 py-4 visible rounded-lg md:hidden active:bg-gray-100">
                            <ShoppingCart className="w-7 h-7 text-gray-700" />
                        </Link>

                        <button onClick={openMenu} className="inline-flex items-center p-4 text-sm text-gray-700 rounded-lg md:hidden active:bg-gray-100 ">
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>

                <div className={`${isOpen ? "" : "hidden"} w-full md:block md:w-auto py-4 md:py-0`}>
                    <Search className="md:hidden visible" hidden={true} />
                    <ul className="mt-3 md:mt-0 flex flex-col gap-y-4 md:gap-y-0 md:flex-row text-2xl md:text-base items-center">
                        {navItems.map(type => {
                            return (
                                <li key={type.id} className="p-4 md:w-max w-full text-center md:active:bg-transparent active:bg-gray-100 md:hover:bg-transparent hover:bg-gray-100 rounded-lg">
                                    <Link to={type.path}>
                                        <span className="text-gray-700 rounded md:bg-transparent md:p-0 md:hover:text-primary" aria-current="page">{type.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                        <li className={`px-4 hidden md:block ${length? "mt-[-10px]":"" }`}>
                            <Link to="/cart">
                                {length ?
                                    <div className="p-2 h-3 rounded-full bg-red-600 text-white text-[8px] flex items-center justify-center relative top-2 left-3">
                                        <p>{length}</p>
                                    </div> :
                                    null
                                }

                                <ShoppingCart className="hover:text-primary md:w-auto w-6 h-6" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

