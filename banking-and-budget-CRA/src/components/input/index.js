import React from "react";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import PasswordIcons from "../passwordIcons";

const InputPlaceholder = ({ display, deactivate = false }) => {
  const [placeholderDisplay, setPlaceholderDisplay] = useState(display);
  return (
    <div className="input-placeholder">
      <label
        id="target"
        for="userNameInput"
        autoCorrect="off"
        autoComplete="off"
      >
        {!deactivate ?  `${placeholderDisplay}` : "Disabled"}
      </label>
    </div>
  );
};

const Input = ({
  name,
  email = false,
  password = false,
  number = false,
  text = true,
  required = false,
  deactivate = false,
  placeholderText = "Enter Data Here",
  min = 0,
  max = 10,
}) => {
  const [userInput, setUserInput] = useState("");
  const [isValid, setIsValid] = useState({ show: false, message: "" });
  const prevInputRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    number && isValidRange(userInput);
    prevInputRef.current = userInput;
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
    number && !isValidNumber(Input) && setUserInput(prevInputRef.current);
    password &&
      (setIsValid({show: isValidPassword(Input),
        message:
          "Must contain at least 1 lower and uppercase character, 1 numeric character, 1 special character, and at least 8 characters",
      }));

    !email && !number && !password && setIsValid({show: true, message: null}) ;
    setUserInput(Input);
  };

  const isValidPassword = (input) => {   
    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");    
    return strongRegex.test(input)
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
    <div name = {`div${name}`} className="input-container">
      <input
        name = {name}
        data-inputname ={name}
        className="input-container__textbox"
        type={!password ? "text" : showPassword ? "text" : "password"}
        placeholder=" "
        value={userInput}
        onChange={onChangeInput}
        autoComplete="off"
        autoCorrect="off"
      ></input>
       <InputPlaceholder
        display={placeholderText}
        deactivate={deactivate}
      />
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
};

export { Input, InputPlaceholder};
