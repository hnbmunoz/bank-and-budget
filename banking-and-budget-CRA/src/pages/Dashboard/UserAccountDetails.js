import React from 'react'
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import { useState, useEffect } from "react";

const UserAccountDetails = ({getUserCode}) => {
  const [userStore, setUserStore, getUserStore] = useLocalStorageStore(
    "registeredUsers",
    []
  );
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userFullName, setUserFullName] = useState("");

  useEffect(() => {
    getUserDetails()
  })

  const getUserDetails = () => {
    const userData = userStore.filter((user) => user.userCode === `${getUserCode}`).map((user) => {
      setUserName(user.userName)
      setUserFullName(user.userFullName)
      setUserEmail(user.userEmail)
    })
  }
  




  return (
    <div  className="user-account-detail">
      <div className='user-account-header'>Account Details</div>
        <div className='user-account-details'>Full Name : <p className="details">{userFullName}</p></div>
        <div className='user-account-details'>Email : <p className="details">{userEmail}</p></div>
        <div className='user-account-details'>Username : <p className="details">{userName}</p></div>
    </div>
  )
}

export default UserAccountDetails