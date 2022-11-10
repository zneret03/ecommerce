import { useState, useEffect } from "react"
import { axiosRequest } from "api"

// components
import { InputField, Navbar } from "components"

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    age: "",
    gender: "",
    userType: "",
}

export default function MyAccount() {
    const [
        { firstName, lastName, email, address, age, gender },
        setState,
    ] = useState(initialState)

    const onChange = (event) => {
        const { name, value } = event.target
        setState((prevState) => ({ ...prevState, [name]: value }))
    }

    const url = '/api/v1/user'

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axiosRequest.get(url)

                const { status, data } = response

                if (status === 200) {
                    setState(data.data)
                }
            } catch (e) {

            }
        }

        getUser()
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault()
    }

    /**
     * InputField field and select field should be reusable
     */

    return (
        <>
            <Navbar />
            <div className="px-10 py-5 flex flex-col items-center">
                <div className="font-bold text-3xl bg-white py-5">My Account</div>
                <img
                    src="/images/profile_avatar.jpg"
                    className="rounded-full w-44 h-44 border-2 border-primary object-cover mb-4"
                    alt=""
                />
                <form onSubmit={(event) => onSubmit(event)}>
                    <div class="mb-6 grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-gray-600">First Name</label>
                            <InputField
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={(event) => onChange(event)}
                                placeholder="Firstname"
                                required
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="text-gray-600">Last Name</label>
                            <InputField
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={(event) => onChange(event)}
                                placeholder="Lastname"
                                required
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <div>
                            <label className="text-gray-600">Email</label>
                            <InputField
                                type="email"
                                name="email"
                                value={email}
                                onChange={(event) => onChange(event)}
                                placeholder="email"
                                required
                                readOnly
                            />
                        </div >
                    </div>

                    <div class="mb-6">
                        <div>
                            <label className="text-gray-600">Address</label>
                            <InputField
                                type="text"
                                name="address"
                                value={address}
                                onChange={(event) => onChange(event)}
                                placeholder="Address"
                                required
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-gray-600">Gender</label>
                            <InputField
                                type="text"
                                name="gender"
                                value={gender}
                                placeholder="Gender"
                                required
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="text-gray-600">Age</label>
                            <InputField
                                type="number"
                                name="age"
                                value={age}
                                onChange={(event) => onChange(event)}
                                placeholder="Age"
                                required
                                readOnly
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
