import { useState } from "react";
import Card from "../../../../components/card";
import ExpensesFilter from "../NewExpense/ExpenseFilter";
import ExpenseList from "./ExpenseList";
import useLocalStorageStore from "../../../../utilities/hooks/useLocalStorage";


const Expenses = ({ items }) => {
  const [filteredYear, setFilteredYear] = useState("2022");
  const changeYearHandler = (enteredYear) => {
    setFilteredYear(enteredYear);
  };

  const newExpense = items.filter(
    (expenses) => new Date(expenses.date).getFullYear().toString() === filteredYear
  );
  return (
    <>
     <Card className="expenses">
        <ExpensesFilter
          selected={filteredYear}
          onChangeYear={changeYearHandler}
        />
        <ExpenseList  items={newExpense}/>
        
      </Card>
    </>
  );
};

export default Expenses;
