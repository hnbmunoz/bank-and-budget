import React, { useState } from "react";
import { LoginPage } from "../LoginPage";

export const MainPage = () => {
  const [verifiedAccount, setVerifiedAccount] = useState(false)

  const handleUserLogin = () => {
    setVerifiedAccount(true)
  }
  return (
    <div>
      {verifiedAccount ? <p>Components for Entire Page here</p> : <LoginPage verifyAccount={handleUserLogin}/>}
    </div>
  );
};
