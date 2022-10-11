import React from "react"
import { Link } from "react-router-dom"
import { ChevronLeft } from "react-feather"

export default function Back({ to }) {
  return (
    <Link
      to={to}
      className="flex align-center gap-2 hover:text-amber-600 transition-all"
    >
      <ChevronLeft />
      <span className="font-bold">Back</span>
    </Link>
  )
}
