import React from "react";
import { CloseButton } from "../button";
import { TiWarning } from "react-icons/ti";
import { GiDiamondTrophy } from "react-icons/gi";

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

export const WarningPopup = ({ closeModal, message = "Warning Error" }) => {
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

export const SuccessPopup = ({ closeModal, message = "Congratulations" }) => {
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
        <div className=""><GiDiamondTrophy fontSize="10rem" color="green"/></div>
        <div className="">{message}</div>        
      </div>
    </div>
    </>
  );
};

export default Modal;
