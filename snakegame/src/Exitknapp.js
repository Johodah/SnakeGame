import React from "react";

const ExitKnapp = ({ onExit }) => {
  return (
    <div>
      <button id="exit" onClick={onExit}>
        EXIT
      </button>
    </div>
  );
};

export default ExitKnapp;
