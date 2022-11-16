import React, { useState, useEffect, useRef} from 'react'
import Modal, {DefaultPopUp} from '../../components/modal'
import { RoundedButton } from "../../components/button";
import { GetTransactionBalance, findUserbyAccount} from "../../utilities/utilities"
import { Input } from "../../components/input";
import { CustomDropDown } from "../../components/input/DropDown";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";


export const AdminFundTransfer = ({getUserCode, displayPanel = 0}) => {
  const [userTransactions, setUserTransaction, getUserTransactions] =
  useLocalStorageStore("userTransaction", []);
  const [userAccount, setUserAccount, getUserAccount] = useLocalStorageStore('userAccounts',[])

  const [userBalance, setUserBalance] = useState(0);
  const [enteredStarting, setEnteredStarting] = useState("");
  const [enteredDestination, setEnteredDestination] = useState("");


  const transferAmount = useRef();
  const transferDescription = useRef();
  const startingAccnt = useRef();
  const destinationAccnt = useRef();

  useEffect(() => {
    getUserAccount();
    getUserTransactions();
  },[getUserCode, displayPanel])
 

  const getBalance = () => {     
    const userData = userTransactions.filter(
      (user) => user.userCode === `${getUserCode}`
    );
    const totalBalance = GetTransactionBalance(userData, getUserCode)
    setUserBalance(totalBalance);
  };

  const handleTransaction = (amount, startAccount, endAccount) => {

    if (!amount && !startAccount && !endAccount) {
      alert("Please Fill Up Required Fields Properly");
    } 
    // else if( amount > userBalance){
    //   alert('You have insufficient balance!')
     
    // }
     else {
      debugger
      const fundTransferFrom = {
        userCode: findUserbyAccount(userAccount,startAccount),
        title: "Withdraw",
        amount: amount * -1,
        accountNumber: startAccount,
        description: `Transferred to ${endAccount}`,
        id: Math.random().toString(),
        date:new Date(),
      };

      const fundTransferTo = {
        userCode: findUserbyAccount(userAccount,endAccount),
        title: "Deposit",
        amount: amount ,
        accountNumber: endAccount,
        description: `Transferred from ${startAccount}`,
        id: Math.random().toString(),
        date:new Date(),
      };
     
      setUserTransaction([...userTransactions, fundTransferFrom, fundTransferTo]);
    }

  }

  const getTransactionData =  (e) => {        
    const targetEl = e.currentTarget.parentElement.parentElement.parentElement.children;    
    const transactionAmount = targetEl.divtransactionAmount.children.transactionAmount.value;
    const startingAccount = targetEl.divtransactionStart.children.transactionStart.value;
    const destinationAccount = targetEl.divtransactionEnd.children.transactionEnd.value;
    handleTransaction(transactionAmount, startingAccount, destinationAccount);
    getUserTransactions();
    getBalance();
    clearTransaction();
  }

  const clearTransaction = () => {
    transferAmount.current.clearValue();
    // transferDescription.current.clearValue();
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
        {/* <Input ref={transferDescription} name="transactionDesc" placeholderText='Description'  />  */}
      
        <div className="flex-row" style={{alignItems: "center", justifyContent: "space-evenly"}}>
          <RoundedButton displayText='Cancel' type="button" buttonClick={clearTransaction}/>      
          <RoundedButton displayText={`Transfer`} type="submit" buttonClick={getTransactionData} />                       
        </div>
      </div>
    </Modal>
  )
}

