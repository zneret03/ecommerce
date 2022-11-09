import { useState } from "react"
import { PublicLayout } from "components"
import { Link, useNavigate } from "react-router-dom"
import { axiosRequest } from "api"
import swal from "sweetalert2"

// components
import { InputField } from "components"

const initialState = {
  email: "",
  password: "",
  rememberMe: false,
}

export default function Login() {
  const navigate = useNavigate();

  const [{ email, password, rememberMe }, setState] = useState(initialState)

  const onChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const datas = { email, password, rememberMe }
      const response = await axiosRequest.post("/api/v1/login", datas)

      const { status, data } = response

      if (status === 200) {
        if (data.data.userType === 'Seller') {
          navigate('/admin')
        }
        
        if (data.data.userType === 'Buyer') {
          navigate('/')
        }
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

      if (status === 401) {
        swal.fire({
          title: "Email or password is incorrect!",
          icon: "warning",
        })
      }
    }
  }

  return (
    <PublicLayout svgImage="images/Login_SVG.svg">
      <form onSubmit={(event) => onSubmit(event)}>
        <div className="py-8">
          <h1 className="text-4xl font-bold text-primary my-2">
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
            class="inline-block px-7 py-3 bg-primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-primary hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary active:shadow-lg transition duration-150 ease-in-out w-full"
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
