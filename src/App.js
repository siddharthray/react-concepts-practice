import React, { useState } from "react";

export default function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);

  const updateCount = (delta) => {
    setCount((prev) => {
      const next = prev + delta;
      return next < 0 ? prev : next;
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <h1>Counter</h1>
      <h2>{count}</h2>
      <button onClick={() => updateCount(1)}>Add</button>
      <button onClick={() => updateCount(-1)} disabled={count === 0}>
        Subtract
      </button>
      <button onClick={() => setCount(initialCount)}>Reset</button>
    </div>
  );
}
