import React, { useState, useEffect, useRef} from 'react'
import Modal, {DefaultPopUp} from '../../components/modal'
import { RoundedButton } from "../../components/button";
import { GetTransactionBalance} from "../../utilities/utilities"
import { Input } from "../../components/input";
import { CustomDropDown } from "../../components/input/DropDown";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";


export const AdminFundTransfer = ({getUserCode}) => {
  const [userTransactions, setUserTransaction, getUserTransactions] =
  useLocalStorageStore("userTransaction", []);
  const [userBalance, setUserBalance] = useState(0);
  const transferAmount = useRef();
  const transferDescription = useRef();
  const startingAccnt = useRef();
  const destinationAccnt = useRef();
  const [enteredDestination, setEnteredDestination] = useState("");

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
      // setEnteredAmount("");
      // setEnteredDesc("");
      // setEnteredDestination("");
    } else {
      const fundTransferData = {
        userCode: getUserCode,
        title: "Transfer",
        amount: amount * -1,
        destination: enteredDestination,
        description: "enteredDesc",
        id: Math.random().toString(),
        date:new Date(),
      };
      // setEnteredAmount("");
      // setEnteredDesc("");
      // setEnteredDestination("");
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
    startingAccnt.current.clearValue();
    destinationAccnt.current.clearValue();
  }
  return (
    <Modal>
       <div className='flex-column'>
      <div className="modal-header">
        Admin Fund Transfer Form 
      </div>
      <div className="modal-details"> 
        Bank Account Balance : {userBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </div>    
      <Input ref={startingAccnt} name="transactionStart" placeholderText='Current Account Number'   />
      <Input ref={destinationAccnt} name="transactionEnd" placeholderText='Destination Account Number'  /> 
         
      <Input ref={transferAmount} name="transactionAmount" placeholderText='Amount' number  />
      <Input ref={transferDescription} name="transactionDesc" placeholderText='Description'  /> 
     
      <div className="flex-row" style={{alignItems: "center", justifyContent: "space-evenly"}}>
        <RoundedButton displayText='Cancel' type="button" buttonClick={clearTransaction}/>      
        <RoundedButton displayText={`Transfer`} type="submit" buttonClick={getTransactionData} />                       
      </div>
    </div>
    </Modal>
  )
}

