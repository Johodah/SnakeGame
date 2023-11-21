import React from "react";

const Settings = ({darkMode, onToggleDarkMode, onToggleArrowKeys }) => {
    return (
        <div>
            <h2>Settings</h2>
            <div>
                <label>
                    Dark Mode 
                    <input 
                    type="checkbox"
                    checked={darkMode}
                    onChange={onToggleDarkMode}
                    />
                </label>
            </div>
        </div>
    );
};

export default Settings;