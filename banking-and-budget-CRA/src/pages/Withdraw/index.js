import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "../../components/modal";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import { RoundedButton } from "../../components/button"

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
    const totalBalance = userData
    .filter((data) => data.userCode === `${getUserCode}`)
    .reduce((total, transaction) => {
      return total + Number(transaction.amount);
    }, 0);

    if (!enteredAmount && !enteredDesc) {
      alert("Please Fill Up Required Fields Properly");
    } else if(totalBalance < enteredAmount){
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
      };
  
      setEnteredAmount("");
      setEnteredDesc("");

      setUserTransaction([withdrawData,...userTransactions]);
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
        <RoundedButton displayText='Cancel' type="button"/>
        <RoundedButton displayText='Withdraw' type="submit"/>
      </form>
    </Modal>
  );
};

export default Withdraw;
