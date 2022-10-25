// import logo from "./logo.svg";
import "./App.css";
import "./styles/base.scss";
import React, { useState } from "react";
import { PanelSections, PanelSectionHolder } from "./components/panels";
import Counter from "./components/counter.js"

// import TestLogo from "./TrialLogo.png"

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
    <div className="App">
      {/* <img src={logo} className="App-logo" alt="logo" />*/}
      <PanelSectionHolder
        panelIdx={displayIndex}
        selectedIndex={handleSwitchPanel}
      >
        {[
          <PanelSections color="white">
            <Counter />
          </PanelSections>,
          <PanelSections  color="blue">
            <label>Panel 2</label>
          </PanelSections>,
        ]}
      </PanelSectionHolder>
    </div>
  );
}

export default App;
