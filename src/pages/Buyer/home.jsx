import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { axiosRequest } from "api"
import { Navbar, ProductCard } from 'components'

export default function Home() {
  const url = '/api/v1/user'
  const product_url = '/api/v1/products'
  const img_url = '/api/v1/images'
  const navigate = useNavigate();

  const [products, setProducts] = useState([])

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

    const getProducts = async () => {
      const response = await axiosRequest.get(product_url)
      const { status, data } = response

      if (status === 200) {
        const res = data.data
        setProducts(res)
      }
    }

    getUser();
    getProducts();
  }, [navigate])


  return (
    <div>
      <Navbar />
      <section className="bg-gray-100 h-screen">
        <div className="grid grid-cols-2 gap-4 p-6 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => {
            return <ProductCard props={product} imageUrl={`${img_url}/${product.id}`} />
          })}
        </div>
      </section>
    </div>
  )
}
