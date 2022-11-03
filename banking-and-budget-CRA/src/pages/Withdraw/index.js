import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "../../components/modal";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";

const Withdraw = ({ getUserCode }) => {
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDesc, setEnteredDesc] = useState("");
  const [currBalance, setCurrBalance] = useState("");
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
      const withdrawData = {
        userCode: getUserCode,
        title: "Withdraw",
        amount: enteredAmount,
        description: enteredDesc,
        //userCode:
        //acctNumber:
      };
      // setCurrBalance(prevBalance => prevBalance - enteredAmount)
      setEnteredAmount("");
      setEnteredDesc("");

      setUserTransaction([...userTransactions, withdrawData]);
    }
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
