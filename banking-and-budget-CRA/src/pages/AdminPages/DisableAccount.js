import React,{ useEffect, useState } from 'react';
import Modal from "../../components/modal";
import useLocalStorageStore from '../../utilities/hooks/useLocalStorage';
import { IoMdClipboard } from 'react-icons/io';
import DefaultToggle from '../../components/toggle';

const DisableAccount = ({ getUserCode = "" }) => {
    const [ allUsers, setAllUsers ] = useState([{
        userFullName: "John Doe",
        accountUser: "4000000000000000",
        status: "Active"
    }]);
    // const [ allUsers, setAllUsers ] = useState([]);
    const [ isDisabled, setIsDisabled ] = useState(false)
    const [ userInput, setUserInput ] = useState("")
    const [ filterParams, setFilterParams ] = useState({
        userFullName: "",
        accountUser: "",
        status: ""
    });

    const [userStore, setUserStore, getUserStore ] = useLocalStorageStore("registeredUsers",[]);
    const [userAccount, setUserAccount, getUserAccount ] = useLocalStorageStore("userAccounts",[]);
    const [selectedAcct, setSelectedAcct] = useState("");
    const [ searchResult, setSearchResult ] = useState({ result: ""});

    // useEffect(() => {
    //     setAllUsers(userStore)
    // }, [userStore])

    useEffect(() => {
        handleSearch()
    }, [getUserCode])

    const handleSearch = () => {    
        // const filteredUser = userStore.find( obj => (
        // obj.userCode === getUserCode
        // ))
        //     if (filteredUser) {
        //     setSearchResult({
        //         result: filteredUser
        //     });
        //     } else if (filteredUser === undefined) {
        //     setSearchResult({
        //         result: "No result found"
        //         })
        //     };
        setAllUsers(userStore.filter(allRecords => allRecords.userCode.includes(getUserCode)))
    }   

    const handleFilter = (filterParams) => {
        if (filterParams === undefined) return undefined

        const [key, value] = Object.entries(filterParams)[0]
        const filteredUser = userStore.find( obj => (
            obj[key] === value
        ))
        if (filteredUser) {
            setAllUsers([filteredUser])
            
        } else if (filteredUser === undefined) {
            setAllUsers([])
        };
    };

    const toggleStatus = (userAccount, index) => {
        let updatedUsers = userStore;
        let newObj = userAccount;
        newObj["status"] = newObj.status === "active" || newObj.status === undefined ? "disabled" : "active"
        // newObj["status"] = "active"
        updatedUsers[index] = newObj

        setUserStore(
            updatedUsers
        )
        setIsDisabled(!isDisabled)
    }

    const getAccountNumber = (userCode) => {
        const filteredUser = userAccount.find( obj => (
            obj.accountUser === userCode
        )) 
        if (filteredUser !== undefined) {
            return filteredUser.accountNumber;
        } else {
            return "N/A";
        }
    }

    const copyClipboard = () => {
        navigator.clipboard.writeText(selectedAcct)
        alert('copied to clipboard')
    }

    return (
        <Modal>
            <div className="user-account-header">Account Details</div>
            {
            allUsers.map((item, index) => {
                return(
                    <div className="user-account-details-con">
                        <div className="user-account-details">
                        Full Name :<p className="details"> {item.userFullName}</p>
                        </div>
                        <div className="user-account-details">
                        Account Number :<p className="details">{getAccountNumber(item.userCode)} <IoMdClipboard fontSize="1rem" onClick={copyClipboard}/></p>
                        </div>
                        <div className="status-conrainer">
                            <div className="user-account-details">
                                Status :<p className="details"> {item.status}</p>
                            </div>
                            <div className="btn-container">
                                <button onClick={() => toggleStatus(item, index)}>
                                    { item.status === "active" ? "Disable" : "Activate"}
                                </button>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
        </Modal>
    )
};

export default DisableAccount;