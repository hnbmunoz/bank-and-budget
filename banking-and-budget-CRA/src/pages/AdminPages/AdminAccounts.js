import React,{ useEffect, useState } from 'react';
import useLocalStorageStore from '../../utilities/hooks/useLocalStorage';
import { GetTransactionBalance } from "../../utilities/utilities";
import { GlowingButton } from '../../components/button';
import { DefaultPopUp } from '../../components/modal';
import { CustomDropDown } from '../../components/input/DropDown'
import Modal from '../../components/modal';


const AdminAccounts = ({ getUserCode = "" }) => {
  const [ userInput, setUserInput ] = useState("");
  const [ searchResult, setSearchResult ] = useState({ result: ""});
  const [ userBalance, setUserBalance ] = useState(0);
  // const [modalclose, setModalOpen] = useState(false);
  const [newAcctModal, setNewAcctModal] = useState(false);



  const [ userStore, setUserStore, getUserStore ] = useLocalStorageStore(
    "registeredUsers",
    []
  );
  const [userTransactions, setUserTransaction, getUserTransactions] = useLocalStorageStore(
    "userTransaction", 
    []
  );

  useEffect(() => {
    handleSearch()
  }, [getUserCode]);

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

  // const handleClosePopUp = (e) => {
  //   setModalOpen(false);
  // }

  const toggleNewAcct = () => {
    setNewAcctModal(!newAcctModal)
  }
  return (
    <div> 
      {/* <div className='flex-column'>
        {typeof searchResult.result === "No result found" && <div>{searchResult.result}</div>}
        {typeof searchResult.result === "object" &&
          <>
            <div className='user-account-header'>{searchResult.result.userFullName}'s Account Details</div>
            <div className='user-account-details'>Full Name :<p className='details'>{searchResult.result.userFullName}</p></div>
            <div className='user-account-details'>Email :<p className='details'>{searchResult.result.userEmail}</p></div>
            <div className='user-account-details'>Username :<p className='details'>{searchResult.result.userName}</p></div>
            <div className='user-account-details'><p className='details'>Card Details</p></div>
            <div className='balance-container'></div>
            <div className='user-account-balance'>
              <div>Available Balance</div>
                <div className='user-account-amount'>
                PHP {userBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
            </div>
            <div className='flex-row' style={{justifyContent: "center", marginTop: "1rem"}}>
              <GlowingButton displayText="Create Account" buttonClick={setModalOpen} />
            </div>
            {modalclose && <AdminModal closeModal={handleClosePopUp}/>}
          </>
        }
      </div> */}
      <Modal>
        {newAcctModal && <CreateUserAcctNumber closeModal={toggleNewAcct}/>}
        <div className='user-account-header'>{searchResult.result.userFullName} Account Details</div>
        <div className='user-account-details'>Full Name :<p className='details'>{searchResult.result.userFullName}</p></div>
        <div className='user-account-details'>Email :<p className='details'>{searchResult.result.userEmail}</p></div>
        <div className='user-account-details'>Username :<p className='details'>{searchResult.result.userName}</p></div>
        {/* <div className='user-account-details'><p className='details'>Account Number</p></div> */}
        <CustomDropDown name="adminCurrAccDrop" title="Current Accounts :"/>
        <div className='user-account-details'>Account Type :<p className='details'></p></div>
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

export const CreateUserAcctNumber = ({closeModal}) => {
  const [cardNumber, setCardNumber] = useState("")

  const getRandomNumber = () => {
        let min = 4000000000000000;
        let max = 4999999999999999;
        setCardNumber(Math.round(Math.random() * (max - min) + min))
    } 
  return (
   <DefaultPopUp closeModal={closeModal}>
      <CustomDropDown name="newAcctType" title="Account Type :" dataStore={['Galaxy', 'Klarna', 'Sparksse']}/>
      <div>Card Number : {cardNumber}</div>
      <div>Valid Thru : 12/29</div>
      <div>CVC : 413</div>
      <button onClick={() => getRandomNumber()}>Show Card Info</button>

   </DefaultPopUp>
  ) 
}

export default AdminAccounts

