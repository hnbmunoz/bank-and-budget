import React, { useEffect, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const DropDownData = ({ children }) => {
  const displayStyle = {
    borderRadius: "0.5rem",
    padding: "0.5rem 0",
    width: "30rem",
    minWidth: "20%",
    backgroundColor: "#ccc",
    position: "absolute",
    color: "#1f1f1f"
  };
  return (
    <div className="searched-item-container" style={{}}>
      {children}
    </div>
  );
};

// const InputPlaceholder = ({ display = "", deactivate = false }) => {
//   const [placeholderDisplay, setPlaceholderDisplay] = useState(display);
//   return (
//     <div className="input-placeholder">
//       <label
//         id="target"
//         htmlFor="userNameInput"
//         autoCorrect="off"
//         autoComplete="off"
//       >
//         {!deactivate ? `${placeholderDisplay}` : "Disabled"}
//       </label>
//     </div>
//   );
// };

export const CustomDropDown = ({
  // dataStore = [],
  // displayField,
  // filterField,
   name,
   title
  // selectedClient
}) => {
  const [userInput, setUserInput] = useState("");
  const [showDrop, setShowDrop] = useState(false);

  // useEffect(() => {
  //   userInput.trim() === "" || userInput.trim() === "undefined"
  //     ? setShowSearchResult(false)
  //     : setShowSearchResult(true);

  //   return () => {};
  // }, [userInput]);

  // const getUser = (e) => {
  //   selectedClient(e.currentTarget.dataset.usercode);
  //   setShowSearchResult(false);
  // };

  const onChangeInput = (e) => {
    setUserInput(e.target.value);
  };

  const hideDrop = () => {
    setShowDrop(false);
  };

  const displayDrop = () => {
    setShowDrop(true);
  };

  return (
    <div className="search-input-container">
      <div style={{
        fontFamily:"Montserrat",
        color:"#ccc",
        fontSize:"1rem"
        }}>
      {title}
      </div>
      <div className="input-container">        
        <input
          name={name}
          data-searchname={name}
          className="input-container__textbox"
          placeholder=" "
          value={userInput}
          onChange={onChangeInput}
          autoComplete="off"
          autoCorrect="off"
        ></input>
        {/* <InputPlaceholder display="Search" /> */}
        <div className="placeholder-icons-container">
          {showDrop ? (
            <button className="placeholder-button" onClick={hideDrop}>
              <IoIosArrowUp />
            </button>
          ) : (
            <button className="placeholder-button" onClick={displayDrop}>
              <IoIosArrowDown />
            </button>
          )}
        </div>
      </div>
      {showDrop && (
        <DropDownData>
          {/* {dataStore
            .filter((allRecords) =>
              allRecords.userFullName
                .toLowerCase()
                .includes(`${userInput.toLowerCase().trim()}`)
            )
            .map((obj, idx) => (
              <div className="searched-item">
                <div
                  style={{ padding: "0 1rem" }}
                  onClick={getUser}
                  data-usercode={obj.userCode}
                >
                  {obj.userFullName}
                </div>
              </div>
            ))} */}
        </DropDownData>
      )}
    </div>
  );
};
