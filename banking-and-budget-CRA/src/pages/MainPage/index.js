import React, { useState } from "react";
import { LoginPage } from "../LoginPage";
import SidePanel from "../../components/sidepanels";
import { PanelSections, PanelSectionHolder } from "../../components/panels";


export const MainPage = () => {
  const [verifiedAccount, setVerifiedAccount] = useState(false)

  const handleUserLogin = () => {
    setVerifiedAccount(true)
  }

  const handleChangePanel = () => {

  }

  return (
    <div>
      {verifiedAccount ? <UserInterface /> : <LoginPage verifyAccount={handleUserLogin}/>}
    </div>
  );
};


export const UserInterface = () => {
  const [displayIndex, setDisplayIndex] = useState(0);

  const handleSwitchPanel = (selectedIndex) => {   
    setDisplayIndex(1);
  };
  
  return (
    <div className="flex-row">
     <div>
        <SidePanel transactionButton={handleSwitchPanel}/>
      </div>

      <div>
        <PanelSectionHolder
          panelIdx={displayIndex}
          selectedIndex={handleSwitchPanel}
        >
          {[
            <PanelSections color="green"></PanelSections>,            
            <PanelSections color="blue">
              <label>Panel 2</label>
            </PanelSections>,
          ]}
        </PanelSectionHolder>
      </div>
    </div>
  );
}
