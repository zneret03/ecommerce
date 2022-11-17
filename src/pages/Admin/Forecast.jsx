import React, { useState, useEffect } from "react"
import { PrivateLayout, ForecastChart } from "components"
import { axiosRequest } from "api"

export default function Forecast() {
  const url = "/api/v1/admin/forecast";
  const [[sales, arima], setData] = useState([])

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
        <p>USING LINEAR REGRESSION</p>
        <ForecastChart data={sales} y1={'sales'} y2={'predicted'} xAxis={'date'} />
        <div className="col-span-2 rounded h-96 drop-shadow bg-white p-3">
          <p className="font-medium text-gray-600 mb-5">Weekly Sales</p>
          {arima ?
            <ForecastChart data={arima} y1={'sales'} y2={'predicted'} xAxis={'date'} />
            : null
          }
        </div>
      </div>

    </PrivateLayout>
  )
}
