import React, { useEffect } from "react";

const PanelSectionHolder = ({ children = [], panelIdx = 0 }) => {
  useEffect(() => {    
    let targetEl = document.querySelectorAll(".section-item");
    targetEl.forEach((panel, idx) => {
      panelIdx > idx
        ? panel.classList.add("force-hide")
        : panel.classList.remove("force-hide");
    });
  }, [panelIdx]);

  return (
    <div className="section-container">
      {children}    
    </div>
  );
};

const PanelSections = ({ children, color = "white" }) => {
  return (
    <div className="section-item" data-panel="panelsection" style={{ backgroundColor: color }}>
      {children}
    </div>
  );
};

export { PanelSections, PanelSectionHolder };
