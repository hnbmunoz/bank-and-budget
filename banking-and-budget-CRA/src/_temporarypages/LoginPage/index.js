import React, { useState } from "react";
import { Input } from "../../components/input";

export const SignInForm = ({newUser, verifyUser}) => {
  return (
    <>
      <form>
        <Input email placeholderText="Enter Email" />
        <Input password placeholderText="Password" />
        <button onClick={verifyUser}> Login </button>
        <button onClick={newUser}> New User ? Sign Up </button>
      </form>
    </>
  );
};

export const SignUpForm = ({returnLogin}) => {
  return (
    <>
      <form>
        <Input  placeholderText="First Name" />
        <Input  placeholderText="Last Name" />
        <Input email placeholderText="Enter Email" />
        <Input password placeholderText="Password" />
        <button onClick={returnLogin}> Register </button>
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
    <div className="login">
      <div className="login-container">
        {!signUp ? <SignInForm newUser={handleSignUp} verifyUser={verifyAccount}/> : <SignUpForm returnLogin={handleSignIn}/>}    
      </div>
    </div>
  );
};
