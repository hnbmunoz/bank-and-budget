import React, { useState } from "react";
import Modal from "../../components/modal";

const Withdraw = ({ userBalance }) => {
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
    const withdrawData = {
      title: "Withdraw",
      amount: enteredAmount,
      description: enteredDesc,
    };
    setEnteredAmount("");
    setEnteredDesc("");
    userBalance(withdrawData);
  };
  return (
    <Modal>
      <form className="withdraw__form" onSubmit={submitHandler}>
        <div className="withdraw__controls">
          <div className="withdraw__control">
            <label htmlFor="">Amount</label>
            <input
              value={enteredAmount}
              type="number"
              onChange={amountChangeHandler}
            />
          </div>
          <div className="withdraw__control">
            <label htmlFor="">Description</label>
            <input
              value={enteredDesc}
              type="text"
              onChange={descChangeHandler}
            />
          </div>
        </div>
        <button type="button">Cancel</button>
        <button type="submit">Withdraw</button>
      </form>
    </Modal>
  );
};

export default Withdraw;
