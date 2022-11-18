import React, { useState, useEffect } from "react";
import Modal from "../../components/modal";
import TransactionFilter from "./TransactionFilter";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import TransactionList from "./TransactionList";



const Transactions = ({getUserCode, displayPanel}) => {

  const [userTransactions, setUserTransaction, getUserTransactions] =
  useLocalStorageStore("userTransaction", []);
  const [displayTransaction,setDisplayTransaction] = useState('All Transactions')
  const [userData, setUserData] = useState([]);
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);


  useEffect(() => {
    getUserTransactions();
   
    return () => {};
  }, [getUserCode, displayPanel]);


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
    const newDate = new Date(date).toISOString().split('T')[0]
    setFilterDate(newDate);

  }
  const transactionFilter = (selectedFilter) => {
    setDisplayTransaction(selectedFilter);
  };

  const filteredByDate = userData.filter(data=>{
  return new Date(data.date).toISOString().split('T')[0] === filterDate})


  
  const filteredByTransaction = filteredByDate.filter(data=>{
    return data.title === displayTransaction;
  });

  return (
    <Modal>
      <div className="transaction flex-column">
        {/* <h2 className="transaction__header">Transactions</h2> */}
        <div className="modal-header">Transactions</div>
        <div className="transaction__content">
          <nav className="navbar">
           <TransactionFilter onTransaction={transactionFilter} onDate={getDate} currentDate={filterDate}/>
          </nav>
           <TransactionList filterDate={filteredByDate} filterTransaction={filteredByTransaction} displayTransaction={displayTransaction}/>
        </div>
      </div>
    </Modal>
  );
};

export default Transactions;
