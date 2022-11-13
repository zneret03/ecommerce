import React from "react"
import { Sidebar } from "./"

export default function Layout({ children, title, description, size}) {
  return (
    <div className={`flex flex-col md:flex-row md:bg-amber-900 ${size}`}>
      <Sidebar />
      <div className="w-full bg-white">
        <div className="flex flex-col pb-4 pt-4 px-4 md:pt-8 bg-white">
          <span className="text-3xl font-bold text-center md:text-left">{title}</span>
          <p className="text-gray-400 my-1 md:w-1/2 text-center md:text-left">{description}</p>
        </div>
        <aside className="my-4 w-full px-4">{children}</aside>
      </div>
    </div>
  )
}
