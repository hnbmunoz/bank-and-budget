import React from 'react';
import TransactionItem from './TransactionItem';

const TransactionList = ({filterDate, filterTransaction, displayTransaction}) => {

  if (filterDate.length === 0) {
   return <div>
            <div className="transaction_filter">{displayTransaction}</div> 
                <div className="transaction__display">
                  <div className="expenses-list__fallback modal-details">Found no Transaction!</div>
                </div>
          </div>
  };

  return (
    <div>
        <div className="transaction_filter">{displayTransaction}</div>       
        <div className="transaction__display">      
          {(displayTransaction === 'All Transactions' ? filterDate : filterTransaction).map((transaction) =>
            <TransactionItem 
              title={transaction.title}
              amount={transaction.amount}
              description={transaction.description}
              key={transaction.id}
              date={transaction.date}
            />
          )}           
        </div>
    </div>
  )
};

export default TransactionList;