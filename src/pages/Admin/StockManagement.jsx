import React, { useState, useEffect }  from "react"
import { Button} from "@mui/material"
import { PlusSquare, Edit } from "react-feather"
import { PrivateLayout, Table } from "components"
import { axiosRequest } from "api"
import swal from "sweetalert2"

export default function StockManagement() {
  const url = "/api/v1/admin/stocks";

  const [rows, setRows] = useState([]);
  const columns = [
    {
      field: "productName",
      headerName: "Product Name",
      width: 150,
    },
    {
      field: "quantity",
      headerName: "Stocks",
      type: "number",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      type: "boolean",
      width: 150,
      renderCell: (params) => {
        if(params.row.status) {
          return (
            <p>ACTIVE</p>
          )
        }
        else {
          return (
            <p>UNLISTED</p>
          )
        }
      }
    },
    {
      field: "dateUpdated",
      headerName: "Date Updated",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <div className="grid grid-cols-2">
            <Button
              onClick={(e) => updateStocks(e, params.row)}
              color="primary"
            >
              <PlusSquare />
            </Button>
            <Button
              onClick={(e) => updateStatus(e, params.row)}
              color="secondary"
            >
              <Edit />
            </Button>
          </div>
        )
      }
    }
  ]

  const updateStocks = async (e, row) => {
    e.preventDefault()

    const {value: newStocks} = await swal.fire({
      title: 'Update Stocks',
      input: 'number',
      inputValue: row.quantity,
      showCancelButton: true,
      width: '300px',
      inputValidator: (value) => {
        if(!value) {
          return 'You need to write something!'
        }
      }
    })

    if(newStocks) {
      const config = {
        quantity: newStocks,
        status: row.status
      }
      try {
        const response = await axiosRequest.post(`${url}/${row.id}`, config)
        const { status, data } = response
        if(status===200) {
          const updated_rows = rows.map((row) => {
            if (row.id === data.data.id) {
              row.quantity = data.data.quantity
              row.dateUpdated = data.data.dateUpdated
            }
            return row
          })
          setRows(updated_rows)
        }
      }
      catch (e){
        console.log(e)
      }
    }
  }

  const updateStatus = async (e, row) => {
    e.preventDefault()
    const {value: newStatus} = await swal.fire({
      title: 'Edit Status',
      input: 'select',
      inputOptions: {
        active: 'Active',
        unlisted: 'Unlisted'
      },
      inputPlaceholder: 'Select',
      width: '300px',
      showCancelButton: true,
      inputValidator: (value) => {
        if(!value) {
          return 'Please select option!'
        }
      }
    })

    if(newStatus) {
      const config = {
        status: (newStatus === 'active') ? true : false,
        quantity: row.quantity
      }
      try {
        const response = await axiosRequest.post(`${url}/${row.id}`, config)
        const { status, data } = response
        if(status===200) {
          const updated_rows = rows.map((row) => {
            if (row.id === data.data.id) {
              row.status = data.data.status
              row.dateUpdated = data.data.dateUpdated
            }
            return row
          })
          setRows(updated_rows)
        }
      }
      catch (e){
        console.log(e)
      }
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
      title="Stock Management"
      description="all product stocks shall fall in this page"
    >
      <Table data={rows} columns={columns} loading={false} />
    </PrivateLayout>
    
  )
}
