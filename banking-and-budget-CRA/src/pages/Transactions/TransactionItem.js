import React from 'react';

const TransactionItem = ({title, amount, description, date}) => {
  const newAmount = Math.sign(amount) === -1 ? amount * -1 : amount;
  // console.log(date);
 
  return (
        <div className="transaction-item">
          <div className="transaction-item__date">{date}</div>
          <div className="transaction-item__info"> 
              {/* For discussion */}
              <h4 className='transaction-item__title'>{title}</h4>  
              <h4 className='transaction-item__description'>{description}</h4>
              <div className='transaction-item__amount'>
                PHP {newAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>              
          </div>
         
        </div>
  )
};

export default TransactionItem;