import React, {useState} from "react"
import { Link, useLocation } from "react-router-dom"
import { sidebarList } from "data"
import { SidebarProfile } from "./"

export default function Sidebar() {
  const query = useLocation()
  const [toggled, setToggle] = useState(false)
  const toogleMenu = () => {
    setToggle(prevState => !prevState)
  }

  return (
    <section className={`${toggled ? "bg-amber-900":""} md:bg-amber-900 md:w-1/4 h-auto`}>
      <button onClick={toogleMenu} className={`${toggled ? "text-white":"text-primary"}
       inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden`}>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
      </button>
      <div className={`${toggled ? "":"hidden"} md:block`}>
        <aside className="sticky top-0 w-full h-screen py-12 px-4">
          <SidebarProfile />
          <ul className="space-y-3 mt-10">
            {sidebarList.map((type) => {
              return (
                <li key={type.id}>
                  <Link
                    to={type.path}
                    className={`${type.path === query.pathname
                      ? "bg-amber-800 text-white"
                      : "text-white"
                      } flex items-center hover:text-white hover:bg-amber-800 cursor-pointer transition-all rounded-sm py-2 font-bold`}
                  >
                    <i className="mx-2 ml-3">{type.icon}</i>
                    <span className="text-lg md:text-sm">{type.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </aside>
      </div>
    </section>
  )
}
