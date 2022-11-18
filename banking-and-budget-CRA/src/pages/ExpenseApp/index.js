import React from 'react';
import Modal from "../../components/modal";
import { useState, useEffect } from "react";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense.";


const ExpenseApp = ({getUserCode, displayPanel}) => {
  const [userExpense, setUserExpense, getUserExpense] = useLocalStorageStore("userExpense",[]);
  const [expenses, setExpenses] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  useEffect(() => {
    getUserExpense();
    setUpdateList(false)
    return () => {};
  }, [displayPanel, updateList]);

  useEffect(() => {
    userExpense.length > 0 && getExpenses();
    return () => {};
  },[displayPanel, updateList]);

  const triggerUpdate = (update) => {
    setUpdateList(update)
  }

  const getExpenses = () => {
    const userData = userExpense.filter(
      (user) => user.userCode === `${getUserCode}`)

   setExpenses(userData);
  };

  const refreshStorage = () => {
    getUserExpense();
  }

  const removeExpense = (expenseCode) => {
    refreshStorage();
    
    let filteredExpense = userExpense.filter(obj => obj.expenseid !== expenseCode)

    setUserExpense(filteredExpense)
    getExpenses();
  }


  return (
      <Modal>
        <NewExpense getUserCode={getUserCode} updateList={triggerUpdate}/>
        <Expenses items={expenses} deleteExpense={removeExpense}/>
        <div className='modal-details'>Note : Double click item to remove it from expense list</div>
      </Modal>
  )
}

export default ExpenseApp