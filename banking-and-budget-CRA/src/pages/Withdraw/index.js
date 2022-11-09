import React, { useState } from "react";
import { useEffect } from "react";
import Modal, { AdminModal } from "../../components/modal";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import { RoundedButton } from "../../components/button";
import { GetTransactionBalance} from "../../utilities/utilities";
import BankTransactions from "../BankTransactions";

const Withdraw = ({ getUserCode }) => {
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

    const userData = userTransactions.filter(
      (user) => user.userCode === `${getUserCode}`
    );    
    const totalBalance = GetTransactionBalance(userData, getUserCode)

    if (!enteredAmount && !enteredDesc) {
      alert("Please Fill Up Required Fields Properly");
    } else if(enteredAmount > totalBalance){
      alert('You have insufficient balance!')
      setEnteredAmount("");
      setEnteredDesc("");
    } else {
      const withdrawData = {
        userCode: getUserCode,
        title: "Withdraw",
        amount: enteredAmount * -1,
        description: enteredDesc,
        id: Math.random().toString(),
        date: new Date().toISOString().split('T')[0],
      };
  
      setEnteredAmount("");
      setEnteredDesc("");

      setUserTransaction([withdrawData,...userTransactions]);
    }
  };

  const handleWithdraw = () => {

  }
  return (
    <AdminModal>
       <BankTransactions getUserCode={getUserCode} transactionType="Withdraw" handleTransaction={handleWithdraw}/>
      {/* <form className="withdraw__form" onSubmit={submitHandler}>
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
        <RoundedButton displayText='Cancel' type="button"/>
        <RoundedButton displayText='Withdraw' type="submit"/>
      </form> */}
    </AdminModal>
  );
};

export default Withdraw;
