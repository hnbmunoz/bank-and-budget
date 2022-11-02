import React, { useState } from "react";
import Modal from "../../components/modal";

const Deposit = ({ userBalance }) => {
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDesc, setEnteredDesc] = useState("");

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };
  const descChangeHandler = (event) => {
    setEnteredDesc(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const depositData = {
      title: "Deposit",
      amount: enteredAmount,
      description: enteredDesc,
    };

    setEnteredAmount("");
    setEnteredDesc("");
    userBalance(depositData);
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
