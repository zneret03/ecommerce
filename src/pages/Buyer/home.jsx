import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { axiosRequest } from "api"
import { HomeNavbar, Navbar, DisplayProducts, Banner, FeatureProduct } from 'components'

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
    if (selected === buttonSelected) {
      setFilter(null)
      setSelected(null)
    } else {
      setFilter(fil)
      setSelected(selected)
    }
  }

  return (
    <div>
      <Navbar />
      <HomeNavbar filtered={filtered} selected={buttonSelected} />
      {filter
        ? <div className="p-2 md:p-4  bg-gray-200">
          <DisplayProducts filter={filter} className="grid grid-cols-2 md:flex md:flex-wrap gap-2 justify-center" />
        </div>
        : <div>
          <Banner />
          <FeatureProduct filter={'Featured'} />
          <FeatureProduct filter={'Latest'} />
        </div>
      }
    </div>
  )
}
