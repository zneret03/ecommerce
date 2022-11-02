import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { axiosRequest } from "api"
import { HomeNavbar, Navbar, DisplayProducts} from 'components'

export default function Home() {
  const url = '/api/v1/user'
  const navigate = useNavigate();
  const [filter, setFilter] = useState(null)
  const [buttonSelected, setSelected] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosRequest.get(url)

        const { status, data } = response
        const userData = data.data
        if (status === 200) {
          if (userData.userType === 'Seller') {
            navigate('/admin')
          }
        }

      } catch (e) {
        const { status } = e.response
        if (status === 401) {
          navigate('/login')
        }

        if (status === 500) {
          navigate('/404')
        }
      }
    }
    getUser()
  }, [navigate])

  const filtered = (fil, selected) => {
    setFilter(fil)
    setSelected(selected)
  } 

  return (
    <div>
      <Navbar />
      <HomeNavbar filtered={filtered} selected={buttonSelected}/>
      <DisplayProducts filter={filter}/>
    </div>
  )
}
