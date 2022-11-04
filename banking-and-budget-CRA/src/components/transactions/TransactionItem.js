import React from 'react';

const TransactionItem = ({title,amount,description,destination}) => {
  return (
        <div>    
          <h3>{title}</h3>
          <p>{amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
          <p>{description}</p>
        </div>
  )
};

export default TransactionItem;