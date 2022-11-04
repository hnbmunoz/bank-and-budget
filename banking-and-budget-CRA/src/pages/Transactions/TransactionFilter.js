import React from 'react';
import { GlowingButton } from "../../components/button";
const TransactionFilter = ({onFilter}) => {
  const changeTransactionFilter = (e)=>{
   onFilter(e.target.value)
   console.log(e.target.value);
  }
  return (
    <div className="transaction-filter">
      <div className="transaction-filter__control">
          <label>Filter by Transaction</label>  
          <GlowingButton value="All Transactions" buttonClick={changeTransactionFilter} displayText="All Transactions"/> 
          <GlowingButton value="Deposit"  displayText='Deposit' buttonClick={changeTransactionFilter}/>
          <GlowingButton value="Withdraw" displayText='Withdraw' buttonClick={changeTransactionFilter}/>
          <GlowingButton value="Transfer" displayText='Transfer' buttonClick={changeTransactionFilter}/>   
      </div>
    </div>
  )
}

export default TransactionFilter