import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { PrivateLayout, Table } from "components"

export default function Products() {

  const url = "/api/v1/admin/product";

  // from react docs: request on load 
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setData(result.data);
        },
        (error) => {
          setError(error);
        }
      )
  }, [])

  const rows = data
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "productName",
      headerName: "Product Name",
      width: 150,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
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
      field: "category",
      headerName: "Category",
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
    {
      field: "quantity",
      headerName: "Quantity",
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
