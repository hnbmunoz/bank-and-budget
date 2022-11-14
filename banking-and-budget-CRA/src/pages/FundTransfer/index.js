import React, { useState, useEffect, useRef } from "react";
import Modal from "../../components/modal";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import { RoundedButton } from "../../components/button";
import { GetTransactionBalance} from "../../utilities/utilities"
import { Input } from "../../components/input";
import { CustomDropDown } from "../../components/input/DropDown";

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
        date:new Date(),
      };
      setEnteredAmount("");
      setEnteredDesc("");
      setEnteredDestination("");
      setUserTransaction([fundTransferData, ...userTransactions]);
    }
  };


  //////////////////////////
  const [userBalance, setUserBalance] = useState(0);
  const transferAmount = useRef();
  const transferDescription = useRef();

  const getBalance = () => {     
    const userData = userTransactions.filter(
      (user) => user.userCode === `${getUserCode}`
    );
    const totalBalance = GetTransactionBalance(userData, getUserCode)
    setUserBalance(totalBalance);
  };

  const handleTransaction = (amount, description) => {

    if (!amount && !enteredDestination && !description) {
      alert("Please Fill Up Required Fields Properly");
    } else if( amount > userBalance){
      alert('You have insufficient balance!')
      setEnteredAmount("");
      setEnteredDesc("");
      setEnteredDestination("");
    } else {
      const fundTransferData = {
        userCode: getUserCode,
        title: "Transfer",
        amount: amount * -1,
        destination: enteredDestination,
        description: enteredDesc,
        id: Math.random().toString(),
        date:new Date(),
      };
      setEnteredAmount("");
      setEnteredDesc("");
      setEnteredDestination("");
      setUserTransaction([fundTransferData, ...userTransactions]);
    }

  }

  const getTransactionData =  (e) => {        
    const targetEl = e.currentTarget.parentElement.parentElement.parentElement.children;    
    const transactionAmount = targetEl.divtransactionAmount.children.transactionAmount.value;
    const transactionDesc = targetEl.divtransactionDesc.children.transactionDesc.value;
    handleTransaction(transactionAmount, transactionDesc);
    getUserTransactions();
    getBalance();
    clearTransaction();
  }

  const clearTransaction = () => {
    transferAmount.current.clearValue();
    transferDescription.current.clearValue();
  }
  return (
    <Modal>
      {/* <form className="fundtransfer__form" onSubmit={submitHandler}>
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
      </form> */}

    <div className='flex-column'>
      <div className="modal-header">
        Fund Transfer Form 
      </div>
      <div className="modal-details"> 
        Bank Account Balance : {userBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </div>    
      <CustomDropDown name="" title="Current Account Number :"/>     
      <Input ref={transferAmount} name="transactionAmount" placeholderText='Amount' number  />
      <Input ref={transferDescription} name="transactionDesc" placeholderText='Description'  /> 
      <CustomDropDown name="" title="Destination Account Number :"/>
      <div className="flex-row" style={{alignItems: "center", justifyContent: "space-evenly"}}>
        <RoundedButton displayText='Cancel' type="button" buttonClick={clearTransaction}/>      
        <RoundedButton displayText={`Transfer`} type="submit" buttonClick={getTransactionData} />                       
      </div>
    </div>
    </Modal>
  );
};

export default FundTransfer;
