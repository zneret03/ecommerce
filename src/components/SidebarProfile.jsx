// an attemp fix for stopping the component from rerendering
// STILL DOESNT WORK
import React, { useState, useEffect } from "react"
function SidebarProfile() {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
  
    // from react docs: request on load 
    useEffect(() => {
      fetch("/api/v1/user")
        .then(res => res.json())
        .then(
          (result) => {
            setData(result.data);
          },
          (error) => {
            setError(error);
          }
        )
    }, [])

    return (
        <div className="text-center text-white flex flex-col items-center justify-center">
          <img
            src="/images/profile_avatar.jpg"
            className="rounded-full w-44 h-44 border-2 border-gray-500 object-cover mb-4"
            alt=""
          />
          <h1 className="font-bold">{data.first_name} {data.last_name}</h1>
          <h2 className="text-sm">{data.email}</h2>
        </div>
    )
}

export default SidebarProfile