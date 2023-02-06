import { useState } from "react";

const ControlButtons = () => {
  const [flipButton, setFlipButton] = useState<"Show" | "Repeat">("Show");
  const isShowFlipState = flipButton === "Show";

  return (
    <div className="btn-group">
      <button
        className={`${
          isShowFlipState ? "btn" : "btn-active"
        } btn-wide rounded-lg`}
        onClick={() =>
          isShowFlipState ? setFlipButton("Repeat") : setFlipButton("Show")
        }
      >
        {flipButton}
      </button>
      <button className="btn-disabled btn">Ok</button>
    </div>
  );
};
export default ControlButtons;
