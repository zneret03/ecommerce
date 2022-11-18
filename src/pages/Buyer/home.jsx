import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { axiosRequest } from "api"
import { HomeNavbar, Navbar, Banner, FeatureProduct, Footer } from 'components'

export default function Home() {
  const url = '/api/v1/user'
  const navigate = useNavigate();
  const [user, setUser] = useState(false)

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
          setUser(userData)
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

  return (
    <>
      {user ?
        <>
          <Navbar />
          <HomeNavbar />
          <Banner />
          <div className="flex flex-col gap-y-5 mb-5">
            <FeatureProduct filter={'recommended'} name={'Recommended Products'} />
            <FeatureProduct filter={'latest'} name={'Latest Products'} />
            <FeatureProduct filter={'shops'} name={'Browse Local Shops'} />
          </div>
          <Footer />
        </>
        : null
      }

    </>
  )
}
