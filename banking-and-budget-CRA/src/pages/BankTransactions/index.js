import React, {useState, useRef, useEffect} from 'react'
import { RoundedButton } from '../../components/button';
import { Input } from '../../components/input';
import { CustomDropDown } from '../../components/input/DropDown';
import useLocalStorageStore from '../../utilities/hooks/useLocalStorage';
import { GetTransactionBalance, GetAccountBalance } from '../../utilities/utilities';

const BankTransactions = ({ getUserCode, transactionType = "", handleTransaction, displayPanel = 0 }) => {  
  const [userStore, setUserStore, getUserStore] = useLocalStorageStore("registeredUsers",[]);
  const [userTransactions, setUserTransaction, getUserTransactions] = useLocalStorageStore("userTransaction", []);
  const [userAccount, setUserAccount, getUserAccount] = useLocalStorageStore('userAccounts',[]);

  const inputAmount = useRef();
  const inputDescription = useRef();
  const userAccountDrop = useRef();
  
  const [userName, setUserName] = useState({});
  const [userBalance, setUserBalance] = useState(0);
  const [selectedAcct, setSelectedAcct] = useState("");

  useEffect(() => {
    getUserTransactions();
    setUserBalance(0)
    return () => {};
  }, [displayPanel]);

  useEffect(() => {
    userStore.length > 0 && getAccountBalance();
    return () => {};
  }, [userTransactions]);

  const getAccountBalance = (accountNumber = "") => {   
      
    const acctNum = accountNumber
    const userData = userTransactions.filter(
      (user) => user.userCode === `${getUserCode}` && user.accountNumber === `${acctNum}`
    );
    const totalBalance = GetAccountBalance(userData)

    acctNum.trim() === "" ?setUserBalance(0) :setUserBalance(totalBalance);
    setSelectedAcct(acctNum)
  };

  const getTransactionData =  (e) => {            
    const targetEl = e.currentTarget.parentElement.parentElement.parentElement.children;    
    const transactionAmount = targetEl.divtransactionAmount.children.transactionAmount.value;
    const transactionDesc = targetEl.divtransactionDesc.children.transactionDesc.value;
    const transactionAcct = selectedAcct;
    handleTransaction(transactionAmount, transactionDesc, transactionAcct);
    getUserTransactions();
    getAccountBalance();
    clearTransaction();
  }

  const clearTransaction = () => {
    inputAmount.current.clearValue();
    inputDescription.current.clearValue();
  }
  return (  
    <div className='flex-column'>
      <div className="bankTrans-header">
        {`${transactionType}`} Form 
      </div>
      <div className="bankTrans-details"> 
        Bank Account Balance : {userBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </div>    
      <CustomDropDown 
          name="adminCurrAccDrop"
          title="Current Accounts :"
          dataStore={userAccount}
          filterField="accountUser"
          selectedClient={getUserCode}
          getAccountBalance={getAccountBalance}
        />
      <Input ref={inputAmount} name="transactionAmount" placeholderText='Amount' number  />
      <Input ref={inputDescription} name="transactionDesc" placeholderText='Description'  /> 
      <div className="flex-row" style={{alignItems: "center", justifyContent: "space-evenly"}}>
        <RoundedButton displayText='Cancel' type="button" buttonClick={clearTransaction}/>      
        <RoundedButton displayText={`${transactionType}`} type="submit" buttonClick={getTransactionData} />                       
      </div>
    </div>
  )
}

export default BankTransactions