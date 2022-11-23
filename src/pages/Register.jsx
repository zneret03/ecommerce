import { useState } from "react"
import { PublicLayout } from "components"
import { axiosRequest } from "api"
import swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

// components
import { InputField, SelectDropdown, Back } from "components"

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  number: "",
  address: "",
  age: "",
  gender: "",
  userType: "",
  password: "",
  confirm_password: ""
}

export default function Register() {
  const [
    { firstName, lastName, email, number, address, age, gender, userType, password, confirm_password },
    setState,
  ] = useState(initialState)

  const navigate = useNavigate();
  const [error, setError] = useState()

  const onChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirm_password) {
      setError('Password does not match!')
    }

    if (error) {
      swal.fire({
        title: error,
        icon: "error",
      }).then((result) => {
        if (result.isConfirmed) {
          return
        }
      })
    }
    else {
      try {
        const datas = {
          firstName,
          lastName,
          email,
          number,
          address,
          age,
          gender,
          userType,
          password,
        }

        const response = await axiosRequest.post("/api/v1/signup", datas)

        const { status } = response

        if (status === 201) {
          swal.fire({
            title: "Successfully Signup",
            text: "click ok to continue",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/')
            }
          })
        }
      } catch (error) {
        const { status } = error.response

        if (status === 500) {
          swal.fire({
            title: "Oops!! Error 500",
            text: "server not found",
            icon: "warning",
          })
        }

        if (status === 404) {
          swal.fire({
            title: "Oops!!",
            text: "something went wrong, please try again :(",
            icon: "warning",
          })
        }

        if (status === 409) {
          swal.fire({
            title: "Error",
            text: "Email already taken!",
            icon: "warning",
          })
        }
      }
    }
  }

  /**
   * InputField field and select field should be reusable
   */

  return (
    <PublicLayout svgImage="images/Register_SVG.svg">
      <Back to="/login" />
      <form onSubmit={(event) => onSubmit(event)}>
        <div className="py-8">
          <h1 className="text-4xl font-bold text-primary my-2">
            Register Account
          </h1>
          <p className="text-gray-400 w-80">
            add strong password to avoid hackers disecting your account
          </p>
        </div>

        <div class="mb-6 grid grid-cols-2 gap-2">
          <InputField
            type="text"
            name="firstName"
            value={firstName}
            onChange={(event) => onChange(event)}
            placeholder="Firstname"
            required
          />
          <InputField
            type="text"
            name="lastName"
            value={lastName}
            onChange={(event) => onChange(event)}
            placeholder="Lastname"
            required
          />
        </div>

        <div className="mb-6">
          <InputField
            type="email"
            name="email"
            value={email}
            onChange={(event) => onChange(event)}
            placeholder="Email Address"
            required
          />
        </div>

        <div className="mb-6">
          <InputField
            type="text"
            name="address"
            value={address}
            onChange={(event) => onChange(event)}
            placeholder="Address"
            required
          />
        </div>

        <div class="mb-6 grid grid-cols-2 gap-2">
          <InputField
            id="quantity"
            type="number"
            name="number"
            value={number}
            onChange={(event) => onChange(event)}
            placeholder="Number"
            required
          />
          <InputField
            id="quantity"
            type="number"
            name="age"
            value={age}
            onChange={(event) => onChange(event)}
            placeholder="Age"
            required
          />
        </div>

        <div className="mb-6 grid grid-cols-2 gap-2">
          <SelectDropdown name="gender" onChange={(event) => onChange(event)}>
            <option selected disabled>
              Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </SelectDropdown>

          <SelectDropdown name="userType" onChange={(event) => onChange(event)}>
            <option disabled selected>
              User Type
            </option>
            <option value="Seller">Seller</option>
            <option value="Buyer">Buyer</option>
          </SelectDropdown>
        </div>

        <div className="mb-6">
          <InputField
            type="password"
            name="password"
            value={password}
            onChange={(event) => onChange(event)}
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-600 focus:outline-none"
            placeholder="Password"
            required
          />
        </div>

        <div className="mb-6">
          <InputField
            type="password"
            name="confirm_password"
            value={confirm_password}
            onChange={(event) => onChange(event)}
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-600 focus:outline-none"
            placeholder="Confirm Password"
            required
          />
        </div>

        <div class="text-center lg:text-left">
          <button
            type="submit"
            class="inline-block px-7 py-3 bg-primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-primary hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary active:shadow-lg transition duration-150 ease-in-out w-full"
          >
            Register
          </button>
        </div>
      </form>
    </PublicLayout>
  )
}
