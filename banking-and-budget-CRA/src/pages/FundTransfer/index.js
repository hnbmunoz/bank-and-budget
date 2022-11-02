import React, { useState, useEffect } from "react";
import Modal from "../../components/modal";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";

const FundTransfer = ({ userBalance }) => {
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDesc, setEnteredDesc] = useState("");
  const [enteredDestination, setEnteredDestination] = useState("");
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
  const destChangeHandler = (event) => {
    setEnteredDestination(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (!enteredAmount && !enteredDestination && !enteredDesc) {
      alert("Please Fill Up Required Fields Properly");
    } else {
      const fundTransferData = {
        title: "Transfer",
        amount: enteredAmount,
        destination: enteredDestination,
        description: enteredDesc,
      };
      setEnteredAmount("");
      setEnteredDesc("");
      setEnteredDestination("");
      setUserTransaction([...userTransactions, fundTransferData]);
    }
  };
  return (
    <Modal>
      <form className="fundtransfer__form" onSubmit={submitHandler}>
        <div className="fundtransfer__controls">
          <div className="fundtransfer__control">
            <label htmlFor="">Amount</label>
            <input
              value={enteredAmount}
              type="number"
              onChange={amountChangeHandler}
            />
          </div>
          <div className="fundtransfer__control">
            <label htmlFor="">Description</label>
            <input
              value={enteredDesc}
              type="text"
              onChange={descChangeHandler}
            />
          </div>
          <div className="fundtransfer__control">
            <label htmlFor="">Destination Account</label>
            <input
              value={enteredDestination}
              type="number"
              onChange={destChangeHandler}
            />
          </div>
        </div>
        <button type="button">Cancel</button>
        <button type="submit">Transfer</button>
      </form>
    </Modal>
  );
};

export default FundTransfer;
