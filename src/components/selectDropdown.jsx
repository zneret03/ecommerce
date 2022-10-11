import React from "react"

export default function selectDropdown(props) {
  return (
    <select
      {...props}
      class="mt-2 bg-white-50 border border-white-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 text-black white:focus:ring-blue-500 white:focus:border-blue-500"
    >
      {props.children}
    </select>
  )
}
