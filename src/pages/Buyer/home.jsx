import React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { axiosRequest } from "api"
import { HomeNavbar, Navbar, Banner, FeatureProduct, Footer } from 'components'

export default function Home() {
  const url = '/api/v1/user'
  const navigate = useNavigate();

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

  return (
    <>
      <Navbar />
      <HomeNavbar />
      <Banner />
      <div className="flex flex-col gap-y-5 mb-5">
        <FeatureProduct filter={'featured'} name={'Featured'} />
        <FeatureProduct filter={'latest'} name={'Latest'} />
      </div>
      <Footer />
    </>
  )
}
