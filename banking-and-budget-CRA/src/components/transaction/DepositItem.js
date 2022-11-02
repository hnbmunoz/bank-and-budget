import React from "react";

const DepositItem = ({ title, amount, description }) => {
  return (
    <li>
      <div className="deposit-title">{title}</div>
      <div className="deposit-amount">{amount}</div>
      <div className="deposit-description">{description}</div>
    </li>
  );
};

export default DepositItem;
