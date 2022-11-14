export const GetTransactionBalance = (userData = [], getUserCode) => {  
 return userData
  .filter((data) => data.userCode === `${getUserCode}` )
  .reduce((total, transaction) => {
    return total + Number(transaction.amount);
  }, 0);
}

export const GetAccountBalance = (userData = []) => {  
  return userData.reduce((total, transaction) => {
     return total + Number(transaction.amount);
   }, 0);
 }

export const GetCashInflow = (userData = []) => {
  return userData
   .filter((data) => data.title === 'Deposit')
   .reduce((total, transaction) => {
     return total + Number(transaction.amount);
   }, 0);
 }

 export const GetCashOutflow = (userData = []) => { 
  const withdraw = userData
   .filter((data) => data.title === 'Withdraw')
   .reduce((total, transaction) => {
     return (total + Number(transaction.amount) * -1);
   }, 0);
  const transfer = userData
   .filter((data) => data.title === 'Transfer')
   .reduce((total, transaction) => {
     return (total + Number(transaction.amount) * -1);
   }, 0);

   return withdraw + transfer;
 }