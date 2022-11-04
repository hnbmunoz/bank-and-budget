import React, { useState, useEffect } from "react";
import { LoginPage } from "../LoginPage";
import { PanelSections, PanelSectionHolder } from "../../components/panels";
import {
  NavigationContainer,
  NavigationItems,
} from "../../components/navigation";
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
import { LoadingPage } from "../LoadingPage";

export const MainPage = () => {
  const [verifiedAccount, setVerifiedAccount] = useState({
    verify: false,
    profileName: "",
    userCode: "",
  });
  const [displayIndex, setDisplayIndex] = useState(0);
  const [openNav, setOpenNav] = useState(true);

  const handleToggleNavbar = (e) => {
    setOpenNav(!openNav);
  };

  const handleUserLogin = (data) => {
    setVerifiedAccount({
      ...verifiedAccount,
      verify: true,
      profileName: `${data.userFullName}`,
      userCode: `${data.userCode}`,
    });
  };

  const handleUserLogout = () => {
    setVerifiedAccount({ ...verifiedAccount, verify: false });
  };

  const getTotalBalance = () => {};

  const handleSwitchPanel = (e) => {
    const btnClicked = e.currentTarget;
    const panelIndex = btnClicked.dataset.id;
    setDisplayIndex(panelIndex);
  };

  useEffect(() => {
    document.querySelector(".nav-widget").classList.toggle("close-widget");
    return () => {};
  }, [openNav]);

  return (
    <div>
      <NavigationContainer
        showNav={verifiedAccount.verify}
        navToggle={handleToggleNavbar}
        selectedPanel={displayIndex}
      >
        <NavigationItems
          itemName="Accounts"
          panelIdx={0}
          itemClick={handleSwitchPanel}
          navIcon={<NavIcons.AccountIcon />}
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
        <UserInterface
          displayPanel={displayIndex}
          displayFullName={verifiedAccount.profileName}
          getUserCode={verifiedAccount.userCode}
        />
      ) : (
        <LoginPage verifyAccount={handleUserLogin} />
      )}
    </div>
  );
};

export const UserInterface = ({
  displayPanel,
  displayFullName = "",
  getUserCode = "",
  displayIndex = "",
  
}) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {setShowLoading(false)},3000);
  
    return () => {
      
    }
  }, [])
  return (
    <div className="flex-column"> 
     {showLoading && <LoadingPage />}
      <Header displayFullName={displayFullName} />
      <PanelSectionHolder panelIdx={displayPanel}>
        <PanelSections>
          <Accounts getUserCode={getUserCode} displayPanel={displayPanel} />
        </PanelSections>
        <PanelSections>
          <Transactions getUserCode={getUserCode} displayPanel={displayPanel} />
        </PanelSections>
        <PanelSections>
          <Deposit getUserCode={getUserCode} />
        </PanelSections>
        <PanelSections>
          <Withdraw getUserCode={getUserCode} />
        </PanelSections>
        <PanelSections>
          <FundTransfer getUserCode={getUserCode} />
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
