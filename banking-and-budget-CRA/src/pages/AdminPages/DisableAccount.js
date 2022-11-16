import React, { useEffect, useState } from "react";
import Modal from "../../components/modal";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import DefaultToggle from "../../components/toggle";

const DisableAccount = ({ getUserCode = "", displayPanel = 0 }) => {
  // const [ allUsers, setAllUsers ] = useState([{
  //     userFullName: "John Doe",
  //     userEmail: "john@test.com",
  //     accountType: "Visa",
  //     status: "Active"
  // }]);
  // const [ isDisabled, setIsDisabled ] = useState(false)
  // const [ userInput, setUserInput ] = useState("")
  // const [ filterParams, setFilterParams ] = useState({
  //     userFullName: "",
  //     email: "",
  //     accountType: "",
  //     status: ""
  // });

  // const [userStore, setUserStore, getUserStore ] = useLocalStorageStore("registeredUsers",[]);

  // useEffect(() => {
  //     setAllUsers(userStore)
  // }, [userStore])

  // useEffect(() => {
  //     handleFilter(filterParams)
  //     console.log("Handle filter is triggered here")
  // }, [filterParams])

  // const handleChange = (e) => {
  //     e.preventDefault();
  //     setUserInput({
  //         userFullName: `${e.target.value}`
  //     })
  //     // console.log(userInput);
  // }
  // const [key, value] = Object.entries(filterParams)[0]
  // console.log(userInput);
  // console.log("Filter params: ", value);

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setFilterParams(userInput);
  //     handleFilter(filterParams)
  // }

  // const handleFilter = (filterParams) => {
  //     if (filterParams === undefined) return undefined

  //     const [key, value] = Object.entries(filterParams)[0]
  //     const filteredUser = userStore.find( obj => (
  //         obj[key] === value
  //     ))
  //     if (filteredUser) {
  //         setAllUsers([filteredUser])

  //     } else if (filteredUser === undefined) {
  //         setAllUsers([])
  //     };

  // };

  // const toggleStatus = (userAccount, index) => {
  //     let updatedUsers = allUsers;
  //     let newObj = userAccount;
  //     newObj["status"] = newObj.status === "active" || newObj.status === undefined ? "disabled" : "active"
  //     // newObj["status"] = "active"
  //     updatedUsers[index] = newObj

  //     setUserStore(
  //         updatedUsers
  //     )
  //     setIsDisabled(!isDisabled)
  //     console.log(isDisabled)
  // }
  // console.log(userStore)

  const [searchResult, setSearchResult] = useState({});
  const [userStore, setUserStore, getUserStore] = useLocalStorageStore( "registeredUsers", []);
  const [frozenUsers, setFrozenUsers, getFrozenUsers] = useLocalStorageStore( "blockedUsers", []);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    
    getUserStore();
    getUserAccount();
    getFrozenUsers();
    checkAccountonLoad();
    // setSearchResult({});
  }, [getUserCode, displayPanel]);

  useEffect(() => {
    if (getUserCode.trim() === "") return
    isDisabled ? recordDisabledAccount() : removeDisableAccount();
  },[isDisabled])

  const recordDisabledAccount = () => {
    let disabledUser = {
        userFullName: `${searchResult.userFullName}`,
        userName: `${searchResult.userName}`,
        userEmail: `${searchResult.userEmail}`,
      };

      const freezeUser = [...frozenUsers, disabledUser];      
    //   setFrozenUsers(freezeUser);
    // alert('disabling Account')
  }

  const removeDisableAccount = () => {
    const filteredFrozenUsers = frozenUsers.filter(
      (value, idx) =>
        value.userFullname !== `${searchResult.userFullName}` &&
        value.userName !== `${searchResult.userName}` &&
        value.userEmail !== `${searchResult.userEmail}`
    );
    setFrozenUsers(filteredFrozenUsers);
    // alert("enabling Account");
  };

  const checkAccountonLoad = () => {
    const accountisFrozen = frozenUsers.find(
        (value, idx) =>
          value.userFullname === `${searchResult.userFullName}` &&
          value.userName === `${searchResult.userName}` &&
          value.userEmail === `${searchResult.userEmail}`
      );
      
    if (accountisFrozen) {
        document.querySelector('.toggle-switch').checked = true
    } else {
        document.querySelector('.toggle-switch').checked = false
    }    
  }

  const getUserAccount = () => {
    const filteredUser = userStore.find((obj) => obj.userCode === getUserCode);
    
    if (filteredUser) {
      setSearchResult(filteredUser);
    } else if (filteredUser === undefined) {
      setSearchResult({
        result: "No result found",
      });
    }
  };

  const toggleStatus = (toggleState) => {
    setIsDisabled(toggleState)
  }

  return (
    //#region
    // <Modal>
    //     <div>
    //         <form onSubmit={(e) => handleSubmit(e)}>
    //             Filter Results
    //             <div style={{
    //                 display: "flex",
    //                 flexDirection: "row",
    //                 alignItems: "center",
    //                 justifyContent: "flex-start"
    //                 }}
    //             >
    //                 <input type={"text"} placeholder="Search" onChange={(e) => handleChange(e)}/>
    //                 <button
    //                     style={{ height: "80%"}}
    //                     // onClick={(e) => handleSubmit(e)}
    //                     type="submit"
    //                 >Filter Users
    //                 </button>
    //             </div>
    //         </form>
    //         <table style={{ width: "inherit", textAlign: "left"}}>
    //             <tr>
    //                 <th>Full Name</th>
    //                 <th>Email</th>
    //                 <th>Account Type</th>
    //                 <th>Status</th>
    //                 <th></th>
    //             </tr>
    //             {
    //                 allUsers.length === 0 ?
    //                 <tr>
    //                     No users found
    //                 </tr> :
    //                 allUsers.map((item, index) => {
    //                     return(
    //                         <tr style={{
    //                             border: "1px solid red"
    //                         }}>
    //                             <td>{item.userFullName}</td>
    //                             <td>{item.userEmail}</td>
    //                             <td>{item.accountType === undefined ? "Visa" : item.accountType}</td>
    //                             <td>{item.status}</td>
    //                             {/* <td>{item.status === undefined ? "Active" : item.status}</td> */}
    //                             <td>
    //                                 <button onClick={() => toggleStatus(item, index)}>
    //                                     {/* {item.status === undefined ? "Disable" : item.status} */}
    //                                     { item.status === "active" ? "Disable" : "Activate"}
    //                                 </button>
    //                             </td>
    //                         </tr>
    //                     )
    //                 })

    //             }
    //         </table>
    //     </ div>
    // </Modal>
    //#endregion
    <Modal>
      <div className="user-account-header">Account Details</div>
      <div className="user-account-details">
        Full Name :<p className="details">{searchResult.userFullName}</p>
      </div>
      <div className="user-account-details">
        Email :<p className="details">{searchResult.userEmail}</p>
      </div>
      <div className="user-account-details">
        Username :<p className="details">{searchResult.userName}</p>
      </div>
      <DefaultToggle toggleName="blocktoggle"  toggleEvent={toggleStatus}/>
    </Modal>
  );
};

export default DisableAccount;
