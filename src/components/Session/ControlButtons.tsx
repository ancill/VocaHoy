import { useState } from "react";

const ControlButtons = () => {
  const [flipButton, setFlipButton] = useState<"Show" | "Repeat">("Show");

  return (
    <div className="btn-group">
      <button
        className="btn btn-active"
        onClick={() =>
          flipButton === "Show"
            ? setFlipButton("Repeat")
            : setFlipButton("Show")
        }
      >
        {flipButton}
      </button>
      <button className="btn-disabled btn">Ok</button>
    </div>
  );
};
export default ControlButtons;
