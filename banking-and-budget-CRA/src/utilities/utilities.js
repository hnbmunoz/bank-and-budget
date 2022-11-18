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

// export const GetCashInflow = (userData = []) => {
//   return userData
//    .filter((data) => data.title === 'Deposit')
//    .reduce((total, transaction) => {
//      return total + Number(transaction.amount);
//    }, 0);
//  }

 export const GetCashOutflow = (userData = []) => { 
  const withdraw = userData
   .filter((data) => data.title === 'Withdraw' && data.flow === 'Out')
   .reduce((total, transaction) => {
     return (total + Number(transaction.amount) * -1);
   }, 0);
  const transfer = userData
   .filter((data) => data.title === 'Transfer' && data.flow === 'Out') 
   .reduce((total, transaction) => {
     return (total + Number(transaction.amount) * -1);
   }, 0);
   
   return withdraw + transfer;
 }

 export const GetCashInflow = (userData = []) => {
  const deposit = userData
   .filter((data) => data.title === 'Deposit')
   .reduce((total, transaction) => {
     return (total + Number(transaction.amount));
   }, 0);
  const transfer = userData
   .filter((data) => data.title === 'Transfer' && data.flow === 'In')
   .reduce((total, transaction) => {
     return (total + Number(transaction.amount));
   }, 0);
   return deposit + transfer;
 }

 export const GetAccountExpenses = (userData = []) => {  
  return userData.reduce((total, expenses) => {
     return total + Number(expenses.amount);
   }, 0);
 }

export const findUserbyAccount = (storedData = [], accountNumber = "") => {
  let data =  storedData.find(userAcct => userAcct.accountNumber == accountNumber).accountUser

  return data
}