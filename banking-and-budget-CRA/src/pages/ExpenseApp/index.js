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

  return (
      <Modal>
        <NewExpense getUserCode={getUserCode} updateList={triggerUpdate}/>
        <Expenses items={expenses} />
      </Modal>
  )
}

export default ExpenseApp