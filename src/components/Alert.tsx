import React, { useState } from "react";
import { useTimeout } from "usehooks-ts";

const Alert = ({
  message,
  status,
}: {
  message: string;
  status: "error" | "success" | "warning";
}) => {
  const [visible, setVisible] = useState(true);

  const hide = () => setVisible(false);

  useTimeout(hide, 2000);

  return visible ? (
    <div className={`alert alert-${status} absolute w-2/6 shadow-lg `}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  ) : null;
};

export default Alert;
