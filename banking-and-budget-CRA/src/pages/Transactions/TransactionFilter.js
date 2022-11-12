import React from 'react';
import { GlowingButton } from "../../components/button";
const TransactionFilter = ({onTransaction, onDate, currentDate}) => {
  const changeTransactionHandler = (e)=>{
   onTransaction(e.target.value)
  };
  const changeDateHandler = (e)=>{
  const date = new Date(e.target.value)
   onDate(date);
  };
  return (
    <div className="transaction-filter">
      <div className="transaction-filter__control">
        <div className="transaction-filter__date">
            <div className='modal-details'>Select Date</div>  
            <input type="date" onChange={changeDateHandler} value={currentDate}/>
        </div>       

        <div className="transaction-filter__transactions">
            <div className="transaction-btn">
              <GlowingButton value="All Transactions" buttonClick={changeTransactionHandler} displayText="All Transactions"/> 
              <GlowingButton value="Deposit"  displayText='Deposit' buttonClick={changeTransactionHandler}/>
              <GlowingButton value="Withdraw" displayText='Withdraw' buttonClick={changeTransactionHandler}/>
              <GlowingButton value="Transfer" displayText='Transfer' buttonClick=
              {changeTransactionHandler}/>   
            </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionFilter