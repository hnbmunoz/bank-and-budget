import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "../../components/modal";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";

const Deposit = ({ getUserCode }) => {
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDesc, setEnteredDesc] = useState("");
  const [userTransactions, setUserTransaction, getUserTransactions] =
    useLocalStorageStore("userTransaction", []);

  useEffect(() => {
    getUserTransactions();
    return () => {};
  }, [enteredAmount]);

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };
  const descChangeHandler = (event) => {
    setEnteredDesc(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (!enteredAmount && !enteredDesc) {
      alert("Please Fill Up Required Fields Properly");
    } else {
      const depositData = {
        userCode: getUserCode,
        title: "Deposit",
        amount: enteredAmount,
        description: enteredDesc,
      };

      const deposit = [...userTransactions, depositData];
      setEnteredAmount("");
      setEnteredDesc("");
      setUserTransaction(deposit);
    }
  };
  return (
    <Modal>
      <form className="deposit__form" onSubmit={submitHandler}>
        <div className="deposit__controls">
          <div className="deposit__control">
            <label htmlFor="">Amount</label>
            <input
              value={enteredAmount}
              type="number"
              onChange={(event) => {
                amountChangeHandler(event);
              }}
            />
          </div>
          <div className="deposit__control">
            <label htmlFor="">Description</label>
            <input
              value={enteredDesc}
              type="text"
              onChange={(event) => {
                descChangeHandler(event);
              }}
            />
          </div>
        </div>
        <button type="button">Cancel</button>
        <button type="submit">Deposit</button>
      </form>
    </Modal>
  );
};

export default Deposit;
