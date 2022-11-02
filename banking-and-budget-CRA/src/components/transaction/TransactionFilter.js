import React from "react";

const TransactionFilter = () => {
  const filterHandler = (event) => {
    console.log(event.target.value);
  };
  return (
    <div>
      <div className="transaction__date">
        <label>Select Date</label>
        <input type="Date" />
      </div>
      <button
        className="transaction__deposit"
        value="Deposit"
        onClick={filterHandler}
      >
        Deposit
      </button>
      <button
        className="transaction__withdraw"
        value="Withdraw"
        onClick={filterHandler}
      >
        Withdraw
      </button>
      <button
        className="transaction__transfer"
        value="Transfer"
        onClick={filterHandler}
      >
        Transfer
      </button>
    </div>
  );
};

export default TransactionFilter;
