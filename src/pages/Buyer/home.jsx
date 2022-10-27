import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { axiosRequest } from "api"

export default function Home() {
  const url = '/api/v1/user'
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [isLoaded, setLoad] = useState(false);

  useEffect(() => {
    const getUser = async() => {
      try {
          const response = await axiosRequest.get(url)
  
          const { status, data } = response
          const userData = data.data
          if (status === 200) {
            if ( userData.userType === 'Seller') {
              navigate('/admin')
            }
            setUser(userData)
            setLoad(true)
          }
  
      } catch (e) {
        const { status} = e.response
        if (status === 401) {
          navigate('/login')
        }
  
        if (status === 500) {
          navigate('/404')
        }
      }
    }

    getUser();
  }, [navigate])
  
  if(isLoaded) {
    return (<div>
      home
      {user.user_type}
    </div>)
  }
}
