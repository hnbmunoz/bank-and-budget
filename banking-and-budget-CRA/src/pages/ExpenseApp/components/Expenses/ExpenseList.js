import ExpenseItem from "./ExpenseItem";
import React from 'react';

const ExpenseList = ({ items, deleteExpense }) => {
  if (items.length === 0) {
    return <div className="expenses-list__fallback modal-details">Found no expenses!</div>;
  }

  
  return (
    <ul className="expenses-list">
      {items.map((expense) => (
        <ExpenseItem
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          key={expense.expenseid}
          expenseid={expense.expenseid}
          deleteExpense={deleteExpense}
        />
      ))}
    </ul>
  );
};

export default ExpenseList;
