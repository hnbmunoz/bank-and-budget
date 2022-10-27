import React, { useState } from "react";
import { LoginPage } from "../LoginPage";
import SidePanel from "../../components/sidepanels";
import { PanelSections, PanelSectionHolder } from "../../components/panels";

export const MainPage = () => {
  const [verifiedAccount, setVerifiedAccount] = useState(false);

  const handleUserLogin = () => {
    setVerifiedAccount(true);
  };

  const handleChangePanel = () => {};

  return (
    <div>
      {verifiedAccount ? (
        <UserInterface />
      ) : (
        <LoginPage verifyAccount={handleUserLogin} />
      )}
    </div>
  );
};

export const UserInterface = () => {
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
      <div>
        <SidePanel
          navButton={handleCloseNav}
          homeButton={handleSwitchPanel}
          transactionButton={handleSwitchPanel}
          accountsButton={handleSwitchPanel}
          panelClick={handleSwitchPanel}
        />
      </div>

      <div>
        <PanelSectionHolder
          panelIdx={displayIndex}
          selectedIndex={handleSwitchPanel}
        >
          {[
            <PanelSections color="green"></PanelSections>,
            <PanelSections color="blue">
              <label>Transaction</label>
            </PanelSections>,
            <PanelSections color="white">
              <label>Accounts</label>
            </PanelSections>,
          ]}
        </PanelSectionHolder>
      </div>
    </div>
  );
};
