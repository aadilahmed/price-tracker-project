import React from "react";
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'

function PricesGraph({prices}) {
    const labels = prices.map((element) => {
        return element["date"]
    });

    const amounts = prices.map((element) => {
        return element["amount"] / Math.pow(10, 2)
    }) 

    Chart.register(...registerables)
    const state = {
        labels: labels,
        datasets: [
          {
            label: 'Prices',
            backgroundColor: [
              'Black',
            ],
            fill: false,
            lineTension: 0,
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: amounts,
          },
        ],
      }
    return (
        <div>
        <Line
          data={state}
          options={{
            title: {
              display: true,
              text: 'Amount',
              fontSize: 20,
            },
            legend: {
              display: true,
              position: 'right',
            },
            maintainAspectRatio: false
          }}
          height={300}
        />
      </div>
    )
}

export default PricesGraph