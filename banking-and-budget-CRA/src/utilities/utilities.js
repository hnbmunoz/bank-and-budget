export const GetTransactionBalance = (userData = [], getUserCode) => {
 return userData
  .filter((data) => data.userCode === `${getUserCode}`)
  .reduce((total, transaction) => {
    return total + Number(transaction.amount);
  }, 0);
}