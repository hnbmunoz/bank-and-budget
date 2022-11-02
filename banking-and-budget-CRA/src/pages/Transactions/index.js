import React, { useState, useEffect } from "react";
import Modal from "../../components/modal";

const Transactions = ({ transactionData }) => {
  return (
    <Modal>
      {/* <div className="transaction">
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
      </div> */}
    </Modal>
  );
};

export default Transactions;
