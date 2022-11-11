import React from 'react';
import Chart from 'react-apexcharts';


const BalanceChart = () => {
  const series = [
    {
      name: 'Cash Inflow',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, 
    {
      name: 'Cash Outflow',
      data: [11, 32, 45, 32, 34, 52, 41]
    },
  ];

   const options = {
      legend: {
        fontSize: '16px',
        markers: {
          fillColors: ['#006400','#ee2737']
           },
        labels: {
            colors: '#fff',
        },
      },
      fill: {
        colors: ['#006400','#ee2737'],
      },
      grid: {
       show: false,
      },
      chart: {
        height: 350,
        width: 100,
        type: 'area',
        toolbar: {
          tools: {
            download: false,
            selection: false,
            pan: false,
          }
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: false,
      },
      xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
      },
      yaxis:{
        show: false,
      },    
      tooltip: {
        x: {
          show: false,
        },
        theme: 'dark',
        markers:{backgoundColor: ['#006400','#ee2737']},
        style: {
          fontSize: '16px',
        },
      },
      markers: {
        colors: ['#006400','#ee2737']
      }
    };

  return (
    <>
      <Chart
        options={options} series={series} type="area" height='100%'
        />
    </>
  )
}

export default BalanceChart