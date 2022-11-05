import React from 'react';
import { GlowingButton } from "../../components/button";
const TransactionFilter = ({onTransaction, onDate}) => {
  const changeTransactionHandler = (e)=>{
   onTransaction(e.target.value)
  }

  const changeDateHandler = (e)=>{
   onDate(e.target.value); 
  }
  return (
    <div className="transaction-filter">
      <div className="transaction-filter__control">

        <div className="transaction-filter__date">
            <h3>Select Date</h3>  
            <input type="date" onChange={changeDateHandler}/>
        </div>       

        <div className="transaction-filter__transactions">
            <h3>Filter by Transaction</h3>  
            <GlowingButton value="All Transactions" buttonClick={changeTransactionHandler} displayText="All Transactions" width='5px'/> 
            <GlowingButton value="Deposit"  displayText='Deposit' buttonClick={changeTransactionHandler}/>
            <GlowingButton value="Withdraw" displayText='Withdraw' buttonClick={changeTransactionHandler}/>
            <GlowingButton value="Transfer" displayText='Transfer' buttonClick=
            {changeTransactionHandler}/>   
        </div>
      </div>
    </div>
  )
}

export default TransactionFilter