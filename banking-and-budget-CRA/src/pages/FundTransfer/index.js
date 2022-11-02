import React, { useState } from "react";
import Modal from "../../components/modal";

const FundTransfer = ({ userBalance }) => {
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDesc, setEnteredDesc] = useState("");
  const [enteredDestination, setEnteredDestination] = useState("");

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
    const fundtransferData = {
      title: "Transfer To",
      amount: enteredAmount,
      destination: enteredDestination,
      description: enteredDesc,
    };

    setEnteredAmount("");
    setEnteredDesc("");
    setEnteredDestination("");
    userBalance(fundtransferData);
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
