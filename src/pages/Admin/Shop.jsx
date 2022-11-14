import React, { useEffect, useState } from "react"
import { PrivateLayout, InputField, ImageField } from "components"
import { axiosRequest } from "api"
import swal from "sweetalert2"
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom"

const initialState = {
    shopName: "",
    address: "",
    description: ""
}

export default function Orders() {
    const shopUrl = "/api/v1/shop"
    const imageUrl = "/api/v1/images"
    const [
        { shopName, address, description, image },
        setState,
    ] = useState(initialState)

    const [imageSelected, setSelected] = useState(null);

    const navigate = useNavigate();
    const formData = new FormData();

    const [isNew, setNew] = useState(true)

    const onChange = (event) => {
        const { name, value } = event.target
        setState((prevState) => ({ ...prevState, [name]: value }))
    }

    useEffect(() => {
        const getShop = async () => {
            const response = await axiosRequest.get(shopUrl)
            const { status, data } = response

            if (status === 200) {
                const shop = data.data
                setState(shop)
                setNew(false)
            }
        }
        getShop()
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault()
        const datas = {
            shopName, address, description
        }

        if (!imageSelected) {
            swal.fire({
                title: "No image selected",
                text: "Please select and image for product!",
                icon: "warning",
            })
            for (let key in datas) {
                formData.delete(key);
            }
            return
        }

        formData.append(
            'image',
            imageSelected,
            uuidv4()
        )

        for (let key in datas) {
            formData.append(key, datas[key]);
        }

        try {
            const response = await axiosRequest.post(shopUrl, formData)
            const { status } = response

            if (status === 201) {
                swal.fire({
                    title: "Successful",
                    text: "click ok to continue",
                    icon: "success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/admin')
                    }
                })
            }

        } catch {

        }
    }

    const setImageData = image => {
        setSelected(image)
    }

    return (
        <PrivateLayout
            title="Shop"
            description="About Shop"
            size="md:h-full"
        >
            <section className="pt-8">
                <form onSubmit={(event) => onSubmit(event)} className="grid md:grid-cols-2 grid-rows-2 gap-10">
                    <div className="w-full flex flex-col gap-3">
                        <InputField
                            type="text"
                            name='shopName'
                            value={shopName}
                            onChange={(event) => onChange(event)}
                            placeholder="Shop Name"
                            required
                        />
                        <InputField
                            type="text"
                            name='address'
                            value={address}
                            onChange={(event) => onChange(event)}
                            placeholder="Address"
                            required

                        />
                        <textarea
                            name='description'
                            value={description}
                            onChange={(event) => onChange(event)}
                            placeholder="Description"
                            required
                            className="form-control h-full block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-600 focus:outline-none"
                        />
                        <div className="text-center hidden md:flex">
                            {isNew ?
                                <button
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-amber-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                >
                                    Create Shop</button> :
                                <button
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-amber-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                >
                                    Update Shop
                                </button>
                            }

                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p>Shop Image</p>
                        <ImageField setImageData={setImageData} imageUrl={!isNew ? `${imageUrl}/${image}` : null} className="hidden md:flex" />
                    </div>

                    <div className="text-center md:hidden flex">
                        {isNew ?
                            <button
                                type="submit"
                                className="inline-block px-7 py-3 bg-amber-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                            >
                                Create Shop</button> :
                            <button
                                type="submit"
                                className="inline-block px-7 py-3 bg-amber-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                            >
                                Update Shop
                            </button>
                        }

                    </div>
                </form>
            </section>
        </PrivateLayout>
    )
}