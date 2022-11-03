import { click } from "@testing-library/user-event/dist/click";
import { type } from "@testing-library/user-event/dist/type";
import { useState, useEffect } from "react";

import Modal from "../../components/modal";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import Deposit from "../Deposit";

const Account = ({ getUserCode, displayPanel }) => {
  const [userStore, setUserStore, getUserStore] = useLocalStorageStore(
    "registeredUsers",
    []
  );

  const [userTransactions, setUserTransaction, getUserTransactions] =
    useLocalStorageStore("userTransaction", []);

  const [userName, setUserName] = useState({});
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    getUserTransactions();
    return () => {};
  }, [displayPanel]);

  useEffect(() => {
    userStore.length > 0 && getTransactions();
    return () => {};
  }, [userTransactions]);

  const getUserProfile = () => {
    setUserName(userStore.find((user) => user.userCode === `${getUserCode}`));
  };

  const getTransactions = () => {
    const userData = userTransactions.filter(
      (user) => user.userCode === `${getUserCode}`
    );

    const deposit = userData
      .filter((data) => data.title === "Deposit")
      .reduce((total, deposit) => {
        return total + Number(deposit.amount);
      }, 0);

    const withdraw = userData
      .filter((data) => data.title === "Withdraw")
      .reduce((total, withdraw) => {
        return total + Number(withdraw.amount);
      }, 0);

    const transfer = userData
      .filter((data) => data.title === "Transfer")
      .reduce((total, transfer) => {
        return total + Number(transfer.amount);
      }, 0);

    setUserBalance(deposit);
  };

  useEffect(() => {
    userStore.length > 0 && getUserProfile();
    return () => {};
  }, [userStore]);

  return (
    <Modal backgroundColor="#1f1f1f">
      <div className="account flex-row">
        <div className="account__info">
          <h3 className="account__user">{userName.userFullName}</h3>
          <div className="account__account">Savings</div>
          <div className="account__number">1234</div>
        </div>
        <div className="account__balance-image flex-column">
          <div className="account__image flex-row">
            <div className="image-container">
              <img src="#" alt="Profile " />
            </div>
          </div>
          <div className="account__balance">
            <p>Available Balance</p>
            <p>Php {userBalance}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Account;
