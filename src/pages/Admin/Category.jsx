import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import { PrivateLayout, Table  } from "components"
import { axiosRequest } from "api"
import swal from "sweetalert2"
import { Trash, Edit } from "react-feather"

export default function Category() {
  const url = "/api/v1/shop/category";

  const columns = [
    {
      field: "categoryName",
      headerName: "Category Name",
      width: 250,
    },
    {
      field: "dateCreated",
      headerName: "Date Created",
      width: 200,
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
      field: "dateUpdated",
      headerName: "Date Updated",
      width: 200,
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
      field: "deleteButton",
      headerName: "Action",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <div className="grid grid-cols-2">
            <Button
              onClick={(e) => updateCategory(e, params.row)}
              color="primary"
            >
              <Edit />
            </Button>
            <Button
              onClick={(e) => deleteCategory(e, params.row)}
              color="error"
            >
              <Trash />
            </Button>
          </div>
        )
      }
    }
  ]

  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
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

        if (status === 500) {
          swal.fire({
            title: "Oops!! Error 500",
            text: "server not found",
            icon: "warning",
          })
        }
      }
    }

    getCategories()
  }, [navigate])

  const removeRow = (id) => {
    const newRow = rows.filter((rows) => rows.id !== id);

    setRows(newRow);
  };

  const updateCategory = async(e, row) => {
    e.stopPropagation();

    const {value: updatedCategory} = await swal.fire({
      title: 'Update Category',
      input: 'text',
      inputValue: row.categoryName,
      showCancelButton: true,
      inputValidator: (value) => {
        if(!value) {
          return 'You need to write something!'
        }
        if(value===row.categoryName) {
          return 'You need to write something!'
        }
      }
    })

    if(updatedCategory) {
      const config = {categoryName: updatedCategory}

      try {
        const response = await axiosRequest.post(`${url}/${row.id}`, config)
        const { status, data } = response
        if(status===200) {
          const updated_rows = rows.map((row) => {
            if (row.id === data.data.id) {
              row.categoryName = data.data.categoryName
              row.dateCreated = data.data.dateCreated
              row.dateUpdated = data.data.dateCreated
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

  const deleteCategory = async (e, row) => {
    e.stopPropagation();
    swal.fire({
      title: "Confirm action",
      text: `Delete ${row.categoryName}?`,
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
          if (status === 409) {
            swal.fire({
              title: "Cannot delete this category!",
              text: "Category is being used by some products",
              icon: "warning",
            })
          }
        }
      }
    })
  }

  const addCategoryModal = async() => {
    const {value: newCategory} = await swal.fire({
      title: 'Create Category',
      input: 'text',
      showCancelButton: true,
      width: '300px',
      inputValidator: (value) => {
        if(!value) {
          return 'You need to write something!'
        }
      }
    })

    if(newCategory) {
      const config = {
        categoryName: newCategory,
      }
      try {
        const response = await axiosRequest.post(url, config)
  
        const { status, data } = response

  
        if (status === 201) {
          swal.fire({
            title: "Successfully created",
            text: "click ok to continue",
            icon: "success",
          }).then((res) => {
            if (res.isConfirmed) {
              const updated_rows = [...rows, data.data]
              setRows(updated_rows)
            }
          })
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
  
        if (status === 409) {
          swal.fire({
            title: "Error",
            text: "Category already exists!",
            icon: "warning",
          })
        }
      }
    }
  }

  return (
    <PrivateLayout
      title="Category"
      description="all product category shall fall in this page"
      size='md:h-screen'
    >
      <div className="flex justify-end">
        <button
          type="button"
          onClick={addCategoryModal}
          className="bg-amber-600 hover:bg-amber-500 text-white py-1 px-4 mb-5 rounded-sm"
        >
          <span>ADD CATEGORY</span>
        </button>
      </div>
      <Table data={rows} columns={columns} loading={false} />
    </PrivateLayout>
  )
}
