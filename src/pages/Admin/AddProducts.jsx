import React from "react"
import { PrivateLayout, Back, InputField, SelectDropdown, ImageField } from "components"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
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

export default function AddProducts() {
  const url = '/api/v1/product/category'
  const prod_url = '/api/v1/admin/product'

  const navigate = useNavigate();
  const formData = new FormData();

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

  const setImageData = image => {
    formData.append(
        'image',
        image,
        uuidv4()
    )
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

    for (let key in datas) {
      formData.append(key, datas[key]);
    }

    try {
      const response = await axiosRequest.post(prod_url, formData)
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
              <ImageField setImageData={setImageData} imageUrl={null}/>
            </div>
          </div>
        </form>
      </section>
    </PrivateLayout >
  )
}
