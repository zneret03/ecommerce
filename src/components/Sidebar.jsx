import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { sidebarList } from "data"
import { axiosRequest } from "api"
import { useNavigate } from "react-router-dom"

export default function Sidebar() {
  const query = useLocation()
  const [toggled, setToggle] = useState(false)
  const toogleMenu = () => {
    setToggle(prevState => !prevState)
  }

  const [user, setUser] = useState([]);
  const url = '/api/v1/user/admin'
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async() => {
      try {
          const response = await axiosRequest.get(url)

          const { status, data } = response

          if (status === 200) {
            setUser(data.data)
            
            if (!data.data.shop) {
              navigate('/admin/shop')
            }
          }
      } catch (e) {
          navigate('/404')
      }
    }

    getUser()
  }, [navigate])

  return (
    <section className={`${toggled ? "bg-amber-900" : ""} md:bg-amber-900 md:w-1/4 h-full md:sticky md:top-0`}>
      <button onClick={toogleMenu} className={`${toggled ? "text-white" : "text-primary"}
       inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden`}>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
      </button>
      <div className={`${toggled ? "" : "hidden"} md:block bg-amber-900`}>
        <aside className="sticky top-0 w-full h-max py-12 px-4">
          <div className="text-center text-white flex flex-col items-center justify-center">
            <img
              src="/images/profile_avatar.jpg"
              className="rounded-full w-44 h-44 border-2 border-gray-500 object-cover mb-4"
              alt=""
            />
            <h1 className="font-bold">{user.firstName} {user.lastName}</h1>
            <h2 className="text-sm">{user.email}</h2>
          </div>
          <ul className="space-y-3 mt-10">
            {sidebarList.map((type) => {
              return (
                <li key={type.id} className={(type.shop && !user.shop) ? 'hidden' : 'block'}>
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
