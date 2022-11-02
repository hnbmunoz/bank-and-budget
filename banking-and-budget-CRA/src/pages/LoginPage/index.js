import React, { useState, useEffect } from "react";
import { Input } from "../../components/input";
import Wallpaper from "../../assets/wallpapers/Login_wallpaper.png";
import {
  NeonButton,
  RoundedButton,
  GlowingButton,
} from "../../components/button";
import useLocaleStorage from "../../utilities/hooks/useLocalStorage";

import { v4 as uuidv4 } from "uuid"

export const SignInForm = ({newUser, verifyUser}) => {
  const handleLoginClick = (e) => {    
    const targetEl = e.currentTarget.parentElement.parentElement.children
    verifyUser(targetEl.divsignInMail.children.signInMail.value, targetEl.divsignInPW.children.signInPW.value)

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
        <Input name="signInMail" email placeholderText="Enter E-mail" />
        <Input name="signInPW" password placeholderText="Password" />
        <NeonButton displayText="Login" buttonClick={handleLoginClick} />
        <RoundedButton displayText="Register" buttonClick={newUser} />
      </form>
    </>
  );
};

export const SignUpForm = ({ returnLogin }) => {
  const [userStore, setUserStore, getUserStore] = useLocaleStorage(
    "registeredUsers",
    []
  );

  const handleSignUp = (e) => {
    e.preventDefault();
    let invalidFields = [...document.querySelectorAll(".validation")];
    if (invalidFields.length > 0) {
      alert("Please Fill Up Required Fields Properly");
    } else {
      const targetEl = e.currentTarget.parentElement.parentElement.children;
      let userObj = {
        userCode: uuidv4(),
        userFullName: `${targetEl.divsignUpFname.children.signUpFname.value} ${targetEl.divsignUpLname.children.signUpLname.value}`,
        userName: targetEl.divsignUpUname.children.signUpUname.value,
        userEmail: targetEl.divsignUpMail.children.signUpMail.value,
        userPassword: targetEl.divsignUpPW.children.signUpPW.value,
      };
      const newUser = [...userStore, userObj];
      setUserStore(newUser);
      alert("Sign Up Complete");
      returnLogin();
    }
  };
  return (
    <>
      <form className="flex-column">
        <Input name="signUpFname" placeholderText="First Name" />
        <Input name="signUpLname" placeholderText="Last Name" />
        <Input name="signUpUname" placeholderText="User Name" />
        <Input name="signUpMail" email placeholderText="Enter E-mail" />
        <Input name="signUpPW" password placeholderText="Password" />
        <GlowingButton displayText="Sign Up" buttonClick={handleSignUp} />
      </form>
    </>
  );
};

export const LoginPage = ({ verifyAccount }) => {
  const [signUp, setSignUp] = useState(false);
  const [userStore, setUserStore, getUserStore] = useLocaleStorage(
    "registeredUsers",
    []
  );

  useEffect(() => {
    getUserStore();
    return () => {};
  }, [signUp]);

  const returnToLoginPage = (e) => {
    setSignUp(false);
  };


  const filterUserAccount = (userName, passWord) => {  
    const filteredUser = userStore.find(obj => 
      obj.userEmail === userName && obj.userPassword === passWord
    )
    if (filteredUser) verifyAccount(filteredUser.userFullName);
  }


  const gotoSignUp = (e) => {
    setSignUp(true);
  };

  const handleSignUp = (e) => {
    setSignUp(false);
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
    </div>
  );
};
