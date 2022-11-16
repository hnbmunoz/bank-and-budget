import React from 'react';
import Modal from "../../components/modal";
import { useState, useEffect } from "react";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense.";


const ExpenseApp = ({getUserCode, displayPanel}) => {
  const [userExpense, setUserExpense, getUserExpense] = useLocalStorageStore("userExpense",[]);
  const [expenses, setExpenses] = useState([]);

  

  const getExpenses = () => {
    const userData = userExpense.filter(
      (user) => user.userCode === `${getUserCode}`)

   setExpenses(userData);
  };

  useEffect(() => {
    userExpense.length > 0 && getExpenses();
    return () => {};
  },[userExpense]);

  useEffect(() => {
    getUserExpense();
    return () => {};
  }, [displayPanel]);






  return (
      <Modal>
        <NewExpense getUserCode={getUserCode}/>
        <Expenses items={expenses} />
      </Modal>
  )
}

export default ExpenseApp