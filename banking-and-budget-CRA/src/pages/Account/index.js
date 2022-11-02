import { useState, useEffect } from "react";

import Modal from "../../components/modal";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";

const Account = ({ depositBalance }) => {
  const [userStore, setUserStore, getUserStore] = useLocalStorageStore(
    "registeredUsers",
    []
  );
  const [userName, setUserName] = useState({});

  const getUserProfile = () => {
    setUserName(userStore.find((user) => user.userName === "rob"));
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
            <p>Php {depositBalance}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Account;
