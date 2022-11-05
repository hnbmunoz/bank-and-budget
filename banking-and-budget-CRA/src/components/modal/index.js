import React from "react";
import { CloseButton } from "../button";
import { TiWarning } from "react-icons/ti";

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

export const Popup = ({ closeModal, message }) => {
  const blurEffect = {
    position: "absolute",
    height: "100vh",
    width: "100%",
    backgroundColor: "#000",
    opacity: "0.8"
  }
  return (
    <>
    <div style={blurEffect}></div>
    <div className="popUp-container">
      <div className="popUp-modal flex-column">
        <CloseButton onClickClose={closeModal} />        
        <div className=""><TiWarning fontSize="10rem" color="ee2737"/></div>
        <div className="">{message}</div>        
      </div>
    </div>
    </>
  );
};

export default Modal;
