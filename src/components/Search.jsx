import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom"

export default function Search({ className, hidden }) {
    const [value, setValue] = useState('')
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const filter = searchParams.get('filter')
    const path = filter ? `/products?keyword=${value}&filter=${filter}&page=1` : `/products?keyword=${value}&page=1`

    const search = () => {
        if (value) navigate(path)
    }

    useEffect(() => {
        const keyword = searchParams.get('keyword')
        if (keyword) {
            setValue(keyword, keyword)
        }
    }, [searchParams])

    return (
        <div className={className}>
            <input
                type="text"
                className="mr-2 w-full md:w-40 lg:w-80 px-4 py-2 text-primary bg-white border rounded-md focus:border-primary focus:outline-none"
                placeholder="Search Products..."
                value={value} onChange={(evt) => { setValue(evt.target.value) }}
                onKeyDown={event => { if (event.key === 'Enter') { search() } }}
            />
            <button onClick={search} className={`${hidden ? "hidden" : "visible"} px-4 py-2 text-white bg-primary border-l rounded`}>
                Search
            </button>
        </div>
    )
}