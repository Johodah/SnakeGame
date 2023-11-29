import React from "react";
import "./Button.css";
import "./App.css"
import App from "./App"

const Start = ({ onRouteChange }) => {
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

export default Start;