import "./styles/base.scss";
import React, { useState } from "react";
import { PanelSections, PanelSectionHolder } from "./components/panels";
import SidePanel from "./components/sidepanels";
import { MainPage } from "./pages/MainPage";

function App() {
  const [displayIndex, setDisplayIndex] = useState(0);

  const handleSwitchPanel = (selectedIndex) => {
    setDisplayIndex(selectedIndex);

    let switchRadio = document.querySelectorAll('[data-panelRadio="main"]');
    switchRadio.forEach((radio, idx) => {
      if (idx === selectedIndex) {
        radio.checked = true;
      }
    });
  };

  return (
    <div className="App flex-row">
      <MainPage />
{/* 
      <div>
        <SidePanel />
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
      </div> */}
    </div>
  );
}

export default App;
