import React from 'react'
import Chart from 'react-apexcharts';
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import { useState, useEffect } from "react";

const ExpenseChart = ({getExpense, getUserCode, displayPanel}) => {
  const [userExpense, setUserExpense, getUserExpense] = useLocalStorageStore("userExpense",[]);
  const [expenses, setExpenses] = useState([]);

  
  useEffect(() => {
    getUserExpense();
    return () => {};
  }, [displayPanel]);

  useEffect(() => {
    userExpense.length > 0 && getExpenses();
    return () => {};
  }, [userExpense]);

  const getExpenses = () => {
    const userData = userExpense.filter(
      (user) => user.userCode === `${getUserCode}`)

   setExpenses(userData);
   getExpense(userData)
  };

const expensesTitle = expenses.map((data) => {return data.title.charAt(0).toUpperCase() + data.title.slice(1)})
const expensesAmount = expenses.map((data) => Number(data.amount))
// const randomColor = [Math.floor(Math.random() * 16777216).toString(16)];


  const series = expensesAmount;
  const options =  {
              fill: {
                type: 'gradient',
              },
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
              }],
              labels: expensesTitle,
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