import React from "react";
import "./Button.css";
import "./App.css"

const Menu = ({ onRouteChange }) => {
    return (
        <div className="wrapper">
            <div>
                <button
                    onClick={onRouteChange}
                    className="start"
                    type="button"
                    value="start game"
                    
                    >Start</button>
            </div>
        </div>
    );
};

export default Menu;