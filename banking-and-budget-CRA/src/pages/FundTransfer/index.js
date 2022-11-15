import React, { useState, useEffect, useRef } from "react";
import Modal from "../../components/modal";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import { RoundedButton } from "../../components/button";
import { GetTransactionBalance, GetAccountBalance} from "../../utilities/utilities"
import { Input } from "../../components/input";
import { CustomDropDown } from "../../components/input/DropDown";

const FundTransfer = ({ getUserCode, displayPanel = 0 }) => {
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDesc, setEnteredDesc] = useState("");
  const [userTransactions, setUserTransaction, getUserTransactions] = useLocalStorageStore("userTransaction", []);
  const [userBalance, setUserBalance] = useState(0);
  const [enteredStarting, setEnteredStarting] = useState("");
  const [enteredDestination, setEnteredDestination] = useState("");
  const [currentAccounts, setCurrentAccounts] = useState([]);
  const [selectedAcct, setSelectedAcct] = useState("");

  const transferAmount = useRef();
  const inputDropStart = useRef();
  const inputDropEnd = useRef();

  const [userAccount, setUserAccount, getUserAccount] = useLocalStorageStore('userAccounts',[])

  
  useEffect(() => {
    getUserTransactions();
    return () => {};
  }, [displayPanel]);

  useEffect(() => {
    getUserAccount();
    getAccounts();
  }, [getUserCode,enteredStarting]);


  const getAccounts = () => {
    const userData = userTransactions.filter(
      (user) => user.userCode === getUserCode
    );
    const currAccounts = userAccount.filter((acct) => acct.accountUser === getUserCode)
    setCurrentAccounts(currAccounts);
  }

  const getBalance = () => {     
    const userData = userTransactions.filter(
      (user) => user.userCode === `${getUserCode}`
    );
    const totalBalance = GetTransactionBalance(userData, getUserCode)
    setUserBalance(totalBalance);
  };

  const handleTransaction = (amount) => {

    if (!amount && !enteredDestination) {
      alert("Please Fill Up Required Fields Properly");
    } else if( amount > userBalance){
      alert('You have insufficient balance!')
      setEnteredAmount("");
      setEnteredDesc("");
      setEnteredDestination("");
    } else {
      const transferDataFrom = {
        userCode: getUserCode,
        title: "Transfer",
        amount: amount * -1,
        accountNumber: enteredStarting,
        description: `Transferred to ${enteredDestination}`,
        id: Math.random().toString(),
        date:new Date(),
      };
      const transferDataTo = {
        userCode: getUserCode,
        title: "Transfer",
        amount: amount ,
        accountNumber: enteredDestination,
        description: `Transferred from ${enteredStarting}`,
        id: Math.random().toString(),
        date:new Date(),
      };
      setEnteredAmount("");
      setEnteredDesc("");
      setEnteredDestination("");
      setUserTransaction([...userTransactions,transferDataFrom,transferDataTo]);
    }

  }

  const getTransactionData =  (e) => {        
    const targetEl = e.currentTarget.parentElement.parentElement.parentElement.children;    
    const transactionAmount = targetEl.divtransactionAmount.children.transactionAmount.value;
    // const transactionDesc = targetEl.divtransactionDesc.children.transactionDesc.value;
    
    handleTransaction(transactionAmount);
    getUserTransactions();
    // getBalance();
    clearTransaction();
  }

  const clearTransaction = () => {
    transferAmount.current.clearValue();
    inputDropStart.current.clearValue();
    inputDropEnd.current.clearValue();
  }

  const getStartAcctNumber = (acct = "") => {
    setEnteredStarting(acct)

    const acctNum = acct
    const userData = userTransactions.filter(
      (user) => user.userCode === `${getUserCode}` && user.accountNumber === `${acctNum}`
    );
    const totalBalance = GetAccountBalance(userData)

    acctNum.trim() === "" ? setUserBalance(0) :setUserBalance(totalBalance);
    setSelectedAcct(acctNum)
  }

  const getEndAcctNumber = (acct ="") => {
    setEnteredDestination(acct)
  }

  return (
    <Modal>
      <div className='flex-column'>
        <div className="modal-header">
          Fund Transfer Form 
        </div>
        <div className="modal-details"> 
          Bank Account Balance : {userBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </div>    
        <CustomDropDown 
            ref={inputDropStart}
            name="startAcctNumber"
            title="Current Accounts :"
            dataStore={userAccount}
            filterField="accountUser"
            selectedClient={getUserCode}
            getAccountBalance={getStartAcctNumber}
          />

        <Input ref={transferAmount} name="transactionAmount" placeholderText='Amount' number  />
        <CustomDropDown
            ref={inputDropEnd} 
            name="endAcctNumber"
            title="Destination Accounts :"
            dataStore={userAccount}
            filterField="accountUser"
            selectedClient={getUserCode}
            getAccountBalance={getEndAcctNumber}
          />
        <div className="flex-row" style={{alignItems: "center", justifyContent: "space-evenly"}}>
          <RoundedButton displayText='Cancel' type="button" buttonClick={clearTransaction}/>      
          <RoundedButton displayText={`Transfer`} type="submit" buttonClick={getTransactionData} />                       
        </div>
      </div>
      </Modal>
  );
};

export default FundTransfer;
