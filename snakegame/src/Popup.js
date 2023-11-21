import React, { useState, useEffect } from "react";
import "./Popup.css";

const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userName")) || "";
    const savedScore = JSON.parse(localStorage.getItem("score")) || 0;

    setUsername(savedUser);
    setScore(savedScore);
  }, []);

  const handleUserName = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const togglePopup = () => {
    setIsVisible(!isVisible);
  };

  const handleSaveScore = () => {
    // Hämta det nuvarande poängvärdet från localStorage
    const savedScore = JSON.parse(localStorage.getItem("score")) || 0;
    // Stänger popupen
    setIsVisible(false);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          id="user_name"
          placeholder="Skriv ditt namn"
          value={username}
          onChange={handleUserName}
        />
      </form>
      <button onClick={togglePopup}>Se Highscore</button>
      {isVisible && (
        <div className="popup">
          <div className="popup-content">
            <h2>HighScore</h2>
            <p>
              {username} : {score}
            </p>
            <button onClick={handleSaveScore}>Spara HighScore</button>
            <button onClick={togglePopup}>Stäng av HighScore</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
/**
 * skapat en component  för popup 
 * skapa en togglepopup för att stänga och öppna popup
 * 
 */