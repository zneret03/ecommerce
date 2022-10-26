// an attemp fix for stopping the component from rerendering
// STILL DOESNT WORK
import React, { useState, useEffect } from "react"
import { axiosRequest } from "api"
import { useNavigate } from "react-router-dom"

function SidebarProfile() {
    const [user, setUser] = useState([]);
    const url = '/api/v1/user/admin'
    const navigate = useNavigate();

    // from react docs: request on load 
    useEffect(() => {
      const getUser = async() => {
        try {
            const response = await axiosRequest.get(url)

            const { status, data } = response

            if (status === 200) {
              setUser(data.data)
  
            }
        } catch (e) {
            navigate('/404')
        }
      }

      getUser()
    }, [])

    return (
        <div className="text-center text-white flex flex-col items-center justify-center">
          <img
            src="/images/profile_avatar.jpg"
            className="rounded-full w-44 h-44 border-2 border-gray-500 object-cover mb-4"
            alt=""
          />
          <h1 className="font-bold">{user.first_name} {user.last_name}</h1>
          <h2 className="text-sm">{user.email}</h2>
        </div>
    )
}

export default SidebarProfile