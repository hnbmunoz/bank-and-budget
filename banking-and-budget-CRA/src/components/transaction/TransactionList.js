import React from "react";
import DepositItem from "./DepositItem";
import TransferItem from "./TransferItem";
import WithdrawItem from "./WithdrawItem";

const TransactionList = ({ depositData, withdrawData, transferData }) => {
  return (
    <ul className="transaction-list">
      <DepositItem
        title={depositData.title}
        amount={depositData.amount}
        description={depositData.description}
      />
      <WithdrawItem
        title={withdrawData.title}
        amount={withdrawData.amount}
        description={withdrawData.description}
      />
      <TransferItem
        title={transferData.title}
        amount={transferData.amount}
        description={transferData.description}
        destination={transferData.destination}
      />
    </ul>
  );
};

export default TransactionList;
