import React, { useState, useEffect, useRef } from "react";

export default function Typewriter({ 
  display = "Typewriter Text",
  speed = 100,
  uniqueID = false,
  deactivate = false
}) {
  const [placeholder, setPlaceholder] = useState(display);
  const [writePlaceholder, setWritePlacholder] = useState(true);
  const myInterval = useRef();

  const hashCode = (anyString) => {
    var hash = 0,
      i,
      chr;
    if (anyString.length === 0) return hash;
    for (i = 0; i < anyString.length; i++) {
      chr = anyString.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; 
    }
    return hash.toString();
  }

  let exclusiveComponentID = hashCode(uniqueID ? uniqueID : display + speed);

  useEffect(() => {    
    intervalTrigger();
  }, [writePlaceholder]);

  const intervalTrigger = () => {
    clearInterval(myInterval.current);
    if (deactivate) return
    if (writePlaceholder) {
      myInterval.current = setInterval(DisplayPlaceholder, speed);
    } else {
      myInterval.current = setInterval(ErasePlaceholder, speed);
    }
  }

  const DisplayPlaceholder = () => {
    try {
      let targetEl = document.querySelector(
        `[data-id="${exclusiveComponentID}"]`
      );
      if (targetEl.innerHTML.length !== placeholder.length) {
        targetEl.innerHTML += placeholder[targetEl.innerHTML.length];
      } else {
        setWritePlacholder(!writePlaceholder);
      }
    } catch {
      clearInterval(myInterval.current);
    }
  }

  const ErasePlaceholder = () => {
    try {
      let targetEl = document.querySelector(
        `[data-id="${exclusiveComponentID}"]`
      );
      if (targetEl.innerHTML.length === 0) {
        setWritePlacholder(!writePlaceholder);
        targetEl.innerHTML = "";
      }
      targetEl.innerHTML = targetEl.innerHTML.slice(0, -1);
    } catch {
      clearInterval(myInterval.current);
    }
  }

  return (
    <div className="typing-placeholder">
      <label
        id="target"
        htmlFor="userNameInput"
        autoCorrect="off"
        autoComplete="off"
        data-id={exclusiveComponentID}
      >{deactivate && "Disabled"}</label>
    </div>
  );
}
