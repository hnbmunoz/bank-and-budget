import React, { useState, useEffect } from "react";
import { LoginPage } from "../LoginPage";
import { PanelSections, PanelSectionHolder } from "../../components/panels";
import {
  NavigationContainer,
  NavigationItems,
} from "../../components/navigation";
import * as NavIcons from "../../components/navigation/navIcons";
import Header from "../../components/header";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import { SearchInput } from "../../components/input";
import Deposit from "../Deposit";
import Withdraw from "../Withdraw";
import FundTransfer from "../FundTransfer";
import Accounts from "../Account";
import Messages from "../Messages";
import SwitchAccount from "../SwitchAccount";
import Transactions from "../Transactions";
import { LoadingPage } from "../LoadingPage";
import AdminPage from "../AdminPages";
import BankTransactions from "../BankTransactions";
import DepositTransaction from "../BankTransactions/DepositTransaction";
import WithdrawTransaction from "../BankTransactions/WithdrawTransaction";
import Dashboard from '../Dashboard';
export const MainPage = () => {
  const [verifiedAccount, setVerifiedAccount] = useState({
    verify: false,
    profileName: "",
    userCode: "",
    userType: ""
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
      userType: `${data.userType}`
    });
  };

  const handleUserLogout = () => {
    setDisplayIndex(0);
    setVerifiedAccount({ ...verifiedAccount, verify: false });
  };

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
          itemName={verifiedAccount.userType === "user"? "Dashboard" : "Client Account"}
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
          itemName={verifiedAccount.userType === "user"? "My Accounts" : "New Account"}
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
        verifiedAccount.userType === "user" ?
        <UserInterface
          displayPanel={displayIndex}
          displayFullName={verifiedAccount.profileName}
          getUserCode={verifiedAccount.userCode}
        /> :
        <AdminInterface
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
      <Header displayFullName={displayFullName}></Header> 
      <PanelSectionHolder panelIdx={displayPanel}>
        <PanelSections>
          <Dashboard getUserCode={getUserCode} displayPanel={displayPanel}/>
        </PanelSections>
        <PanelSections>
          <Transactions getUserCode={getUserCode} displayPanel={displayPanel} />
        </PanelSections>
        <PanelSections>
          {/* <BankTransactions getUserCode={getUserCode} /> */}
          {/* <Deposit getUserCode={getUserCode} /> */}
          <DepositTransaction getUserCode={getUserCode} displayPanel={displayPanel}/>
        </PanelSections>
        <PanelSections>
          {/* <Withdraw getUserCode={getUserCode} /> */}
          <WithdrawTransaction getUserCode={getUserCode} displayPanel={displayPanel}/>

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


export const AdminInterface = ({
  displayPanel,
  displayFullName = "",
  getUserCode = "",
  displayIndex = "",
  
}) => {
  const [showLoading, setShowLoading] = useState(true);
  const [userStore, setUserStore, getUserStore] = useLocalStorageStore("registeredUsers",[]);

  useEffect(() => {
    if (displayPanel !== 0) return;
    getUserStore();
    return () => {}
  }, [displayPanel])

  useEffect(() => {
    setTimeout(() => {setShowLoading(false)},3000);
  
    return () => {
      
    }
  }, [])
  return (
    <div className="flex-column"> 
     {showLoading && <LoadingPage />}
      <Header displayFullName={displayFullName}>
        <SearchInput
          dataStore={userStore}
          displayField="userFullName"
          filterField="username"
          name="searchUser"
        /> 
      </Header> 
      
      <AdminPage 
        displayPanel={displayPanel}
        displayFullName={displayFullName}
        getUserCode={getUserCode}
        displayIndex={displayIndex}
      />    
    </div>
  );
};
