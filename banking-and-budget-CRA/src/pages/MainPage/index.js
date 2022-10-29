import React, { useState } from "react";
import { LoginPage } from "../LoginPage";
import { PanelSections, PanelSectionHolder } from "../../components/panels";
import { NavigationContainer, NavigationItems } from "../../components/navigation";
import Header from "../../components/header";

import Dashboard from "../Dashboard";
import Deposit from "../Deposit";
import Withdraw from "../Withdraw";
import FundTransfer from "../FundTransfer";

export const MainPage = () => {
  const [verifiedAccount, setVerifiedAccount] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);

  const handleUserLogin = () => {
    setVerifiedAccount(true);
  };

  const handleUserLogout = () => {
    setVerifiedAccount(false);
  };

  const handleSwitchPanel = (e) => {
    const btnClicked = e.target;
    const panelIndex = btnClicked.dataset.id;
    setDisplayIndex(panelIndex);
  };

  return (
    <div>
       <NavigationContainer showNav={verifiedAccount}>
          <NavigationItems itemName="Dashboard" panelIdx={0} itemClick={handleSwitchPanel}/>
          <NavigationItems itemName="Deposit" panelIdx={1} itemClick={handleSwitchPanel}/>
          <NavigationItems itemName="Withdraw" panelIdx={2} itemClick={handleSwitchPanel}/>
          <NavigationItems itemName="Fund Transfer" panelIdx={3} itemClick={handleSwitchPanel}/>
          <NavigationItems itemName="Log Out" itemClick={handleUserLogout}/>
        </NavigationContainer> 

      {verifiedAccount ? (
        <UserInterface displayPanel={displayIndex}/>
      ) : (
        <LoginPage verifyAccount={handleUserLogin} />
      )}
    </div>
  );
};

export const UserInterface = ({displayPanel}) => {  
  return (    
  <div className="flex-column">
    <Header />
    <PanelSectionHolder panelIdx={displayPanel}>      
      <PanelSections>
        <Dashboard />
      </PanelSections>
      <PanelSections>
        <Deposit />
      </PanelSections>
      <PanelSections>
        <Withdraw />
      </PanelSections>
      <PanelSections>
        <FundTransfer />
      </PanelSections>
    </PanelSectionHolder>
  </div>
    
  );
};
