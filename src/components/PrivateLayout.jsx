import React from "react"
import { Sidebar } from "./"

export default function Layout({ children, title, description }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8 w-full">
        <div className="mb-6">
          <span className="text-3xl font-bold">{title}</span>
          <p className="text-gray-400 my-1 w-1/2">{description}</p>
        </div>
        <aside className="my-4 w-full">{children}</aside>
      </div>
    </div>
  )
}
