import { useState, useEffect } from "react"
import { PrivateLayout, Table } from "components"
import { axiosRequest } from "api"

export default function Reports() {
    const url = '/api/v1/admin/inventory'
    const imageUrl = "/api/v1/images"
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getPurchases = async () => {
            const response = await axiosRequest.get(url)
            const { status, data } = response
            if (status === 200) {
                const prod = data.data

                setProducts(prod)
            }
        }
        getPurchases()
    }, [])

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "image",
            headerName: "Image",
            width: 130,
            renderCell: (params) => {
                return (<img alt="" className="scale-100" src={`${imageUrl}/${params.row.image}`} />)
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
            width: 120,
            renderCell: (params) => {
                return (<p>₱{params.row.price.toLocaleString()}</p>)
            }
        },
        {
            field: "quantity",
            headerName: "Stock",
            type: "number",
            width: 120,
        },
        {
            field: "sold",
            headerName: "Sold",
            type: "number",
            width: 120,
        },
        {
            field: "total",
            headerName: "Total Sales",
            type: "number",
            width: 120,
            renderCell: (params) => {
                return (<p>₱{params.row.total.toLocaleString()}</p>)
            }
        },

    ]

    return (
        <PrivateLayout
            title="Inventory Reports"
            description="Reports where items purchased are itemized"
            size='md:h-full'
        >
            <Table data={products} columns={columns} loading={false} />
        </PrivateLayout>
    )
}