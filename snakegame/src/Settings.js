import React from "react";

const Settings = ({ lightMode, onToggleLightMode, onToggleArrowKeys }) => {
  return (
    <div>
      <h2>Settings</h2>
      <div>
        <label>
          Light Mode
          <input
            type="checkbox"
            checked={lightMode}
            onChange={onToggleLightMode}
          />
        </label>
      </div>
    </div>
  );
};

export default Settings;
