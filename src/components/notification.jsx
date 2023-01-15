import { useEffect } from 'react'
import { axiosRequest } from "api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notification() {
    const order_url = '/api/v1/mypurchase/notification'

    useEffect(() => {
        const getPurchases = async () => {
            const response = await axiosRequest.get(order_url)
            const { status, data } = response
            if (status === 200) {
                let prod = data.data
                //localStorage.clear()
                if (prod.length !== 0) {
                    const from_storage = JSON.parse(window.localStorage.getItem("accepted-orders"))
                    let accepted_orders = []

                    if (from_storage) {
                        const diff = prod.filter((x) => !from_storage.some(y => x.order_id === y.order_id))
                        accepted_orders = diff.concat(from_storage)
                        if (diff.length > 0) {
                            toast("Your order has been confirmed!")
                        }
                    }
                    else {
                        toast("Your order has been confirmed!")
                    }

                    window.localStorage.setItem("accepted-orders", JSON.stringify(accepted_orders))
                }
            }
        }
        getPurchases()
    }, [])

    return (
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="light"
        />
    )
}
