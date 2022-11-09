import React, { useState } from "react";
import { useEffect } from "react";
import Modal, { AdminModal } from "../../components/modal";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import BankTransactions from "../BankTransactions";
import { GetTransactionBalance } from "../../utilities/utilities";

const DepositTransaction = ({ getUserCode, displayPanel }) => {  
  const [userBalance, setUserBalance] = useState(0)
  const [userTransactions, setUserTransaction, getUserTransactions] = useLocalStorageStore("userTransaction", []);
  const [userStore, setUserStore, getUserStore] = useLocalStorageStore("registeredUsers",[]);
  
  
  useEffect(() => {
    getUserTransactions();
    setUserBalance(0)
    return () => {};
  }, [displayPanel]);

  useEffect(() => {
    userStore.length > 0 && getBalance();
    return () => {};
  }, [userTransactions]);

 

  const getBalance = () => {
    const userData = userTransactions.filter(
      (user) => user.userCode === `${getUserCode}`
    );

    const totalBalance = GetTransactionBalance(userData, getUserCode)
    setUserBalance(totalBalance);    
  };
 
  const handleDeposit = (amount, description) => {
    if (!amount && !description) {
      alert("Please Fill Up Required Fields Properly");
    } else {
      setUserBalance(userBalance + amount)  
          
      const depositData = {
        userCode: getUserCode,
        title: "Deposit",
        amount: amount,
        description: description,
        id: Math.random().toString(),
        date: new Date().toISOString().split('T')[0],
      };
    
      setUserTransaction([depositData, ...userTransactions ]);
    }
  }

  return (
    <Modal>          
      <BankTransactions getUserCode={getUserCode} transactionType="Deposit" handleTransaction={handleDeposit} displayPanel={displayPanel}/>   
    </Modal>
  );
};

export default DepositTransaction;