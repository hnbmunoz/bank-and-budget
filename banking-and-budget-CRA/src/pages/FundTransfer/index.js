import React, { useState, useEffect } from "react";
import Modal from "../../components/modal";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import { RoundedButton } from "../../components/button";
import { GetTransactionBalance} from "../../utilities/utilities"

const FundTransfer = ({ getUserCode }) => {
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDesc, setEnteredDesc] = useState("");
  const [enteredDestination, setEnteredDestination] = useState("");
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
  const destChangeHandler = (e) => {
    setEnteredDestination(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const userData = userTransactions.filter(
      (user) => user.userCode === `${getUserCode}`
    );

    const totalBalance = GetTransactionBalance(userData, getUserCode)

    
    if (!enteredAmount && !enteredDestination && !enteredDesc) {
      alert("Please Fill Up Required Fields Properly");
    } else if( enteredAmount > totalBalance){
      alert('You have insufficient balance!')
      setEnteredAmount("");
      setEnteredDesc("");
      setEnteredDestination("");
    } else {
      const fundTransferData = {
        userCode: getUserCode,
        title: "Transfer",
        amount: enteredAmount * -1,
        destination: enteredDestination,
        description: enteredDesc,
        id: Math.random().toString(),
        date:new Date().toISOString().split('T')[0],
      };
      setEnteredAmount("");
      setEnteredDesc("");
      setEnteredDestination("");
      setUserTransaction([fundTransferData, ...userTransactions]);
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
        <RoundedButton displayText='Cancel' type="button"/>
        <RoundedButton displayText='Transfer' type="submit"/>
      </form>
    </Modal>
  );
};

export default FundTransfer;
