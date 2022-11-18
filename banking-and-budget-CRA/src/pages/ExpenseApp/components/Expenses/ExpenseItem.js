import Card from "../../../../components/card";
import ExpenseDate from "./ExpenseDate";
import React,{ useState } from "react";

function ExpenseItem({title, date, amount, expenseid, deleteExpense}) {

  const getItemtoDelete = () => {
    deleteExpense(expenseid)
  }
  
  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={date} />
        <div className="expense-item__description" onClick={getItemtoDelete}>
          <h2>{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
          <div className="expense-item__price">{amount}</div>
        </div>
      </Card>
    </li>
  );
}

export default ExpenseItem;
