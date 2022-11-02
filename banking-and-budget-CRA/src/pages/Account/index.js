import { useState, useEffect } from "react";

import Modal from "../../components/modal";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";

const Account = ({ depositBalance, getUserCode }) => {
  const [userStore, setUserStore, getUserStore] = useLocalStorageStore(
    "registeredUsers",
    []
  );
  
  const [userTransactions, setUserTransaction, getUserTransactions] =
    useLocalStorageStore("userTransaction", []);

  const [userName, setUserName] = useState({});
  const [userBalance, setUserBalance] = useState("");

  const getUserProfile = () => {
    setUserName(userStore.find((user) => user.userCode === `${getUserCode}`));//still static must be dynamic
  };

  const getTransactions = () => {
    setUserBalance(1000);
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
