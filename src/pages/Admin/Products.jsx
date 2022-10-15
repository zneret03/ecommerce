import React from "react"
import { Link } from "react-router-dom"
import { PrivateLayout, Table } from "components"

export default function Products() {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      editable: true,
    },
    {
      field: "productName",
      headerName: "Product Name",
      width: 150,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      type: "string",
      width: 150,
      editable: true,
    },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.productName || ""} ${params.row.title || ""}`,
    // },
  ]

  const rows = [
    {
      id: 1,
      title: "Snow",
      productName: "Jon",
      price: 35,
      quantity: 5,
      gender: "Male",
    },
    {
      id: 2,
      title: "Lannister",
      productName: "Cersei",
      price: 42,
      quantity: 5,
      gender: "Male",
    },
    {
      id: 3,
      title: "Lannister",
      productName: "Jaime",
      price: 45,
      quantity: 5,
      gender: "Male",
    },
    {
      id: 4,
      title: "Stark",
      productName: "Arya",
      price: 16,
      quantity: 5,
      gender: "Male",
    },
    {
      id: 5,
      title: "Targaryen",
      productName: "Daenerys",
      price: 323,
      quantity: 5,
      gender: "Male",
    },
    {
      id: 6,
      title: "Melisandre",
      productName: null,
      price: 150,
      quantity: 5,
      gender: "Male",
    },
    {
      id: 7,
      title: "Clifford",
      productName: "Ferrara",
      price: 44,
      quantity: 5,
      gender: "Male",
    },
    {
      id: 8,
      title: "Frances",
      productName: "Rossini",
      price: 36,
      quantity: 5,
      gender: "Male",
    },
    {
      id: 9,
      title: "Roxie",
      productName: "Harvey",
      price: 65,
      quantity: 5,
      gender: "Male",
    },
  ]

  return (
    <PrivateLayout
      title="Products"
      description="all products add edit and delete shall fall in this page"
    >
      <Link to="/addProducts" className="flex justify-end">
        <button
          type="button"
          className="bg-amber-600 hover:bg-amber-500 text-white py-1 px-4 mb-5 rounded-sm"
        >
          <span>add product</span>
        </button>
      </Link>
      <Table data={rows} columns={columns} loading={false} />
    </PrivateLayout>
  )
}
