import { useState } from "react"
import { PublicLayout } from "components"
import { axiosRequest } from "api"
import swal from "sweetalert2"

// components
import { InputField, SelectDropdown, Back } from "components"

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  age: "",
  gender: "",
  userType: "",
  password: "",
}

export default function Register() {
  const [
    { firstName, lastName, email, address, age, gender, userType, password },
    setState,
  ] = useState(initialState)

  const onChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const datas = {
        firstName,
        lastName,
        email,
        address,
        age,
        gender,
        userType,
        password,
      }

      // add api here
      const response = await axiosRequest.post("/api/v1/signup", datas)

      const { status } = response

      if (status === 201) {
        swal.fire({
          title: "Successfully Signup",
          text: "click ok to continue",
          icon: "success",
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
    }
  }

  /**
   * InputField field and select field should be reusable
   */

  return (
    <PublicLayout svgImage="images/Register_SVG.svg">
      <Back to="/" />
      <form onSubmit={(event) => onSubmit(event)}>
        <div className="py-8">
          <h1 className="text-4xl font-bold text-amber-600 my-2">
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
            placeholder="email"
            required
          />
        </div>

        <div class="mb-6 grid grid-cols-2 gap-2">
          <InputField
            type="text"
            name="address"
            value={address}
            onChange={(event) => onChange(event)}
            placeholder="Address"
            required
          />
          <InputField
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
              Choose a gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </SelectDropdown>

          <SelectDropdown name="userType" onChange={(event) => onChange(event)}>
            <option disabled selected>
              Choose a user type
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
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-600 focus:outline-none"
            placeholder="Password"
            required
          />
        </div>

        <div class="text-center lg:text-left">
          <button
            type="submit"
            class="inline-block px-7 py-3 bg-amber-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          >
            Register
          </button>
        </div>
      </form>
    </PublicLayout>
  )
}
