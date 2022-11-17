import React,{ useEffect, useState } from 'react';
import Modal from "../../components/modal";
import useLocalStorageStore from '../../utilities/hooks/useLocalStorage';
import { IoMdClipboard } from 'react-icons/io';
import DefaultToggle from '../../components/toggle';

const DisableAccount = ({ getUserCode = "" }) => {
    // const [ allUsers, setAllUsers ] = useState([{
    //     userFullName: "John Doe",
    //     accountUser: "4000000000000000",
    //     status: "Active"
    // }]);
    const [ allUsers, setAllUsers ] = useState([]);
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
        // alert(getUserCode)
        handleSearch();
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
            return "NA";
        }
    }

    const copyClipboard = () => {
        navigator.clipboard.writeText(selectedAcct)
        alert('copied to clipboard')
    }

    return (
        <Modal>
                <table style={{ width: "100%", textAlign: "left"}}>
                    <tr>
                        <th>Name</th>
                        <th>Account Number</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    {
                    allUsers.map((item, index) => {
                        return(
                            <tr>
                                <td>{item.userFullName}</td>
                                <td>{getAccountNumber(item.userCode)} <IoMdClipboard fontSize="1rem" onClick={copyClipboard}/></td>
                                <td>
                                    <button onClick={() => toggleStatus(item, index)}>
                                        { item.status === "disabled" || item.status === undefined ? "Activate" : "Disable"}
                                    </button>
                                </td>
                            </tr>
                            )
                        })
                    }
                </table>
        </Modal>
    )
};

export default DisableAccount;