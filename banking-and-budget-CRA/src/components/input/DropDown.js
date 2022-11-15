import React, { useEffect, useState,useRef, useImperativeHandle, forwardRef } from "react";
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

const CustomDropDown = forwardRef(
  (
    {
      dataStore = [],
      staticStore = [],
      filterField,
      name="",
      title,
      selectedClient = "",
      getAccountBalance,
      refreshStorage
    },
    ref
  ) => {
    const [userInput, setUserInput] = useState("");
    const [showDrop, setShowDrop] = useState(false);

    useImperativeHandle(ref, () => ({
      clearValue() {
        setUserInput("");
      },
    }));

    const onChangeInput = (e) => {
      setUserInput(e.target.value);
    };

    const hideDrop = () => {
      setShowDrop(false);
    };

    const displayDrop = () => {
      setShowDrop(true);
    };

    const selectedAccount = (e) => {
      setUserInput(e.target.innerHTML);
      setShowDrop(false);
      getAccountBalance(e.target.dataset.acctnum);
    };
    return (
      <div className="search-input-container">
        <div
          style={{
            fontFamily: "Montserrat",
            color: "#ccc",
            fontSize: "1rem",
          }}
        >
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
          <div className="searched-item-container">
            {dataStore
              .filter((allRecords) => allRecords.accountUser === selectedClient)
              .map((obj, idx) => (
                <div className="searched-item" key={idx}>
                  <div
                    style={{ padding: "0 1rem" }}
                    onClick={selectedAccount}
                    data-acctnum={obj.accountNumber}
                  >
                    {obj.accountType}
                  </div>
                </div>
              ))}
            </div>
        )}
      </div>
    );
  }
);

/// This is similar to CustomDropDown but generates diffrent value when selected value is clicked
const BankExclusiveDropDown = forwardRef(
  (
    {
      dataStore = [],
      staticStore = [],
      filterField,
      name="",
      title,
      selectedClient = "",
      getAccountBalance,
      refreshStorage
    },
    ref
  ) => {
    const [userInput, setUserInput] = useState("");
    const [showDrop, setShowDrop] = useState(false);

    useImperativeHandle(ref, () => ({
      clearValue() {
        setUserInput("");
      },
    }));

    const onChangeInput = (e) => {
      setUserInput(e.target.value);
    };

    const hideDrop = () => {
      setShowDrop(false);
    };

    const displayDrop = () => {
      setShowDrop(true);
    };

    const selectedAccount = (e) => {
      setUserInput(e.currentTarget.dataset.acctnum);
      setShowDrop(false);
      // getAccountBalance(e.currentTarget.dataset.acctnum);
    };
    return (
      <div name={`dropDown${name}`} className="search-input-container">
        <div
          style={{
            fontFamily: "Montserrat",
            color: "#ccc",
            fontSize: "1rem",
          }}
        >
          {title}
        </div>
        <div name={`div${name}`} className="input-container">
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
          <div className="searched-item-container">
            {dataStore
              .filter((allRecords) => allRecords.accountUser === selectedClient)
              .map((obj, idx) => (
                <div className="searched-item" key={idx}>
                  <div
                    style={{ padding: "0 1rem" }}
                    onClick={selectedAccount}
                    data-acctnum={obj.accountNumber}
                  >
                    {obj.accountType}
                  </div>
                </div>
              ))}
            </div>
        )}
      </div>
    );
  }
);



export const StaticDropDown = ({
  dataStore = [],
  staticStore = [],
  name,
  title
}) => {  
  const [staticArr, setStaticArr] = useState(staticStore)
  const [userInput, setUserInput] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  
  const onChangeInput = (e) => {
    setUserInput(e.target.value);
  };

  const hideDrop = () => {
    setShowDrop(false);
  };

  const displayDrop = () => {
    setShowDrop(true);
  };

  const userSelected = (e) => {  
    setUserInput(e.currentTarget.innerHTML)
    setShowDrop(false)
  }

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
      { showDrop &&
        <DropDownData>          
              {staticArr.map(cardType => <div className="searched-item" onClick={userSelected}>{cardType}</div>)}
        </DropDownData>
      }
    </div>
  );
};

export {
  CustomDropDown,
  BankExclusiveDropDown
}