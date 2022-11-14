import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"
import { Trash, Edit } from "react-feather"
import { PrivateLayout, Table } from "components"
import { axiosRequest } from "api"
import swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

export default function AdminProducts() {
  const url = "/api/v1/admin/product";
  const img_url = "/api/v1/images";
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axiosRequest.get(url)

        const { status, data } = response

        if (status === 200) {
          setRows(data.data)
        }

      } catch (error) {
        const { status } = error.response

        if (status === 404) {
          swal.fire({
            title: "No Shop!",
            text: "Please setup shop first!",
            icon: "warning",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/admin/shop')
            }
          })
        }
      }
    }

    getProducts()
  }, [navigate])

  const removeRow = (id) => {
    const newRow = rows.filter((rows) => rows.id !== id);

    setRows(newRow);
  };

  const deleteProduct = async (e, row) => {
    e.preventDefault()
    swal.fire({
      title: "Confirm action",
      text: `Delete ${row.productName}?`,
      icon: "warning",
      showCancelButton: true,
      showCloseButton: true,
      focusConfirm: false,
    }).then(async (res) => {

      if (res.isConfirmed) {
        try {
          const response = await axiosRequest.delete(`${url}/${row.id}`)

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
    })
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return (<img alt="" className="scale-100" src={`${img_url}/${params.row.image}`} />)
      }
    },
    {
      field: "productName",
      headerName: "Product Name",
      width: 150,
    },
    {
      headerName: "Description",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="w-full" key={params.row.id}>
            <p className="truncate overflow-hidden ">{params.row.description}</p>
          </div>
        )
      }
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 100,
    },
    {
      field: "category",
      headerName: "Category",
      type: "string",
      width: 120,
    },
    {
      field: "gender",
      headerName: "Gender",
      type: "string",
      width: 100,
    },
    {
      field: "dateCreated",
      headerName: "Date Created",
      type: "string",
      width: 150,
      renderCell: (params) => {
        const getDate = (date) => {
          const time = new Date(date).toLocaleTimeString('en-US')
          const options = { time: 'numeric', month: 'numeric', day: 'numeric', year: "numeric" };
          const newDate = new Date(date).toLocaleDateString('en-US', options)
          return (
            <div className="flex flex-col gap-y-2">
              <p>{time}</p>
              <p>{newDate}</p>
            </div>
          )
        }
        return (
          <div key={params.row.id}>{getDate(params.row.dateCreated)}</div>
        )
      }
    },
    {
      field: "dateUpdated",
      headerName: "Date Updated",
      type: "string",
      width: 150,
      renderCell: (params) => {
        const getDate = (date) => {
          const time = new Date(date).toLocaleTimeString('en-US')
          const options = { time: 'numeric', month: 'numeric', day: 'numeric', year: "numeric" };
          const newDate = new Date(date).toLocaleDateString('en-US', options)
          return (
            <div className="flex flex-col gap-y-2">
              <p>{time}</p>
              <p>{newDate}</p>
            </div>
          )
        }
        return (
          <div key={params.row.id}>{params.row.dateUpdate? getDate(params.row.dateUpdated): ""}</div>
        )
      }
    },
    {
      field: "Button",
      headerName: "Action",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <div className="grid grid-cols-2" key={params.row.id}>
            <Link to={`/admin/updateProducts/${params.row.id}`}>
              <Button
                color="primary"
              >
                <Edit />
              </Button>
            </Link>
            <Button
              onClick={(e) => deleteProduct(e, params.row)}
              color="error"
            >
              <Trash />
            </Button>
          </div>
        );
      }
    }
  ]

  return (
    <PrivateLayout
      title="Products"
      description="all products add edit and delete shall fall in this page"
      size='md:h-screen'
    >
      <div className="flex justify-end">
        <Link to="/admin/addProducts">
          <button
            type="button"
            className="bg-amber-600 hover:bg-amber-500 text-white py-1 px-4 mb-5 rounded-sm"
          >
            <span>ADD PRODUCT</span>
          </button>
        </Link>
      </div>
      <Table data={rows} columns={columns} loading={false} />
    </PrivateLayout>
  )
}
