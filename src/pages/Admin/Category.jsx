import { useState, useEffect } from "react"
import useToggle from "hooks/useToggle"
import { TextField, Button } from "@mui/material"
import { PrivateLayout, Table, MyModal } from "components"
import { axiosRequest } from "api"
import swal from "sweetalert2"
import { Trash, Edit } from "react-feather"

export default function Category() {
  const [category, setCategory] = useState("")
  const [toggle, isToggle] = useToggle()

  const url = "/api/v1/shop/category";

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "categoryName",
      headerName: "Category Name",
      width: 250,
    },
    {
      field: "dateCreated",
      headerName: "Date Created",
      width: 250,
    },
    {
      field: "dateUpdated",
      headerName: "Date Updated",
      width: 250,
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
  }, [])

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

  const onSubmit = async (event) => {
    event.preventDefault()
    const config = {
      categoryName: category,
    }

    try {
      const response = await axiosRequest.post(url, config)

      const { status, data } = response

      isToggle()

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

      isToggle()

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

  const addCategoryModal = (
    <MyModal toggle={toggle} isToggle={isToggle}>
      <form onSubmit={(event) => onSubmit(event)}>
        <TextField
          className="w-full"
          id="outlined-basic"
          label="Category"
          onChange={(event) => setCategory(event.target.value)}
          variant="outlined"
          required
        />
        <div className="my-4 text-white flex gap-4 justify-end">
          <button
            type="button"
            onClick={isToggle}
            className="hover:bg-amber-100 border-2 border-amber-600 text-amber-600 py-1 px-8 rounded-sm"
          >
            cancel
          </button>
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-500 border-2 border-amber-600 py-1 px-8 rounded-sm"
          >
            save
          </button>
        </div>
      </form>
    </MyModal>
  )

  return (
    <PrivateLayout
      title="Category"
      description="all product category shall fall in this page"
    >
      {addCategoryModal}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={isToggle}
          className="bg-amber-600 hover:bg-amber-500 text-white py-1 px-4 mb-5 rounded-sm"
        >
          <span>ADD CATEGORY</span>
        </button>
      </div>
      <Table data={rows} columns={columns} loading={false} />
    </PrivateLayout>
  )
}
