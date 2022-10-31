import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import React from 'react';
export default function PasswordIcons({
  displayPassword,
  onClickDisplayPassword
}) {
  return (
    <div className="icon-container">
      <button className="placeholder-button" onClick={onClickDisplayPassword}>
        {!displayPassword ? (
          <AiFillEyeInvisible color="808080" />
        ) : (
          <AiFillEye color="dc143c" />
        )}
      </button>
    </div>
  );
}
