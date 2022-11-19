import React, { useEffect, useState } from "react";
import Modal from "../../components/modal";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import { IoMdClipboard } from "react-icons/io";
import DefaultToggle from "../../components/toggle";
import { NeonButton } from "../../components/button";
import { checkBlockedUsers } from "../../utilities/utilities";

const DisableAccount = ({ getUserCode = "", displayPanel =0}) => {

  const [allUsers, setAllUsers] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [userStore, setUserStore, getUserStore] = useLocalStorageStore( "registeredUsers",[]);
  const [userAccount, setUserAccount, getUserAccount] = useLocalStorageStore("userAccounts",[]);
  const [blockedUsers, setBlockedUsers, getBlockedUsers] = useLocalStorageStore("blockedUsers",[]);
  const [selectedAcct, setSelectedAcct] = useState("");
  const [isActive, setIsActive] = useState(true)


  useEffect(() => {
    handleSearch();
    getBlockedUsers();
    isUserBlocked();
  }, [getUserCode, displayPanel]);

  const handleSearch = () => {
    setAllUsers(
      userStore.filter((allRecords) =>
        allRecords.userCode.includes(getUserCode)
      )
      

    );

    if (getUserCode.trim() === "") {
        setAllUsers([])
      }
  };

//   const toggleStatus = (userAccount, index) => {
//     let updatedUsers = userStore;
//     let newObj = userAccount;
//     newObj["status"] =
//       newObj.status === "active" || newObj.status === undefined
//         ? "disabled"
//         : "active";
//     updatedUsers[index] = newObj;

//     setUserStore(updatedUsers);
//     setIsDisabled(!isDisabled);
//   };

  const isUserBlocked = () => {
   setIsActive(checkBlockedUsers(blockedUsers, getUserCode))
  };

  const configureBlockUsers = async (userState) => {
    if (!userState) {
        let unblockUser =  blockedUsers.filter(accounts => accounts.userCode !== `${getUserCode}`)
        setBlockedUsers(unblockUser);        
    } else {
        let blockedUser = {
            userCode: `${getUserCode}`
        };
        const newBannedUser = [...blockedUsers, blockedUser];
        setBlockedUsers(newBannedUser);
    }
  }

  const changeUserStatus = async () => {
    await setIsActive(!isActive)
    await configureBlockUsers(isActive);
  }

  const getAccountNumber = (userCode) => {
    const filteredUser = userAccount.find(
      (obj) => obj.accountUser === userCode
    );
    if (filteredUser !== undefined) {
      return filteredUser.accountNumber;
    } else {
      return "N/A";
    }
  };

  const getNumberofAccounts = () => {
    
  }

  const copyClipboard = () => {
    navigator.clipboard.writeText(selectedAcct);
    alert("copied to clipboard");
  };

  return (
    <Modal>
      <div className="user-account-header">Chopping Block</div>
      {allUsers.map((item, index) => {
        return (
          <div className="user-account-details-con">
            <div className="user-account-details">
              Full Name :<p className="details"> {item.userFullName}</p>
            </div>
            <div className="user-account-details">
              {/* Number of Accounts : */}
              {/* <p className="details"> */}
                {/* {getAccountNumber(item.userCode)}{" "}
                <IoMdClipboard fontSize="1rem" onClick={copyClipboard} /> */}
              {/* </p> */}
            </div>
            <div className="status-conrainer">
              <div className="user-account-details">
                {/* Status :<p className="details"> {item.status}</p> */}
                Status : {isActive ? "Enabled" : "Disabled"}

              </div>
              
              {/* <div className="btn-container"> */}
                {/* <button onClick={() => toggleStatus(item, index)}>
                  {item.status === "active" ? "Disable" : "Activate"}
                </button> */}

                 
              {/* </div> */}
            </div>
            <div className="flex-row">
              <NeonButton displayText="Change Status" buttonClick={changeUserStatus}/>
              </div>
          </div>
        );
      })}
    </Modal>
  );
};

export default DisableAccount;
