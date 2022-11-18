import { useState } from "react";
import { RoundedButton } from "../../../../components/button"
import useLocalStorageStore from "../../../../utilities/hooks/useLocalStorage";
import {v4 as uuidv4} from "uuid";


const ExpenseForm = ({onSubmit, getUserCode, onCancel}) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [userExpense, setUserExpense, getUserExpense] = useLocalStorageStore("userExpense",[]);

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };



  const submitNewExpense = () => {
    if (enteredTitle && enteredAmount && enteredDate) {
      const expenseData = {
        userCode: getUserCode,
        title: enteredTitle,
        amount: enteredAmount,
        date: new Date(enteredDate),
        expenseid: uuidv4(),
      }
      setUserExpense([expenseData, ...userExpense])
      ;
      onSubmit();
      setEnteredTitle("");
      setEnteredAmount("");
      setEnteredDate("");
    }
  }

  return (
    <div>
      <div className="form">
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <div className="modal-details">Title</div>
            <input
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <div className="modal-details">Amount</div>
            <input
              type="number"
              value={enteredAmount}
              min="0.01"
              step="0.01"
              onChange={amountChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <div className="modal-details">Date</div>
            <input
              type="date"
              value={enteredDate}
              min="2019-01-01"
              max="2022-12-31"
              onChange={dateChangeHandler}
            />
          </div>
        </div>       
        <div className="flex-row" style={{alignItems:"center", justifyContent:"space-evenly"}}>
          <RoundedButton buttonClick={onCancel} displayText="Cancel"/>
          <RoundedButton buttonClick={submitNewExpense} displayText="Add Expense"/>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
