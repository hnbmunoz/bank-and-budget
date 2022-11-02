import React, { useState, useEffect } from "react";
import Modal from "../../components/modal";
import TransactionFilter from "../../components/transaction/TransactionFilter";
import TransactionList from "../../components/transaction/TransactionList";

const Transactions = ({ transactionData }) => {
  const [userDeposit, setUserDeposit] = useState("");

  const { deposit, withdraw, transfer } = transactionData;
  console.log(deposit, withdraw, transfer);
  // const withdrawData = transactionData.withdraw;
  // const transferData = transactionData.transfer;

  return (
    <Modal>
      <div className="transaction">
        <div className="transaction__header">Transactions</div>
        <div className="transaction_content">
          <nav className="navbar">
            <TransactionFilter />
          </nav>
          <div className="transaction__display">
            <TransactionList
              depositData={deposit}
              withdrawData={withdraw}
              transferData={transfer}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Transactions;
