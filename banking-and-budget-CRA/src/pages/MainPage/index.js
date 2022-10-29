import React, { useState, useRef } from "react";
import { LoginPage } from "../LoginPage";
import { PanelSections, PanelSectionHolder } from "../../components/panels";
import { NavigationContainer, NavigationItems } from "../../components/navigation";

export const MainPage = () => {
  const [verifiedAccount, setVerifiedAccount] = useState(false);

  const handleUserLogin = () => {
    setVerifiedAccount(true);
  };

  const handleUserLogout = () => {
    setVerifiedAccount(false);
  };

  const handleChangePanel = () => {};

  return (
    <div>
      {verifiedAccount ? (
        <UserInterface logout={handleUserLogout}/>
      ) : (
        <LoginPage verifyAccount={handleUserLogin} />
      )}
    </div>
  );
};

export const UserInterface = ({logout}) => {
  const [displayIndex, setDisplayIndex] = useState(0);

  const handleSwitchPanel = (e) => {
    const btnClicked = e.target;
    const panelIndex = btnClicked.dataset.id;
    setDisplayIndex(panelIndex);
  };

  const handleCloseNav = () => {
    const sidePanel = document.querySelector(".nav-bar");
    const overLay = document.querySelector(".over-lay");

    sidePanel.classList.toggle("hide");
    overLay.classList.toggle("hide");
  };
  return (
    <div className="flex-column">
   
        <NavigationContainer>
          <NavigationItems itemName="Home" panelIdx={0} itemClick={handleSwitchPanel}/>
          <NavigationItems itemName="Transaction" panelIdx={1} itemClick={handleSwitchPanel}/>
          <NavigationItems itemName="Deposit" panelIdx={2} itemClick={handleSwitchPanel}/>
          <NavigationItems itemName="Log Out" panelIdx={2} itemClick={logout}/>
        </NavigationContainer> 
   
        <PanelSectionHolder
          panelIdx={displayIndex}
          selectedIndex={handleSwitchPanel}
        >
          {[
            <PanelSections >
              <label>DashBoard</label>
            </PanelSections>,
            <PanelSections >
              <label>Transaction</label>
            </PanelSections>,
            <PanelSections >
              <label>Accounts</label>
            </PanelSections>,
          ]}
        </PanelSectionHolder>
    </div>
  );
};
