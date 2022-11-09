import React,{ useState, useRef} from 'react'
import { Input } from "../../components/input";
import { GlowingButton } from "../../components/button";
import useLocalStorageStore from '../../utilities/hooks/useLocalStorage';
import { v4 as uuidv4 } from "uuid"


const CreateAdminUser = () => {
  const [modalInvalidUsernameEmail, setModaIInvalidUsernameEmail] = useState(false);
  const [modalInvalidFields, setModalInvalidFields] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false); 
  const [userStore, setUserStore, getUserStore] = useLocalStorageStore(
    "registeredUsers",
    []
  );
  const adminFname = useRef();
  const adminLname = useRef();
  const adminUName = useRef();
  const adminMail = useRef();
  const adminPW = useRef();

  const handleCreateAdminUser = (e) => {
    e.preventDefault();    
    const targetEl = e.currentTarget.parentElement.parentElement.parentElement.children;
    let userObj = {
      userCode: uuidv4(),
      userFullName: `${targetEl.divadminFName.children.adminFName.value} ${targetEl.divadminLName.children.adminLName.value}`,
      userName: targetEl.divadminUName.children.adminUName.value,
      userEmail: targetEl.divadminMail.children.adminMail.value,
      userPassword: targetEl.divadminPW.children.adminPW.value,
      userType: "admin"
    };
    let invalidFields = [...document.querySelectorAll(".validation")];
    const filteredUser = userStore.find(obj => 
      (obj.userEmail === userObj.userEmail || obj.userName === userObj.userName)
      )
      if ((invalidFields.length > 0) && (filteredUser === undefined)) {
        setModalInvalidFields(true);
      } else if (filteredUser !== undefined) {
        setModaIInvalidUsernameEmail(true);
      } else {
        const newUser = [...userStore, userObj];
        setUserStore(newUser);
        setModalSuccess(true);
      }
    clearForm();
  }

  const clearForm = () => {
    adminFname.current.clearValue();
    adminLname.current.clearValue();
    adminUName.current.clearValue();
    adminMail.current.clearValue();
    adminPW.current.clearValue();
  }

  return (
    <>
    <form className="flex-column">
      <div className="modal-header">
        New Admin Accounts
      </div>
      <Input ref={adminFname} name="adminFName" placeholderText="First Name" />
      <Input ref={adminLname} name="adminLName" placeholderText="Last Name" />
      <Input ref={adminUName} name="adminUName" placeholderText="User Name" />
      <Input ref={adminMail} name="adminMail" placeholderText="Email" email/>
      <Input ref={adminPW} name="adminPW" password placeholderText="Password" />
      <div className='flex-row' style={{justifyContent: "center", marginTop: "1rem"}}>
        <GlowingButton displayText="Create Admin" buttonClick={handleCreateAdminUser} />
      </div>
    </form>
    </>
  )
}

export default CreateAdminUser