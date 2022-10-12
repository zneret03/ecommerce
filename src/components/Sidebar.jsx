import React from "react"
import { Link, useLocation } from "react-router-dom"
import { sidebarList } from "data"

export default function Sidebar() {
  const query = useLocation()

  return (
    <section className="w-1/4">
      <aside className="sticky top-0 bg-amber-900 w-full h-screen shadow-lg py-12 px-4">
        <div className="text-center text-white flex flex-col items-center justify-center">
          <img
            src="/images/profile_avatar.jpg"
            className="rounded-full w-44 h-44 border-2 border-gray-500 object-cover mb-4"
            alt=""
          />
          <h1 className="font-bold">Ian Drilon</h1>
          <h2 className="text-sm">iandrilon2@gmail.com</h2>
        </div>
        <ul className="space-y-3 mt-10">
          {sidebarList.map((type) => {
            return (
              <li key={type.id}>
                <Link
                  to={type.path}
                  className={`${
                    type.path === query.pathname
                      ? "bg-amber-800 text-white"
                      : "text-white"
                  } flex items-center hover:text-white hover:bg-amber-800 cursor-pointer transition-all rounded-sm py-2 font-bold`}
                >
                  <i className="mx-2 ml-3">{type.icon}</i>
                  <span className="text-sm">{type.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </aside>
    </section>
  )
}
