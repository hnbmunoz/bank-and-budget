import React,{ useEffect, useState, useRef } from 'react';
import useLocalStorageStore from '../../utilities/hooks/useLocalStorage';
import { GetAccountBalance, GetTransactionBalance } from "../../utilities/utilities";
import { GlowingButton, RoundedButton } from '../../components/button';
import { DefaultPopUp } from '../../components/modal';
import { CustomDropDown, StaticDropDown } from '../../components/input/DropDown';
import Modal from '../../components/modal';
import { v4 as uuidv4 } from "uuid";
import { IoMdClipboard } from "react-icons/io";



const AdminAccounts = ({ getUserCode = "", displayPanel = 0 }) => {
  const [ searchResult, setSearchResult ] = useState({ result: ""});
  const [ userBalance, setUserBalance ] = useState(0);
  const [newAcctModal, setNewAcctModal] = useState(false);
  const [currentAccounts, setCurrentAccounts] = useState([]);
  const [selectedAcct, setSelectedAcct] = useState("");

  const [userStore, setUserStore, getUserStore ] = useLocalStorageStore("registeredUsers",[]);
  const [userTransactions, setUserTransaction, getUserTransactions] = useLocalStorageStore("userTransaction", []);
  const [userAccount, setUserAccount, getUserAccount] = useLocalStorageStore('userAccounts',[]);

  const inputDrop = useRef();

  useEffect(() => {
    getUserTransactions();
    getUserStore();
    inputDrop.current.clearValue();
    setSelectedAcct("")
    handleSearch();
    getAccounts();
    
  }, [getUserCode, displayPanel]);

  useEffect(() => {
    handleSearch();  
    return () => { }
  }, [userStore])
  

  const getAccounts = () => {
    const userData = userTransactions.filter(
      (user) => user.userCode === getUserCode
    );

    const currAccounts = userAccount.filter((acct) => acct.accountUser === getUserCode)
    setCurrentAccounts(currAccounts);
  }

  const getTransactions = () => {
    const userData = userTransactions.filter(
      (user) => user.userCode === getUserCode
    );

    const totalBalance = GetTransactionBalance(userData, getUserCode)
    setUserBalance(prevBalance => prevBalance += totalBalance);
  };

  const handleSearch = () => {    
    setUserBalance(0);
    
    const filteredUser = userStore.find( obj => (
      obj.userCode === getUserCode
    ))
        if (filteredUser) {
          setSearchResult({
            result: filteredUser
          });
          getTransactions()
        } else if (filteredUser === undefined) {
          setSearchResult({
            result: "No result found"
          })
          setUserBalance(0);
    };
  }

  const toggleNewAcct = () => {
    setNewAcctModal(!newAcctModal)
  }

  const getAccountBalance = (acctNumber) => {       
    setSelectedAcct(acctNumber);

    const userData = userTransactions.filter(
      (user) => user.userCode === getUserCode && user.accountNumber === acctNumber
    );

    const totalBalance = GetAccountBalance(userData)
    setUserBalance(totalBalance);
  }
  
  const refreshStorage = () => {
    getUserTransactions();
    getUserAccount();   
  }

  const copyClipboard = () => {
    navigator.clipboard.writeText(selectedAcct)
    alert('copied to clipboard')
  }
  return (
    <div> 
      <Modal>
        {newAcctModal && <CreateUserAcctNumber closeModal={toggleNewAcct} userCode={getUserCode}/>}
        <div className='user-account-header'>{searchResult.result.userFullName} Account Details</div>
        <div className='user-account-details'>Full Name :<p className='details'>{searchResult.result.userFullName}</p></div>
        <div className='user-account-details'>Email :<p className='details'>{searchResult.result.userEmail}</p></div>
        <div className='user-account-details'>Username :<p className='details'>{searchResult.result.userName}</p></div>
        <div className='user-account-details'>
          Account Number :<p className='details'>{selectedAcct}</p>
          <IoMdClipboard fontSize="1rem" onClick={copyClipboard}/>
        </div>
        <CustomDropDown 
          ref={inputDrop}
          name="adminCurrAccDrop"
          title="Current Accounts"
          dataStore={userAccount}
          filterField="accountUser"
          selectedClient={getUserCode}
          getAccountBalance={getAccountBalance}
          refreshStorage={refreshStorage}
        />
        <div className='balance-container'></div>
        <div className='user-account-balance'>
          <div>Available Balance</div>
            <div className='user-account-amount'>
              PHP {userBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
          </div>
       
        <div className='flex-row' style={{justifyContent: "center", marginTop: "1rem"}}>
          <GlowingButton displayText="Open Account" buttonClick={toggleNewAcct} />
        </div>
       
      </Modal>
    </div>
  )
}

export const CreateUserAcctNumber = ({closeModal, userCode}) => {
  const [cardNumber, setCardNumber] = useState("")
  const [cvcNumber, setCVCNumber] = useState("")
  const [userAccount, setUserAccount, getUserAccount] = useLocalStorageStore('userAccounts',[])

  useEffect(() => {
    getRandomNumber();
  },[])

  const getRandomNumber = () => {
    let min = 4000000000000000;
    let max = 4999999999999999;
    setCardNumber(Math.round(Math.random() * (max - min) + min))
    setCVCNumber(Math.round(Math.random() * (999 - 100) + 100))
  }
  
  const createNewAccount = (e) => {    
    let accountObj = {
      accountCode: uuidv4(),
      accountUser: userCode,
      accountNumber: cardNumber,
      accountExpiry: '12/29',
      accountType: e.currentTarget.parentElement.parentElement.parentElement.children[1].children[1].children[0].value,
      accountCVC: cvcNumber
    };

    const newAccount = [...userAccount, accountObj];
    setUserAccount(newAccount);
    alert('Account Created')
    closeModal();
  }


  return (
   <DefaultPopUp closeModal={closeModal}>
      <StaticDropDown name="newAcctType" title="Account Type :" staticStore={['Galaxy', 'Klarna', 'Sparksse']}/>
      <div className='modal-details'>Card Number : {cardNumber}</div>
      <div className='modal-details'>Valid Thru : 12/29</div>
      <div className='modal-details'>CVC : {cvcNumber}</div>
      <div className='flex-row' style={{justifyContent: "center", marginTop: "1rem"}}>
        <GlowingButton displayText='Create Account ' buttonClick={createNewAccount}/>
      </div>

   </DefaultPopUp>
  ) 
}

export default AdminAccounts

