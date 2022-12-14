import React from "react";

const ExpensesFilter = (props) => {
  const changeYearHandler = (event) => {
    props.onChangeYear(event.target.value);
  };
  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <div className="modal-details">Filter by year</div>
        <select value={props.selected} onChange={changeYearHandler}>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
