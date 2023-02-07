import React, { useEffect, useState } from "react";

const Loader = () => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (counter >= 100) setCounter(0);
    const interval = setInterval(() => setCounter(counter + 1), 10);

    return () => clearInterval(interval);
  }, [counter]);

  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div
            className="radial-progress text-2xl"
            style={{
              "--value": counter,
              "--size": "12rem",
              "--thickness": "2rem",
            }}
          >
            {`${counter} %`}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Loader;
