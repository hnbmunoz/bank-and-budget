import React, { useState, useEffect } from "react";
import { Input } from "../../components/input";
import Wallpaper from "../../assets/wallpapers/Login_wallpaper.png";
import { NeonButton, RoundedButton, GlowingButton } from "../../components/button";
import useLocaleStorage from "../../utilities/hooks/useLocalStorage";
import { LoadingPage } from "../LoadingPage";

import { WarningPopup, SuccessPopup } from "../../components/modal";


import { v4 as uuidv4 } from "uuid"

export const SignInForm = ({newUser, verifyUser}) => {
  const [modalOpen, setModalOpen] = useState(false); 
  const handleLoginClick = (e) => {    
    const targetEl = e.currentTarget.parentElement.parentElement.children
    verifyUser(targetEl.divsignInAcct.children.signInAcct.value, targetEl.divsignInPW.children.signInPW.value)
    setModalOpen(true);
    e.preventDefault();
  };

  const handleRegisterClick = () => {
    setTimeout(() => {
      newUser();
    }, 500);
  };

  return (
    <>
      <form className="flex-column">
        <Input name="signInAcct" placeholderText="Username or E-mail" />
        <Input name="signInPW" password placeholderText="Password" />
        <NeonButton displayText="Login" buttonClick={handleLoginClick}/>
        <RoundedButton displayText="Register" buttonClick={newUser} />
      </form>
    </>
  );
};

export const SignUpForm = ({ returnLogin }) => {
  const [modalInvalidUsernameEmail, setModaIInvalidUsernameEmail] = useState(false);
  const [modalInvalidFields, setModalInvalidFields] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false); 
  const [userStore, setUserStore, getUserStore] = useLocaleStorage(
    "registeredUsers",
    []
  );

  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {setShowLoading(false)},3000);
  })
  const handleClosePopUp = (e) => {
    setModalInvalidFields(false);
    setModaIInvalidUsernameEmail(false)
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    const targetEl = e.currentTarget.parentElement.parentElement.children;
    let userObj = {
      userCode: uuidv4(),
      userFullName: `${targetEl.divsignUpFname.children.signUpFname.value} ${targetEl.divsignUpLname.children.signUpLname.value}`,
      userName: targetEl.divsignUpUname.children.signUpUname.value,
      userEmail: targetEl.divsignUpMail.children.signUpMail.value,
      userPassword: targetEl.divsignUpPW.children.signUpPW.value,
    };
    let invalidFields = [...document.querySelectorAll(".validation")];
    const filteredUser = userStore.find(obj => 
      (obj.userEmail === userObj.userEmail || obj.userName === userObj.userName)
      )
      if ((invalidFields.length > 0) && (filteredUser === undefined)) {
        setModalInvalidFields(true);
      } else if (filteredUser !== undefined) {
        setModaIInvalidUsernameEmail(true);
      } else {
        const newUser = [...userStore, userObj];
        setUserStore(newUser);
        setModalSuccess(true);
        setTimeout(returnLogin, 2000);
      }
  };
  
  return (
    <>
      <form className="flex-column">
      {showLoading && <LoadingPage />}
        <Input name="signUpFname" placeholderText="First Name" />
        <Input name="signUpLname" placeholderText="Last Name" />
        <Input name="signUpUname" placeholderText="User Name" />
        <Input name="signUpMail" email placeholderText="Enter E-mail" />
        <Input name="signUpPW" password placeholderText="Password" />
        <GlowingButton displayText="Sign Up" buttonClick={handleSignUp} />
        {modalInvalidFields && <WarningPopup closeModal={handleClosePopUp} message="Please Fill Up Required Fields Properly!"/>}
        {modalInvalidUsernameEmail && <WarningPopup closeModal={handleClosePopUp} message="Username or Email is already existing"/>}
        {modalSuccess && <SuccessPopup message="Sign Up Complete! Please Wait"/>} 
      </form>
     
    </>
  );
};

export const LoginPage = ({ verifyAccount }) => {
  const [modalInvalidUsernameEmail, setModaIInvalidUsernameEmail] = useState(false);
  const [signUp, setSignUp,] = useState(false);
  const [userStore, setUserStore, getUserStore] = useLocaleStorage( "registeredUsers",[]);
  const [modalInvalidFields, setModalInvalidFields] = useState(false);

  useEffect(() => {
    getUserStore();
    return () => {};
  }, [signUp]);

  const returnToLoginPage = (e) => {
    setSignUp(false);
  };


  const filterUserAccount = (userName, passWord) => {
    const filteredUser = userStore.find(obj => 
      (obj.userEmail === userName || obj.userName === userName) && obj.userPassword === passWord
    )
    let invalidFields = [...document.querySelectorAll(".validation")];
    if (filteredUser) {
      verifyAccount(filteredUser)
    } else if (invalidFields.length > 0) {
      setModalInvalidFields(true)
    } else {
     setModaIInvalidUsernameEmail(true)
    };
  }


  const gotoSignUp = (e) => {
    setSignUp(true);
  };

  const handleClosePopUp = (e) => {
    setModalInvalidFields(false);
    setModaIInvalidUsernameEmail(false);

  };
  const handleSignIn = (e) => {};
  return (
    <div className="login" style={{ backgroundImage: `url(${Wallpaper})` }}>
      <div className="login-container">
        {!signUp ? (
          <SignInForm newUser={gotoSignUp} verifyUser={filterUserAccount} />
        ) : (
          <SignUpForm returnLogin={returnToLoginPage} />
        )}
      </div>
      {modalInvalidUsernameEmail && <WarningPopup closeModal={handleClosePopUp} message="Username or Email does not exist. Please click 'Register' to create 'New Account'"/>}
      {modalInvalidFields && <WarningPopup closeModal={handleClosePopUp} message="Please Fill Up Required Fields Properly!"/>}
    </div>
  );
};
