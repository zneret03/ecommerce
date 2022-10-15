import { useState } from "react"
import useToggle from "hooks/useToggle"
import { TextField } from "@mui/material"
import { PrivateLayout, Table, MyModal } from "components"

export default function Category() {
  const [category, setCategory] = useState("")
  const [toggle, isToggle] = useToggle()

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "categoryName",
      headerName: "Category Name",
      width: 250,
      editable: true,
    },
    {
      field: "dateCreated",
      headerName: "Date Created",
      width: 250,
      editable: true,
    },
    {
      field: "dateUpdated",
      headerName: "Date Updated",
      width: 250,
      editable: true,
    },
  ]

  const rows = [
    {
      id: 1,
      categoryName: "Jeans",
      dateCreated: "2022/01/05",
      dateUpdated: "2022/01/07",
    },
    {
      id: 2,
      categoryName: "Jeans",
      dateCreated: "2022/01/05",
      dateUpdated: "2022/01/07",
    },
    {
      id: 3,
      categoryName: "Jeans",
      dateCreated: "2022/01/05",
      dateUpdated: "2022/01/07",
    },
    {
      id: 4,
      categoryName: "Jeans",
      dateCreated: "2022/01/05",
      dateUpdated: "2022/01/07",
    },
    {
      id: 5,
      categoryName: "Jeans",
      dateCreated: "2022/01/05",
      dateUpdated: "2022/01/07",
    },
  ]

  const onSubmit = (event) => {
    event.preventDefault()
    const config = {
      categoryName: category,
      dateCreated: new Date(),
    }

    console.log(config)
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
          <span>add category</span>
        </button>
      </div>
      <Table data={rows} columns={columns} loading={false} />
    </PrivateLayout>
  )
}
