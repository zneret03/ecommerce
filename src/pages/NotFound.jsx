import React from 'react'

export default function NotFound() {
    return (
        <div className="max-w-screen text-center flex flex-col h-screen flex flex-col justify-center items-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-orange-600">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-600 md:text-4xl">Something's missing.</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
        </div>
    )
}