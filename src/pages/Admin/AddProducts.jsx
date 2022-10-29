import React from "react"
import { PrivateLayout, Back, InputField, SelectDropdown } from "components"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { axiosRequest } from "api"
import swal from "sweetalert2"

const initialState = {
  productName: "",
  price: "",
  description: "",
  gender: "",
  category: "",
  quantity: ""
}

export default function AddProducts() {
  const url = '/api/v1/product/category'
  const prod_url = '/api/v1/admin/product'

  const navigate = useNavigate();

  const [
    { productName, price, description, gender, category, quantity },
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
      quantity
    }
    console.log(datas)
    try {
      const response = await axiosRequest.post(prod_url, datas)
      const { status } = response

      if (status === 201) {
        swal.fire({
          title: "Successfully created",
          text: "click ok to continue",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/products')
          }
        })
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let ignore = false

    const getCategory = async () => {
      if (!ignore) {
        try {
          const response = await axiosRequest.get(url)

          const { status, data } = response

          if (status === 200) {
            const { categoryList, genderList } = data.data

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
                navigate('/category')
              }
            })
          }
        }
        catch (e) {
          const { status } = e.response
          console.log(status)
        }
      }
    }

    getCategory()

    return () => {
      ignore = true
    }
  }, [navigate])

  return (
    <PrivateLayout
      title="Create New Products"
      description="this page where you can create different products you like"
    >
      <Back to="/products" />
      <section className="py-8">
        <form onSubmit={(event) => onSubmit(event)}>
          <div className="mb-6 grid grid-cols-2 gap-10">
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
                  <option selected disabled>
                    Gender
                  </option>
                  {genderOptions.map((type) => {
                    return (
                      <option key={type.id} value={type.id}>{type.gender}</option>
                    )
                  })}
                </SelectDropdown>

                <SelectDropdown name="category" onChange={(event) => onChange(event)}>
                  <option selected disabled>
                    Category
                  </option>
                  {categoryOptions.map((type) => {
                    return (
                      <option key={type.id} value={type.id}>{type.categoryName}</option>
                    )
                  })}
                </SelectDropdown>
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-amber-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                >
                  Create Product
                </button>
              </div>

            </div>

            <div>
              <p>Product Image</p>
              <div className="flex justify-center items-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 rounded-lg border-2 border-dashed cursor-pointer hover:border-amber-600">
                  <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </form>
      </section>
    </PrivateLayout >
  )
}
