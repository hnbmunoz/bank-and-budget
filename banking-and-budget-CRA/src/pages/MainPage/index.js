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
    const panelIndex = e.target.dataset.id;
    setDisplayIndex(panelIndex);
  };

  return (
    <div className="flex-row">
      <div>
        <SidePanel
          homeButton={handleSwitchPanel}
          transactionButton={handleSwitchPanel}
          accountsButton={handleSwitchPanel}
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
