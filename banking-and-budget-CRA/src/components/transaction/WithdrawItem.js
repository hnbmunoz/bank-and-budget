import React from "react";

const WithdrawItem = ({ title, amount, description }) => {
  return (
    <li>
      <div className="withdraw-title">{title}</div>
      <div className="withdraw-amount">{amount}</div>
      <div className="withdraw-description">{description}</div>
    </li>
  );
};

export default WithdrawItem;
