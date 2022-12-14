import React, { useState } from "react";
import { useEffect } from "react";
import Modal, { AdminModal } from "../../components/modal";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import BankTransactions from "../BankTransactions";
import { GetTransactionBalance } from "../../utilities/utilities";

const WithdrawTransaction = ({ getUserCode, displayPanel }) => {  
  const [userBalance, setUserBalance] = useState(0)
  const [userTransactions, setUserTransaction, getUserTransactions] = useLocalStorageStore("userTransaction", []);
  const [userStore, setUserStore, getUserStore] = useLocalStorageStore("registeredUsers",[]);
  
  useEffect(() => {
    getUserTransactions();
    getUserStore();
    setUserBalance(0)
    return () => {};
  }, [getUserCode, displayPanel]);

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
 
  const handleWithdraw = (amount, description, acctNum) => {
    if (!amount && !description) {
      alert("Please Fill Up Required Fields Properly");
    } else if(amount > userBalance){
      alert('You have insufficient balance!')     
    } else {
      const withdrawData = {
        userCode: getUserCode,
        title: "Withdraw",
        amount: Number(amount) * -1,
        accountNumber: acctNum,
        description: description,
        id: Math.random().toString(),
        date: new Date,
        flow: "Out"
      };  
      setUserTransaction([withdrawData,...userTransactions]);
    }
  };

  const refreshStorage = () => {
    getUserTransactions();
    getUserStore();   
  }

  return (
    <Modal>          
      <BankTransactions 
        getUserCode={getUserCode}
        transactionType="Withdraw"
        handleTransaction={handleWithdraw}
        displayPanel={displayPanel}
        refreshStorage={refreshStorage}
      />   
    </Modal>
  );
};

export default WithdrawTransaction;