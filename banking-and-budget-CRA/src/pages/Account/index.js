import { useState, useEffect } from "react";
import Modal from "../../components/modal";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import { GetTransactionBalance } from "../../utilities/utilities";

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
    setUserBalance(0)
    return () => {};
  }, [displayPanel]);

  useEffect(() => {
    userStore.length > 0 && getBalance();
    return () => {};
  }, [userTransactions]);

  
  const getUserProfile = () => {
    setUserName(userStore.find((user) => user.userCode === `${getUserCode}`));
  };

  const getBalance = () => {
    const userData = userTransactions.filter(
      (user) => user.userCode === `${getUserCode}`
    );

    const totalBalance = GetTransactionBalance(userData, getUserCode)
    setUserBalance(prevBalance=> prevBalance + totalBalance);
  };

  useEffect(() => {
    userStore.length > 0 && getUserProfile();
    return () => {};
  }, [userStore]);
  return (<div>   
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
            <p>Php {userBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
          </div>
        </div>
      </div>
    </Modal>
    </div>
  );
};

export default Account;
