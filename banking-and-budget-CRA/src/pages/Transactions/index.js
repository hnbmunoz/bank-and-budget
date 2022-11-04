import React, { useState, useEffect } from "react";
import Modal from "../../components/modal";
import TransactionFilter from "./TransactionFilter";
import TransactionItem from "./TransactionItem";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";



const Transactions = ({getUserCode, displayPanel}) => {

  const [userTransactions, setUserTransaction, getUserTransactions] =
  useLocalStorageStore("userTransaction", []);

  const [displayTransaction,setDisplayTransaction] = useState('All Transactions')


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
  };

  const changeTransactionHandler = (selectedFilter) => {
    setDisplayTransaction(selectedFilter);
  };
 
  const filteredTransaction = userTransactions.filter(data=>{
    return data.title === displayTransaction;
  })

  if (userTransactions.length === 0) {
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
           <TransactionFilter onFilter={changeTransactionHandler}/>
          </nav>
          <div className="transaction__display">
            <h2 className="transaction_filter">{displayTransaction}</h2>
            {(displayTransaction === 'All Transactions' ? userTransactions : filteredTransaction).map((transaction) => 
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
