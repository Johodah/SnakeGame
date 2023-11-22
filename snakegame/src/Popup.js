import React, { useState, useEffect } from "react";
import "./Popup.css";
const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);// en useState för popup 
  const [username, setUsername] = useState("");// en useState för username
  const [score, setScore] = useState(0);// en useState för score
  useEffect(() => { // här använder jag useEffect function för att hämta username och score  
    const savedUser = JSON.parse(localStorage.getItem("userName")) || "";
    const savedScore = JSON.parse(localStorage.getItem("score")) || 0;
    setUsername(savedUser);// sätta det hämtade datan i setUsername i useState[skicka in den till setUsername]
    setScore(savedScore);// samma sak
  }, []);
  const handleUserName = (e) => {
    const value = e.target.value; // handleusername för att hämta den värdet som användaren skirver
    setUsername(value);
  };
  const togglePopup = () => {
    setIsVisible(!isVisible) //popup  e aktiv 
  };
// här så använder jag en handle för att spara score i lokal storage, sedan ska jag skapa en knapp som tar den function som onClick för att spara score
  const handleSaveScore = () => {
    const savedScore = JSON.parse(localStorage.getItem("score")) || 0;// Hämta det nuvarande poäng värdet från localStorage
    setIsVisible(false);// Stänger popupen
  };
  return (
    //skapar en form för inmatningen på namnet
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
      {/* knappen som trigger i gång popup [sättas till ture] */}
      <button onClick={togglePopup}>Se Highscore</button> 
      {isVisible && (
        <div className="popup">
          <div className="popup-content">
            <h2>HighScore</h2>
            <p>
              {username} : {score}{/* hämtar username och score från lokal lagring   */}
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
 * popup ska visa namnet på spelaren och dess poäng som de fick
 * 
 */