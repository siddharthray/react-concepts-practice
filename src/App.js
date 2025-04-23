import React from "react";

export default function Counter() {
  const initialCount = 0;
  const [count, setCount] = React.useState(initialCount);

  const handleClick = (operation) => {
    if (operation === "+") {
      setCount((prev) => prev + 1);
    } else if (operation === "-") {
      if (count === 0) {
        return;
      }
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div>
      <h1>Counter</h1>
      <h2>{count}</h2>
      <p>You clicked {count} times</p>
      <button onClick={() => handleClick("+")}>Add</button>
      <button disabled={count <= 0} onClick={() => handleClick("-")}>
        Subtract
      </button>
      <button onClick={() => setCount(initialCount)}>Reset</button>
    </div>
  );
}
