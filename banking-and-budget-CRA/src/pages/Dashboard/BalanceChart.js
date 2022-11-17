import React from 'react';
import Chart from 'react-apexcharts';
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import { useState, useEffect } from "react";


const BalanceChart = ({getUserCode, displayPanel}) => {

  const [userStore, setUserStore, getUserStore] = useLocalStorageStore(
    "registeredUsers",
    []
  );
  const [userTransactions, setUserTransaction, getUserTransactions] =
  useLocalStorageStore("userTransaction", []);

  const [userCashInflow, setUserCashInflow] = useState([]);
  const [userCashOutflow, setUserCashOutflow] = useState([]);
  const [transactionDate,setTransactionDate] = useState([]);

  useEffect(() => {
    getUserTransactions();
   
    return () => {};
  }, [displayPanel]);

  useEffect(() => {
    userStore.length > 0 && getBalance();
    return () => {};
  }, [userTransactions]);

  const getBalance = () => {
      const userData = userTransactions.filter(
        (user) => user.userCode === `${getUserCode}`
      );

      const cashInflow = userData.filter((data) => data.title === 'Deposit').map((data) => Number(data.amount));  
      const withdraw = userData.filter((data) => data.title === 'Withdraw').map((data) => Number(data.amount * -1));
      const transfer = userData.filter((data) => data.title === 'Transfer').map((data) => Number(data.amount * -1));
      const cashOutflow = withdraw.concat(transfer)
      const date = userData.map((data) => data.date)

  
      setTransactionDate(date)
      setUserCashInflow(cashInflow)
      setUserCashOutflow(cashOutflow)
  };

  const series = [
    {
      name: 'Cash Inflow',
      data: userCashInflow,
    }, 
    {
      name: 'Cash Outflow',
      data: userCashOutflow,
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
        categories: transactionDate,
      },
      yaxis:{
        show: true,
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