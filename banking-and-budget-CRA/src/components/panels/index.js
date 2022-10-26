import React, { useEffect } from "react";

const PanelSectionHolder = ({ children = [], panelIdx = 0, selectedIndex }) => {
  useEffect(() => {
    let targetRadio = document.querySelectorAll(`[data-panelradio="main"]`);
    targetRadio[panelIdx].checked = true;
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
      <div className="section-marker">
        {children.map((panel, idx) => {
          return (
            <div
              key={idx}
              className="rdo-container"
              style={{ top: `${2 * idx}rem` }}
            >
              <input
                data-panelradio="main"
                type="radio"
                name="panel-selector"
                id={`panelIndex${idx}`}
                className="customRdo"
                onClick={() => {
                  selectedIndex(idx);
                }}
              />
              <label
                for={`panelIndex${idx}`}
                className="panel-selector-label"
              ></label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PanelSections = ({ children = null, color = "transparent" }) => {
  return (
    <div className="section-item" style={{ backgroundColor: color }}>
      <div>{children}</div>
    </div>
  );
};

export { PanelSections, PanelSectionHolder };
