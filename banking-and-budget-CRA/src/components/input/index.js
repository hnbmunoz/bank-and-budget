import React from "react";
import { useState, useEffect, useRef, useImperativeHandle, forwardRef  } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import PasswordIcons from "../passwordIcons";
import SearchIcons from "./searchIcons";

const InputPlaceholder = ({ display, deactivate = false }) => {
  const [placeholderDisplay, setPlaceholderDisplay] = useState(display);
  return (
    <div className="input-placeholder">
      <label
        id="target"
        htmlFor="userNameInput"
        autoCorrect="off"
        autoComplete="off"        
      >
        {!deactivate ?  `${placeholderDisplay}` : "Disabled"}
      </label>
    </div>
  );
};

const DisplayFilter = ({children}) => {
  const displayStyle = {
    borderRadius: "0.5rem",
    padding: "0.5rem 0",
    width: "30rem",
    minWidth: "20%",
    backgroundColor: "#ccc",
    position: "absolute",
    color: "#1f1f1f"
  }
  return (
    <div  className="searched-item-container" style={{}}>
      {children}
    </div>
  )
}

const Input = forwardRef(
  (
    {
      name = "",
      email = false,
      password = false,
      number = false,
      text = true,
      required = false,
      deactivate = false,
      placeholderText = "Enter Data Here",
      min = 0,
      max = 9999,
    },
    ref
  ) => {
    const [userInput, setUserInput] = useState("");
    const [isValid, setIsValid] = useState({ show: false, message: "" });
    // const prevInputRef = useRef();
    const [showPassword, setShowPassword] = useState(false);

    useImperativeHandle(ref, () => ({
      clearValue() {
        setUserInput("");
      },
    }));

    useEffect(() => {
      number && isValidRange(userInput);
      // prevInputRef.current = userInput;
      userInput === 0 && setUserInput("");
    }, [userInput]);

    const eyeClick = (e) => {
      setShowPassword(!showPassword);
      e.preventDefault();
    };

    const onChangeInput = (e) => {
      if (deactivate) return;
      let Input = e.target.value;
      email &&
        setIsValid({ show: isValidEmail(Input), message: "Not Email Format" });
      number && !isValidNumber(Input) && setUserInput((prevValue) => prevValue);
      password &&
        setIsValid({
          show: isValidPassword(Input),
          message:
            "Must contain at least 1 lower and uppercase character, 1 numeric character, 1 special character, and at least 8 characters",
        });

      !email &&
        !number &&
        !password &&
        setIsValid({ show: true, message: null });
      if (!number) {
        setUserInput(Input);
      } else {
        // if (Input < min) return
        Number(Input) || Input.trim() === ""
          ? setUserInput(Input)
          : setUserInput((prevInput) => prevInput);
      }
    };

    const isValidPassword = (input) => {
      let strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );
      return strongRegex.test(input);
    };

    const isValidEmail = (input) => {
      return input.trim() === "" ? true : /\S+@\S+\.\S+/.test(input);
    };

    const isValidNumber = (input) => {
      return input.trim() === "" || input.trim() === "-"
        ? true
        : /^\d+$/.test(input) || /^-\d+$/.test(input);
    };

    const isValidRange = (input) => {
      setIsValid({
        show: Number(input) >= Number(min) && Number(input) <= Number(max),
        message:
          Number(input) < Number(min)
            ? "Input is less than minimum range"
            : Number(input) > Number(max) &&
              "Input is greater than maximum range",
      });
    };

    const incrementState = () => {
      if (deactivate) return;
      setUserInput(Number(userInput) + 1);
    };

    const decrementState = () => {
      if (deactivate) return;
      setUserInput(Number(userInput) - 1);
    };
    return (
      <div name={`div${name}`} className="input-container">
        <input
          name={name}
          data-inputname={name}
          className="input-container__textbox"
          type={!password ? "text" : showPassword ? "text" : "password"}
          placeholder=" "
          value={userInput}
          onChange={onChangeInput}
          autoComplete="off"
          autoCorrect="off"
          style={{
            width: number ? "88%" : "93%",
          }}
        ></input>
        <InputPlaceholder display={placeholderText} deactivate={deactivate} />
        {number && (
          <div className="placeholder-icons-container">
            <button className="placeholder-button" onClick={incrementState}>
              <IoIosArrowUp />
            </button>
            <button className="placeholder-button" onClick={decrementState}>
              <IoIosArrowDown />
            </button>
          </div>
        )}
        {password && (
          <div className="placeholder-icons-container">
            <PasswordIcons
              displayPassword={showPassword}
              onClickDisplayPassword={eyeClick}
            />
          </div>
        )}
        {!isValid.show && <div className="validation">{isValid.message}</div>}
      </div>
    );
  }
);

const SearchInput = ({dataStore = [], displayField, filterField, name, selectedClient, refreshStorage}) => {
  const [userInput, setUserInput] = useState("");
  const [showSearchResult, setShowSearchResult] = useState (false);

  useEffect(() => {
    (userInput.trim() === "" || userInput.trim() === "undefined") ? setShowSearchResult(false):setShowSearchResult(true)
  
    return () => {
      
    }
  }, [userInput])
  
  const getUser = (e) => {
    selectedClient(e.currentTarget.dataset.usercode)
    setShowSearchResult(false)
  };

  const onChangeInput = (e) => {    
    setUserInput(e.target.value);
  };

  document.addEventListener("click", (e) => {
    if (e.currentTarget.className === 'input-container' || e.currentTarget.className === 'input-container__textbox') return
    setShowSearchResult(false)
    try {
      document.removeEventListener("click")
    } catch {}    
  })
  return (
    <div className="search-input-container">
      <div  className="input-container">
        <input
          name={name}
          data-searchname={name}
          className="input-container__textbox"
          placeholder=" "
          value={userInput}
          onChange={onChangeInput}
          onClick={refreshStorage}
          autoComplete="off"
          autoCorrect="off"
        ></input>
        <InputPlaceholder display="Search"  />       
        <div className="placeholder-icons-container">
          <SearchIcons />
        </div>       
      </div>
      {showSearchResult && <DisplayFilter>
        {dataStore.filter(allRecords => allRecords.userFullName.toLowerCase().includes(`${userInput.toLowerCase().trim()}`)).map((obj,idx) => (
          <div className="searched-item">
            <div style={{padding:"0 1rem"}} onClick={getUser} data-usercode={obj.userCode}>
              {obj.userFullName}
            </div>
          </div>
        ))}
      </DisplayFilter> }
    </div>
  );
};

export {
  InputPlaceholder,
  DisplayFilter,
  Input,
  SearchInput
};
