import React from "react";

const Modal = ({ children, backgroundColor = "#1f1f1f" }) => {
  return (
    <div
      style={{ backgroundColor: `${backgroundColor}` }}
      className="modal-container"
    >
      <div className="sub-container">{children}</div>
    </div>
  );
};

export const PopupModal = ({ children, backgroundColor = "#1f1f1f" }) => {
  return (
    <div
      style={{ backgroundColor: `${backgroundColor}` }}
      className="modal-container"
    >
    {children}
    </div>
  );
};

export default Modal;

function Popup({trigger, children}) {
  return (trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <butotn className="close-btn">X</butotn>
        {children}
      </div>
    </div>
  ) : "";
}



