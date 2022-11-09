import React, { useState } from "react";
import { useEffect } from "react";
import Modal, { AdminModal } from "../../components/modal";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import { RoundedButton } from "../../components/button"
import BankTransactions from "../BankTransactions";

const Deposit = ({ getUserCode }) => {
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDesc, setEnteredDesc] = useState("");
  const [userTransactions, setUserTransaction, getUserTransactions] =
    useLocalStorageStore("userTransaction", []);

  useEffect(() => {
    getUserTransactions();
    return () => {};
  }, [enteredAmount]);

  const amountChangeHandler = (e) => {
    setEnteredAmount(e.target.value);
  };
  const descChangeHandler = (e) => {
    setEnteredDesc(e.target.value);
  };
 
  
  const submitHandler = (e) => {

    e.preventDefault();
    if (!enteredAmount && !enteredDesc) {
      alert("Please Fill Up Required Fields Properly");
    } else {
      const depositData = {
        userCode: getUserCode,
        title: "Deposit",
        amount: enteredAmount,
        description: enteredDesc,
        id: Math.random().toString(),
        date: new Date().toISOString().split('T')[0],
      };

      setEnteredAmount("");
      setEnteredDesc("");
      setUserTransaction([depositData, ...userTransactions ]);
    }
  };

  const handleDeposit = (amount, description) => {
    alert(amount)
    alert(description)
  }

  return (
    <AdminModal>
      <BankTransactions getUserCode={getUserCode} transactionType="Deposit" handleTransaction={handleDeposit}/>
      {/* <form className="deposit__form" onSubmit={submitHandler}>
        <div className="deposit__controls">
          <div className="deposit__control">
            <label htmlFor="">Amount</label>
            <input
              placeholderText="Amount"
              value={enteredAmount}
              type="number"
              onChange={(e) => {
                amountChangeHandler(e);
              }}
            />
          </div>
          <div className="deposit__control">
            <label htmlFor="">Description</label>
            <input
              value={enteredDesc}
              type="text"
              onChange={(e) => {
                descChangeHandler(e);
              }}
            />
          </div>
        </div>
        <RoundedButton displayText='Cancel' type="button"/>
        <RoundedButton displayText='Deposit' type="submit"/>
      </form> */}
    </AdminModal>
  );
};

export default Deposit;
