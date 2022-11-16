import React, { useState, useEffect } from "react"
import { PrivateLayout, ForecastChart } from "components"
import { axiosRequest } from "api"

export default function Forecast() {
  const url = "/api/v1/admin/forecast";
  const [data, setData] = useState([])

  useEffect(() => {
    const getForecast = async () => {
      try {
        const response = await axiosRequest.get(url)

        const { status, data } = response

        if (status === 200) {
          setData(data.data)
        }

      } catch (error) {

      }
    }

    getForecast()
  }, [])


  return (
    <PrivateLayout
      title="Sales Forecasting"
      description="Predict future sales"
      size='md:h-screen'
    >
      <div className="w-full h-screen">
        <ForecastChart data={data} y1={'sales'} y2={'predicted'} xAxis={'date'} />
      </div>

    </PrivateLayout>
  )
}
