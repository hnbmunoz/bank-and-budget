import React from 'react';
import Modal, { AdminModal } from '../../components/modal';
import BalanceChart from './BalanceChart';
import ExpenseChart from './ExpenseChart';
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import { GetCashInflow, GetCashOutflow, GetTransactionBalance } from "../../utilities/utilities";
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
  const [userCashOutflow, setUserCashOutflow] = useState(0);

  useEffect(() => {
    getUserTransactions();
    setUserBalance(0)
    setUserCashInflow(0)
    setUserCashOutflow(0)
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

    const totalCashInflow = GetCashInflow(userData);
    setUserCashInflow(prevBalance => prevBalance + totalCashInflow)

    const totalCashOutflow = GetCashOutflow (userData);
    setUserCashOutflow(prevBalance => prevBalance + totalCashOutflow)
    
  };
  
   
  return (
    <AdminModal>
      <div className="dashboard">
        <div className='header'>
         <h2>Dashboard</h2>
        </div>     
        <div className="chart flex-row">
          <div className="chart-balance">
            <BalanceChart getUserCode={getUserCode} displayPanel={displayPanel}/>
          </div>
          <div className="chart-expense">
          <ExpenseChart />
          </div>
        </div>
        <div className="user-info flex-row">
          <div className="user-card">
            "USER CARD"
          </div>
          <div className="user-info-balance flex-column">
            <div className="user-balance balance flex-row">
              <div>Available Balance</div>
              <div className='amount'> {userBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
            </div>
            <div className="user-balance inflow flex-row">
             <div>Total Cash Inflow</div>
              <div className='amount'> {userCashInflow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
            </div>
            <div className="user-balance outflow flex-row">
             <div>Total Cash Outflow</div>
              <div className='amount'>{userCashOutflow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
            </div>
          </div>
        </div>
      </div>
    </AdminModal>
  )
};

export default Dashboard