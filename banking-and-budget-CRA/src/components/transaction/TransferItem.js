import React from "react";

const TransferItem = ({ title, amount, description, destination }) => {
  return (
    <li>
      <div className="transfer-title">{title}</div>
      <div className="transfer-destination">{destination}</div>
      <div className="transfer-amount">{amount}</div>
      <div className="transfer-description">{description}</div>
    </li>
  );
};

export default TransferItem;
