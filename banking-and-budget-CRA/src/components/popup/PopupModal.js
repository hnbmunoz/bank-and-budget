import React from "react";
import "../../styles/components/popup/PopupModal.scss"

const PopupModal = ({setOpenModal}) => {
  return (
    <div className="modalBackground">
      <div className="modalBackgroundCon">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => {setOpenModal(false);}}> X </button>
          </div>
          <div className="title">
            <h1>Please Fill Up Required Fields Properly!</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupModal;