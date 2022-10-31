import React, {useState} from "react";
import { IoHome, IoMailSharp } from "react-icons/io5";
import { GrMoney } from "react-icons/gr";
import { GiPiggyBank, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { RiLogoutBoxFill, RiBankFill } from "react-icons/ri";
import { CgChevronDoubleLeft, CgChevronDoubleRight } from "react-icons/cg";

export const AccountIcon = ({isActive = false}) => {
  return (
    <div className="nav-icons">
      <IoHome color="#ccc"/>
    </div>
  )
}

export const TransactionIcon = ({isActive = false}) => {
  return (
    <div className="nav-icons">
      <RiBankFill color="#ccc"/>
    </div>
  )
}

export const DepositIcon = ({isActive = false}) => {
  return (
    <div className="nav-icons">
      <GiPiggyBank color="#ccc"/>
    </div>
  )
}

export const WithdrawIcons = ({isActive = false}) => {
  return (
    <div className="nav-icons">
      <GiReceiveMoney color="#ccc"/>
    </div>
  )
}

export const FundTransferIcon = ({isActive = false}) => {
  return (
    <div className="nav-icons">
      <GiTakeMyMoney color="#ccc"/>
    </div>
  )
}

export const SwitchAccountIcon = ({isActive = false}) => {
  return (
    <div className="nav-icons">
      <AiOutlineUserSwitch color="#ccc"/>
    </div>
  )
}

export const MessagesIcon = ({isActive = false}) => {
  return (
    <div className="nav-icons">
      <IoMailSharp color="#ccc"/>
    </div>
  )
}

export const LogOutIcons = ({isActive = false}) => {
  return (
    <div className="nav-icons">
      <RiLogoutBoxFill color="#ccc"/>
    </div>
  )
}

export const NavToggler = ({toggleClick}) => {
  const [open, setOpen] = useState(true)

  const handleToggleClick = () => {
    setOpen(!open)
    toggleClick();
  }

  return (
    <div onClick={handleToggleClick} style={{display: "grid", alignItems: "center", justifyContent: "center" }}>
      {open && <CgChevronDoubleLeft />}
      {!open && <CgChevronDoubleRight  />}
    </div>
  )
}