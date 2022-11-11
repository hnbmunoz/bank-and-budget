import React from 'react';
import Modal, { AdminModal } from '../../components/modal';
import BalanceChart from './BalanceChart';
import ExpenseChart from './ExpenseChart';
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import { GetTransactionBalance } from "../../utilities/utilities";
import { useState, useEffect } from "react";

const Dashboard = ({getUserCode, displayPanel}) => {

  const [userStore, setUserStore, getUserStore] = useLocalStorageStore(
    "registeredUsers",
    []
  );
  const [userTransactions, setUserTransaction, getUserTransactions] =
    useLocalStorageStore("userTransaction", []);
  const [userBalance, setUserBalance] = useState(0);
  const [userCashInflow, setUserCashInflow] = useState(0);

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
    setUserBalance(prevBalance => prevBalance + totalBalance);
  };
  
   
  return (
    <AdminModal>
      <div className="dashboard">
        <div className='header'>
         <h2>Dashboard</h2>
        </div>     
        <div className="chart flex-row">
          <div className="chart-balance">
            <BalanceChart/>
          </div>
          <div className="chart-expense">
          <ExpenseChart/>
          </div>
        </div>
        <div className="user-info flex-row">
          <div className="user-card">
            "USER CARD"
          </div>
          <div className="user-info-balance">
            <div className="user-balance balance flex-row">
              <h3>Available Balance</h3>
              <div className='amount'>PHP {userBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
            </div>
            <div className="user-balance inflow flex-row">
             <h3>Total Cash Inflow</h3>
              <div className='amount'>PHP10000</div>
            </div>
            <div className="user-balance outflow flex-row">
             <h3>Total Cash Outflow</h3>
              <div className='amount'>-PHP10000</div>
            </div>
          </div>
        </div>
      </div>
    </AdminModal>
  )
};

export default Dashboard