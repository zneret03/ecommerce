import React from "react"
import { Sidebar } from "./"

export default function Layout({ children, title, description }) {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="pt-4 px-4 md:pt-8 w-full">
        <div className="flex flex-col  mb-6">
          <span className="text-3xl font-bold text-center md:text-left">{title}</span>
          <p className="text-gray-400 my-1 md:w-1/2 text-center md:text-left">{description}</p>
        </div>
        <aside className="my-4 w-full">{children}</aside>
      </div>
    </div>
  )
}
