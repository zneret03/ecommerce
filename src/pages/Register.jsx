import React from "react"
import { PublicLayout } from "components"

export default function Register() {
  /**
   * input field and select field should be reusable
   */

  return (
    <PublicLayout svgImage="images/Register_SVG.svg">
      <form>
        <div className="py-8">
          <h1 className="text-4xl font-bold text-amber-600 my-2">
            Register Account
          </h1>
          <p className="text-gray-400 w-80">
            add strong password to avoid hackers disecting your account
          </p>
        </div>

        <div class="mb-6 grid grid-cols-2 gap-2">
          <input
            type="text"
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-600 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Firstname"
          />
          <input
            type="text"
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-600 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Lastname"
          />
        </div>

        <div class="mb-6 grid grid-cols-2 gap-2">
          <input
            type="text"
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-600 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Address"
          />
          <input
            type="number"
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-600 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Age"
          />
        </div>

        <div className="mb-6 grid grid-cols-2 gap-2">
          <select
            id="countries"
            class="mt-2 bg-white-50 border border-white-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 text-black white:focus:ring-blue-500 white:focus:border-blue-500"
          >
            <option selected disabled>
              Choose a gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select
            id="countries"
            class="mt-2 bg-white-50 border border-white-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 text-black white:focus:ring-blue-500 white:focus:border-blue-500"
          >
            <option disabled selected>
              Choose a user type
            </option>
            <option value="Male">Seller</option>
            <option value="Female">Buyer</option>
          </select>
        </div>

        <div className="mb-6">
          <input
            type="password"
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-600 focus:outline-none"
            placeholder="Password"
          />
        </div>

        <div class="text-center lg:text-left">
          <button
            type="button"
            class="inline-block px-7 py-3 bg-amber-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          >
            Register
          </button>
        </div>
      </form>
    </PublicLayout>
  )
}
