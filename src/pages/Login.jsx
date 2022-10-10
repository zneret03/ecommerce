import { PublicLayout } from "components"
import { Link } from "react-router-dom"

export default function Login() {
  return (
    <PublicLayout svgImage="images/Login_SVG.svg">
      <form>
        <div className="py-8">
          <h1 className="text-4xl font-bold text-amber-600 my-2">
            Welcome Back!
          </h1>
          <p className="text-gray-400 w-80">
            dont forget your password to add after email address input field :)
          </p>
        </div>

        <div class="mb-6">
          <input
            type="text"
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-600 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Email address"
          />
        </div>

        <div class="mb-6">
          <input
            type="password"
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-600 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Password"
          />
        </div>

        <div class="flex justify-between items-center mb-6">
          <div class="form-group form-check">
            <input
              type="checkbox"
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-amber-600 checked:border-amber-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              id="exampleCheck2"
            />
            <label
              class="form-check-label inline-block text-gray-800"
              for="exampleCheck2"
            >
              Remember me
            </label>
          </div>
          <a href="#!" class="text-gray-800">
            Forgot password?
          </a>
        </div>

        <div class="text-center lg:text-left">
          <button
            type="button"
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
