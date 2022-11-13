import React, { useEffect, useState } from "react"
import { PrivateLayout, Table } from "components"
import { axiosRequest } from "api"
import { Button } from "@mui/material"

export default function Orders() {
  const url = "/api/v1/admin/orders"
  const status_url = "/api/v1/admin/order/status"
  const img_url = "/api/v1/images";
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.row.status === "COMPLETE" ?
              <p className="text-green-600">{params.row.status}</p>
              : ""
            }
            {params.row.status === "CANCELLED" ?
              <p className="text-red-600">{params.row.status}</p>
              : ""
            }
            {params.row.status === "PREPARING"?
              <p className="text-amber-600">{params.row.status}</p>
              : ""
            }
            {params.row.status === "PENDING"?
              <p className="text-yellow-500">{params.row.status}</p>
              : ""
            }
            {params.row.status === "SHIPPED"?
              <p className="text-orange-600">{params.row.status}</p>
              : ""
            }

          </div>
        )
      }
    },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return (<img alt="" className="scale-100" src={`${img_url}/${params.row.productID}`} />)
      }
    },
    {
      field: "productName",
      headerName: "Product Name",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 100,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 100,
    },
    {
      field: "totalprice",
      headerName: "Total Price",
      type: "number",
      width: 150,
    },
    {
      field: "dateCreated",
      headerName: "Date Ordered",
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
          <div>{getDate(params.row.dateCreated)}</div>
        )
      }
    },
    {
      field: "buyer",
      headerName: "Buyer Details",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="flex flex-col" key={params.row.id}>
            <div className="grid grid-cols-2">
              <p>Fullname: </p>
              <p>{params.row.buyer.fullname}</p>
            </div>

            <div className="grid grid-cols-2">
              <p>Number: </p>
              <p>{params.row.buyer.number}</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Address: </p>
              <p>{params.row.buyer.address}</p>
            </div>
          </div>
        )
      }
    },
    {
      field: "Button",
      headerName: "Action",
      sortable: false,
      width: 250,
      renderCell: (params) => {
        return (
          <div className="flex flex-row gap-x-2">
            {(params.row.status === "PENDING") ?
              <Button onClick={() => { updateStatus(params.row, "PREPARING") }} variant="contained">Accept</Button>
              : ""
            }
            {(params.row.status === "PREPARING") ?
              <Button onClick={() => { updateStatus(params.row, "SHIPPED") }} variant="contained">SHIP</Button>
              : ""
            }
            {(params.row.status !== "CANCELLED" && params.row.status !== "COMPLETE" && params.row.status !== "SHIPPED") ?
              <Button onClick={() => { updateStatus(params.row, "CANCELLED") }} variant="contained" color="error">Cancel</Button>
              : ""
            }
          </div>
        );
      }
    }
  ]

  const updateStatus = async (r, newStatus) => {
    try {
      const data = { status: newStatus, id: r.id }
      const response = await axiosRequest.post(status_url, data)
      const { status } = response
      if (status === 200) {
        const updated_rows = rows.map((row) => {
          if (row.id === r.id) {
            row.status = newStatus
          }
          return row
        })
        setRows(updated_rows)
      }
    }
    catch (e) {

    }
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axiosRequest.get(url)

        const { status, data } = response

        if (status === 200) {
          setRows(data.data)
        }

      } catch (error) {
        console.log(error)
      }
    }

    getProducts()
  }, [])


  return (
    <PrivateLayout
      title="Orders"
      description="all user orders that belongs to specific seller shall fall in this page"
      size='md:h-screen'
    >
      <Table data={rows} columns={columns} loading={false} />
    </PrivateLayout>
  )
}
