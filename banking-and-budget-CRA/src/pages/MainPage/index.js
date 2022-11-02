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

export const MainPage = () => {
  const [verifiedAccount, setVerifiedAccount] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [openNav, setOpenNav] = useState(true);

  const handleToggleNavbar = (e) => {
    setOpenNav(!openNav);
  };

  const handleUserLogin = () => {
    setVerifiedAccount(true);
  };

  const handleUserLogout = () => {
    setVerifiedAccount(false);
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
        showNav={verifiedAccount}
        navToggle={handleToggleNavbar}
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

      {verifiedAccount ? (
        <UserInterface displayPanel={displayIndex} />
      ) : (
        <LoginPage verifyAccount={handleUserLogin} />
      )}
    </div>
  );
};

export const UserInterface = ({ displayPanel }) => {
  const [userBalance, setUserBalance] = useState(100000);
  const [userTransaction, setUserTransaction] = useState({
    deposit: "",
    withdraw: "",
    transfer: "",
  });

  const onDepositBalance = (addDeposit) => {
    setUserBalance((prevState) => {
      return prevState + Number(addDeposit.amount);
    });
    setUserTransaction((prevState) => {
      return { ...prevState, deposit: addDeposit };
    });
  };
  const onWithdrawBalance = (minusWithdraw) => {
    setUserBalance((prevState) => {
      return prevState - Number(minusWithdraw.amount);
    });
    setUserTransaction((prevState) => {
      return { ...prevState, withdraw: minusWithdraw };
    });
  };
  const onTransferBalance = (minusTransfer) => {
    setUserBalance((prevState) => {
      return prevState - Number(minusTransfer.amount);
    });
    setUserTransaction((prevState) => {
      return { ...prevState, transfer: minusTransfer };
    });
  };

  return (
    <div className="flex-column">
      <Header />
      <PanelSectionHolder panelIdx={displayPanel}>
        <PanelSections>
          <Accounts depositBalance={userBalance} />
        </PanelSections>
        <PanelSections>
          <Transactions transactionData={userTransaction} />
        </PanelSections>
        <PanelSections>
          <Deposit userBalance={onDepositBalance} />
        </PanelSections>
        <PanelSections>
          <Withdraw userBalance={onWithdrawBalance} />
        </PanelSections>
        <PanelSections>
          <FundTransfer userBalance={onTransferBalance} />
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
