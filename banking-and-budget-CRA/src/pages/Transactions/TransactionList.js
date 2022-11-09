import React from 'react';
import TransactionItem from './TransactionItem';

const TransactionList = ({filterDate, filterTransaction, displayTransaction}) => {
  // console.log(filterDate);

  if (filterDate.length === 0) {
   return <div>
            <h2 className="transaction_filter">{displayTransaction}</h2> 
                <div className="transaction__display">
                  <h2 className="expenses-list__fallback">Found no Transaction!</h2>
                </div>
          </div>
  };

  return (
    <div>
        <h2 className="transaction_filter">{displayTransaction}</h2>       
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