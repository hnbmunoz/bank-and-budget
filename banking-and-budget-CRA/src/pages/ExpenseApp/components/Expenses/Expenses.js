import { useState } from "react";

import ExpensesFilter from "../NewExpense/ExpenseFilter";
import Card from "../UI/Card";
import ExpenseList from "./ExpenseList";
import "./Expenses.css";

const Expenses = ({ items }) => {
  const [filteredYear, setFilteredYear] = useState("2020");

  const changeYearHandler = (enteredYear) => {
    setFilteredYear(enteredYear);
  };
  const newExpense = items.filter(
    (expenses) => expenses.date.getFullYear().toString() === filteredYear
  );

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={filteredYear}
          onChangeYear={changeYearHandler}
        />
        <ExpenseList items={newExpense} />
      </Card>
    </div>
  );
};

export default Expenses;
