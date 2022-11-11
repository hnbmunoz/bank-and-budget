import React from 'react';

const TransactionItem = ({title, amount, description, date}) => {
  const newAmount = Math.sign(amount) === -1 ? amount * -1 : amount;
 const newDate = new Date(date);
 const month = newDate.toLocaleString("en-US", {
  month: "long",
});
const day = newDate.toLocaleString("en-US", {
  day: "2-digit",
});
const year = newDate.getFullYear();

  return (
        <div className="transaction-item">
          <div className="transaction-item__date">
            <div className="transaction-date__month">{month}</div>
            <div className="transaction-date__day">{day}</div>
            <div className="transaction-date__year">{year}</div>
          </div>
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