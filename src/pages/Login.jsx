import { useState } from "react"
import { PublicLayout } from "components"
import { Link } from "react-router-dom"
import { axiosRequest } from "api"
import swal from "sweetalert2"

// components
import { InputField } from "components"

const initialState = {
  email: "",
  password: "",
}

export default function Login() {
  const [{ email, password }, setState] = useState(initialState)

  const onChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const datas = { email, password }
      // add api here
      const response = await axiosRequest.post("/api/v1/login", datas)

      const { status } = response

      if (status === 200) {
        swal.fire({
          title: "Successfully login",
          text: "click ok to continue",
          icon: "success",
        })
      }
      
      // this doesnt work btw. 
      if (status === 401) {
        swal.fire({
          title: "Email or password is incorrect!",
          text: "Please love me again...",
          icon: "warning",
        })
      }
    } catch (error) {
      const { status } = error.response

      if (status === 404) {
        swal.fire({
          title: "Oops!!",
          text: "something went wrong, please try again :(",
          icon: "warning",
        })
      }
    }
  }

  return (
    <PublicLayout svgImage="images/Login_SVG.svg">
      <form onSubmit={(event) => onSubmit(event)}>
        <div className="py-8">
          <h1 className="text-4xl font-bold text-amber-600 my-2">
            Welcome Back!
          </h1>
          <p className="text-gray-400 w-80">
            dont forget your password to add after email address input field :)
          </p>
        </div>

        <div class="mb-6">
          <InputField
            type="text"
            name="email"
            value={email}
            onChange={(event) => onChange(event)}
            id="exampleFormControlInput2"
            placeholder="Email address"
            required
          />
        </div>

        <div class="mb-6">
          <InputField
            type="password"
            name="password"
            value={password}
            onChange={(event) => onChange(event)}
            id="exampleFormControlInput2"
            placeholder="Password"
            required
          />
        </div>

        <div class="text-right mb-6">
          <a href="#!" class="text-gray-800">
            Forgot password?
          </a>
        </div>

        <div class="text-center lg:text-left">
          <button
            type="submit"
            class="inline-block px-7 py-3 bg-amber-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          >
            Login
          </button>
          <p class="text-sm font-semibold mt-2 pt-1 mb-0">
            Don't have an account?
            <Link
              to="/register"
              class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out mx-2"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </PublicLayout>
  )
}
