import React, { useState } from "react";
import { Input } from "../../components/input";
import Wallpaper from "../../assets/wallpapers/Login_wallpaper.png"
import { NeonButton, RoundedButton, GlowingButton } from "../../components/button";

export const SignInForm = ({newUser, verifyUser}) => {
  const handleLoginClick = () => {
    setTimeout(() => {verifyUser()},500)
  }

  const handleRegisterClick = () => {
    setTimeout(() => {newUser()},500)
  }

  return (
    <>
      <form className="flex-column">
        <Input name="signInMail" email placeholderText="Enter E-mail" />
        <Input name="signInPW" password placeholderText="Password" />
        <NeonButton displayText="Login" buttonClick={verifyUser}/>
        <RoundedButton displayText="Register" buttonClick={newUser}/>
      </form>
    </>
  );
};

export const SignUpForm = ({returnLogin}) => {
  return (
    <>
      <form className="flex-column">
        <Input name="signUpFname"  placeholderText="First Name" />
        <Input name="signUpLname" placeholderText="Last Name" />
        <Input name="signUpMail"email placeholderText="Enter E-mail" />
        <Input name="signUpPW" password placeholderText="Password" />
        <GlowingButton displayText="Sign Up" buttonClick={returnLogin}/>
      </form>
    </>
  );
};

export const LoginPage = ({verifyAccount}) => {
  const [signUp, setSignUp] = useState(false)
  const handleSignUp = () => {
    setSignUp(true)
  }
  const handleSignIn = (e) => {
    setSignUp(false)
  }
  return (
    <div className="login" style={{backgroundImage: `url(${Wallpaper})`}}>
      <div className="login-container">
        {!signUp ? <SignInForm newUser={handleSignUp} verifyUser={verifyAccount}/> : <SignUpForm returnLogin={handleSignIn}/>}    
      </div>
    </div>
  );
};
