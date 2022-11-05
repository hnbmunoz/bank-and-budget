import React, { useState, useEffect } from "react";
import Modal from "../../components/modal";
import TransactionFilter from "./TransactionFilter";
import TransactionItem from "./TransactionItem";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";



const Transactions = ({getUserCode, displayPanel}) => {

  const [userTransactions, setUserTransaction, getUserTransactions] =
  useLocalStorageStore("userTransaction", []);
  const [displayTransaction,setDisplayTransaction] = useState('All Transactions')
  const [userData, setUserData] = useState([]);
  const [filterDate, setFilterDate] = useState('');


  useEffect(() => {
    getUserTransactions();
   
    return () => {};
  }, [displayPanel]);


  useEffect(() => {
    userTransactions.length > 0 && getTransactions();
    return () => {};
  }, [userTransactions]);

  const getTransactions = () => {
    const userData = userTransactions.filter(
      (user) => user.userCode === `${getUserCode}`)
    setUserData(userData)
  };
  const getDate = (date) => {
    const regex = /\//g;
    const newDate = date.replace(regex, '-')
    setFilterDate(newDate);

  }
  const transactionFilter = (selectedFilter) => {
    setDisplayTransaction(selectedFilter);
  };

  const filteredByDate = userData.filter(data=>{
    return data.date === filterDate});

  
  const filteredByTransaction = filteredByDate.filter(data=>{
    return data.title === displayTransaction;
  });

  if (displayTransaction.length === 0) {
    return <Modal> 
    <div className="transaction__header">Transactions</div>
    <h2 className="transaction__fallback">No Transactions!</h2>
    </Modal>
      
  };
 
  return (
    <Modal>
      <div className="transaction">
        <div className="transaction__header">Transactions</div>
        <div className="transaction_content">
          <nav className="navbar">
           <TransactionFilter onTransaction={transactionFilter} onDate={getDate}/>
          </nav>
          <div className="transaction__display">
            <h2 className="transaction_filter">{displayTransaction}</h2>
            {(displayTransaction === 'All Transactions' ? userData : filteredByTransaction).map((transaction) => 
              <TransactionItem 
                title={transaction.title}
                amount={transaction.amount.toLocaleString("en-US")}
                description={transaction.description}
                key={transaction.id}

              />
            )}           
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Transactions;
