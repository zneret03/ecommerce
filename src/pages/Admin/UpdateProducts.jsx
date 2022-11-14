import React from "react"
import { PrivateLayout, Back, InputField, SelectDropdown, ImageField } from "components"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { axiosRequest } from "api"
import swal from "sweetalert2"
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  productName: "",
  price: "",
  description: "",
  gender: "",
  category: "",
}

export default function UpdateProducts() {
  const url = '/api/v1/product/category'
  const prod_url = '/api/v1/admin/product'
  const image_url = '/api/v1/images'

  const [image, setImage] = useState([])

  const query = useLocation()
  const formData = new FormData();

  const prodID = query.pathname.substring(query.pathname.lastIndexOf('/') + 1)

  const navigate = useNavigate();

  const [
    { productName, price, description, gender, category },
    setState,
  ] = useState(initialState)

  const [categoryOptions, setCategoryOptions] = useState([])
  const [genderOptions, setGenderOptions] = useState([])

  const onChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const datas = {
      productName,
      price,
      description,
      gender,
      category,
    }

    genderOptions.forEach((type)=> {
      if(type.gender === gender) {
        datas.gender = type.id
      }
    })

    categoryOptions.forEach((type)=> {
      if(type.categoryName === category) {
        datas.category = type.id
      }
    })

    for (let key in datas) {
      formData.append(key, datas[key]);
    }

    try {
      const response = await axiosRequest.post(`${prod_url}/${prodID}`, formData)
      const { status } = response

      if (status === 201) {
        swal.fire({
          title: "Successfully Updated",
          text: "click ok to continue",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/admin/products')
          }
        })
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const setImageData = image => {
    formData.append(
      'image',
      image,
      uuidv4()
    )
  }

  useEffect(() => {
    let categoryList
    let genderList

    const getCategory = async () => {
      try {
        const response = await axiosRequest.get(url)

        const { status, data } = response

        if (status === 200) {
          categoryList = data.data.categoryList
          genderList = data.data.genderList
          setCategoryOptions(categoryList)
          setGenderOptions(genderList)
        }

        if (status === 204) {
          swal.fire({
            title: "No category available",
            text: "Please add a category first",
            icon: "warning",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/admin/category')
            }
          })
        }
      }
      catch (e) {
        const { status } = e.response
        console.log(status)
      }
    }

    const getProduct = async () => {
      try {
        const response = await axiosRequest.get(`${prod_url}/${prodID}`)

        const { status, data } = response
        const prod_data = data.data
        if (status === 200) {
          setState(prod_data)
          setImage(data.data.image)
        }
      }
      catch (e) {
        console.log(e)
      }
    }

    getCategory()
    getProduct()
    
  }, [navigate, prodID])

  return (
    <PrivateLayout
      title="Update Products"
      description="this page where you can update products"
      size='md:h-screen'
    >
      <Back to="/admin/products" />
      <section className="pt-8">
        <form onSubmit={(event) => onSubmit(event)}>
          <div className="">
            <div className="grid md:grid-rows-0 md:grid-cols-2 md:gap-10">
              <div>
                <div className="mb-6">
                  <InputField
                    type="text"
                    name='productName'
                    value={productName}
                    onChange={(event) => onChange(event)}
                    placeholder="Product Name"
                    required
                  />
                </div>

                <div className="mb-6">
                  <textarea
                    name='description'
                    value={description}
                    onChange={(event) => onChange(event)}
                    placeholder="Description"
                    required
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <div className="mb-6">
                  <InputField
                    type="number"
                    name='price'
                    value={price}
                    onChange={(event) => onChange(event)}
                    placeholder="Price"
                    required
                  />
                </div>

                <div className="mb-6 grid grid-cols-2 gap-2">
                  <SelectDropdown name="gender" onChange={(event) => onChange(event)}>
                    <option disabled>
                      Gender
                    </option>
                    {genderOptions.map((type) => {
                      if (type.gender === gender) {
                        return (
                          <option selected key={type.id} value={type.id}>{type.gender}</option>
                        )
                      }
                      else {
                        return (
                          <option key={type.id} value={type.id}>{type.gender}</option>
                        )
                      }

                    })}
                  </SelectDropdown>

                  <SelectDropdown name="category" onChange={(event) => onChange(event)}>
                    <option disabled>
                      Category
                    </option>
                    {categoryOptions.map((type) => {
                      if (type.categoryName === category) {
                        return (
                          <option selected key={type.id} value={type.id}>{type.categoryName}</option>
                        )
                      } else {
                        return (
                          <option key={type.id} value={type.id}>{type.categoryName}</option>
                        )
                      }
                    })}
                  </SelectDropdown>
                </div>
              </div>

              <div>
                <p>Product Image</p>
                <ImageField setImageData={setImageData} imageUrl={`${image_url}/${image}`} />
              </div>
            </div>
            <div className="md:w-1/2 md:pr-4 text-center lg:text-left mt-8">
              <button
                type="submit"
                className="inline-block px-7 py-3 bg-amber-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              >
                Update Product
              </button>
            </div>
          </div>
        </form>
      </section>
    </PrivateLayout >
  )
}
