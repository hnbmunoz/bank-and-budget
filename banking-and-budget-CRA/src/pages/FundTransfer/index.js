import React, { useState, useEffect, useRef } from "react";
import Modal from "../../components/modal";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import { RoundedButton } from "../../components/button";
import { GetTransactionBalance, GetAccountBalance} from "../../utilities/utilities"
import { Input } from "../../components/input";
import { CustomDropDown } from "../../components/input/DropDown";

const FundTransfer = ({ getUserCode }) => {
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
  const destChangeHandler = (e) => {
    setEnteredDestination(e.target.value);
  };
 

  //////////////////////////
  const [userBalance, setUserBalance] = useState(0);
  const [enteredStarting, setEnteredStarting] = useState("");
  const [enteredDestination, setEnteredDestination] = useState("");

  const transferAmount = useRef();
  const transferDescription = useRef();
  const [currentAccounts, setCurrentAccounts] = useState([]);
  const [selectedAcct, setSelectedAcct] = useState("");

  const [userAccount, setUserAccount, getUserAccount] = useLocalStorageStore('userAccounts',[])

  useEffect(() => {
    // handleSearch();
    getAccounts();
  }, [getUserCode,currentAccounts]);


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
      const fundTransferData = {
        userCode: getUserCode,
        title: "Transfer",
        amount: amount * -1,
        destination: enteredDestination,
        from: enteredStarting,
        description: `Transferred to ${enteredDestination}`,
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
    // const transactionDesc = targetEl.divtransactionDesc.children.transactionDesc.value;
    
    handleTransaction(transactionAmount);
    getUserTransactions();
    getBalance();
    clearTransaction();
  }

  const clearTransaction = () => {
    transferAmount.current.clearValue();
    transferDescription.current.clearValue();
  }

  const getStartAcctNumber = (acct) => {
    setEnteredStarting(acct)

    const acctNum = acct
    const userData = userTransactions.filter(
      (user) => user.userCode === `${getUserCode}` && user.accountNumber === `${acctNum}`
    );
    const totalBalance = GetAccountBalance(userData)

    acctNum.trim() === "" ?setUserBalance(0) :setUserBalance(totalBalance);
    setSelectedAcct(acctNum)
  }

  const getEndAcctNumber = (acct) => {
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
        {/* <CustomDropDown name="" title="Current Account Number :"/>    */}
        <CustomDropDown 
            name="startAcctNumber"
            title="Current Accounts :"
            dataStore={userAccount}
            filterField="accountUser"
            selectedClient={getUserCode}
            getAccountBalance={getStartAcctNumber}
          />

        <Input ref={transferAmount} name="transactionAmount" placeholderText='Amount' number  />
        {/* <Input ref={transferDescription} name="transactionDesc" placeholderText='Description'  />  */}
        <CustomDropDown 
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
