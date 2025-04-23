import React, { useState, useCallback } from "react";

export default function Counter({ initialCount = 0, step = 1 }) {
  const [count, setCount] = useState(initialCount);

  // Core updater, memoized once
  const updateCount = useCallback((delta) => {
    setCount((prev) => {
      const next = prev + delta;
      return next < 0 ? prev : next;
    });
  }, []);

  // Handlers memoized based on updateCount & step
  const handleIncrement = useCallback(
    () => updateCount(step),
    [updateCount, step]
  );

  const handleDecrement = useCallback(
    () => updateCount(-step),
    [updateCount, step]
  );

  const handleReset = useCallback(() => setCount(initialCount), [initialCount]);

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <h1>Counter</h1>
      <h2>{count}</h2>
      <button onClick={handleIncrement}>Add</button>
      <button onClick={handleDecrement} disabled={count === 0}>
        Subtract
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
