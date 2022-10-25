import React, { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  const reduceCounter = () => {
    setCounter((prevCounter) => prevCounter - 1);
  };

  const increaseCounter = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };
  return (
    <div>
      <button onClick={reduceCounter}>-</button>
      <label>{counter}</label>
      <button onClick={increaseCounter}>+</button>
    </div>
  );
};

export default Counter;
