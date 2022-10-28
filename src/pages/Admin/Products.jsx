import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"
import { PrivateLayout, Table } from "components"
import { axiosRequest } from "api"
import swal from "sweetalert2"

export default function Products() {
  const url = "/api/v1/admin/product";
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getProducts= async() => {
      try {
          const response = await axiosRequest.get(url)

          const { status, data } = response

          if (status === 200) {
            setRows(data.data)
          }

      } catch (error) {
        const { status } = error.response
        console.log(status)
      }
    }

    getProducts()
  }, [])

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
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "dateCreated",
      headerName: "Date Created",
      type: "string",
      width: 150,
      editable: true,
    },
    {
      field: "dateUpdated",
      headerName: "Date Updated",
      type: "string",
      width: 150,
      editable: true,
    },
    {
      field: "deleteButton",
      headerName: "Action",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <Button
            onClick={(e) => deleteCategory(e, params.row)}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        );
      }
    }
  ]

  const removeRow = (id) => {
    const newRow = rows.filter((rows) => rows.id !== id);
 
    setRows( newRow );
  };

  const deleteCategory = async(e, row) => {
    e.preventDefault()

    try {
      const response = await axiosRequest.delete(`${url}/${row.id}`)
      console.log(response.status)
      const { status } = response
      if (status === 200) {
        removeRow(row.id)
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
    }
  }

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
