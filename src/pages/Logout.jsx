// dummy/dirty logout implementation
import { useEffect } from "react"
import { axiosRequest } from "api"
import { useNavigate } from "react-router-dom"

export default function Logout() {
    const url = "/api/v1/logout";
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async() => {
            try {
                const response = await axiosRequest.get(url)

                const { status } = response
    
                if (status === 200) {
                    navigate('/login')
                }
            } catch (e) {
                navigate('/login')
            }
        }

        logout()
    }, [navigate])
}