import React from 'react'
import Chart from 'react-apexcharts';

const ExpenseChart = () => {

  const series = [44, 55, 41, 17, 15];
  const options =  {
              chart: {
                type: 'donut',
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            };
  return (
    <>
     <Chart
        options={options} series={series} type="donut" height='100%'
        />
    </>
  )
}

export default ExpenseChart