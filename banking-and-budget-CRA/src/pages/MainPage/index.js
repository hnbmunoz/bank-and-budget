import React, { useState, useEffect } from "react";
import { LoginPage } from "../LoginPage";
import { PanelSections, PanelSectionHolder } from "../../components/panels";
import { NavigationContainer, NavigationItems } from "../../components/navigation";
import * as NavIcons from "../../components/navigation/navIcons";
import Header from "../../components/header";

import Dashboard from "../Dashboard";
import Deposit from "../Deposit";
import Withdraw from "../Withdraw";
import FundTransfer from "../FundTransfer";
import Accounts from "../Account";
import Messages from "../Messages";
import SwitchAccount from "../SwitchAccount";
import Transactions from "../Transactions";

export const MainPage = () => {
  const [verifiedAccount, setVerifiedAccount] = useState({verify: false, profileName: ""});
  const [displayIndex, setDisplayIndex] = useState(0);
  const [openNav, setOpenNav] = useState(true);

  const handleToggleNavbar = (e) => {
    setOpenNav(!openNav)
  }

  const handleUserLogin = (data) => {
    setVerifiedAccount({...verifiedAccount, verify: true, profileName: `${data}`});
  };

  const handleUserLogout = () => {
    setVerifiedAccount({...verifiedAccount, verify: false});
  };

  const handleSwitchPanel = (e) => {    
    const btnClicked = e.currentTarget;
    const panelIndex = btnClicked.dataset.id;    
    setDisplayIndex(panelIndex);
  };
  
  useEffect(() => {
    document.querySelector('.nav-widget').classList.toggle('close-widget')
    return () => {}
  }, [openNav])
  
  return (
    <div>
       <NavigationContainer showNav={verifiedAccount.verify} navToggle={handleToggleNavbar} selectedPanel={displayIndex}>
          <NavigationItems
            itemName="Accounts"
            panelIdx={0}
            itemClick={handleSwitchPanel}
            navIcon={<NavIcons.AccountIcon/>}
            navOpen={openNav}
          />
          <NavigationItems
            itemName="Transactions"
            panelIdx={1}
            itemClick={handleSwitchPanel}
            navIcon={<NavIcons.TransactionIcon />}
            navOpen={openNav}
          />
          <NavigationItems
            itemName="Deposit"
            panelIdx={2}
            itemClick={handleSwitchPanel}
            navIcon={<NavIcons.DepositIcon />}
            navOpen={openNav}
          />
          <NavigationItems
            itemName="Withdraw"
            panelIdx={3}
            itemClick={handleSwitchPanel}
            navIcon={<NavIcons.WithdrawIcons />}
            navOpen={openNav}
          />
          <NavigationItems
            itemName="Transfer"
            panelIdx={4}
            itemClick={handleSwitchPanel}
            navIcon={<NavIcons.FundTransferIcon />}
            navOpen={openNav}
          />
          <NavigationItems
            itemName="Messages"
            panelIdx={5}
            itemClick={handleSwitchPanel}
            navIcon={<NavIcons.MessagesIcon />}
            navOpen={openNav}
          />
          <NavigationItems
            itemName="SwitchAccount"
            panelIdx={6}
            itemClick={handleSwitchPanel}
            navIcon={<NavIcons.SwitchAccountIcon />}
            navOpen={openNav}
            />            
          <NavigationItems
            itemName="Log Out"
            itemClick={handleUserLogout}
            navIcon={<NavIcons.LogOutIcons />}
            navOpen={openNav}
          />
        </NavigationContainer> 

      {verifiedAccount.verify ? (
        <UserInterface displayPanel={displayIndex} displayFullName={verifiedAccount.profileName}/>
      ) : (
        <LoginPage verifyAccount={handleUserLogin} />
      )}
    </div>
  );
};

export const UserInterface = ({displayPanel, displayFullName}) => {  
  return (    
  <div className="flex-column">
    <Header displayFullName={displayFullName}/>
    <PanelSectionHolder panelIdx={displayPanel}>      
      <PanelSections>
        <Accounts />
      </PanelSections>
      <PanelSections>
        <Transactions />
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
      <PanelSections>
        <Messages />
      </PanelSections>
      <PanelSections>
        <SwitchAccount />
      </PanelSections>
    </PanelSectionHolder> 
  </div>
    
  );
};
