import React, { useState, useEffect } from "react";
import "./Popup.css";
const Popup = ({onHighscoreSubmit}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [buttonhasClicked, setbuttonhasClicked] = useState(false);
  useEffect(() => {
    //  hämta username och sparade poäng i lokal lagring 
    //score har vi redan sparat i APP.js och här hämtar jag den för att sedan sätter den med username
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const savedScore = JSON.parse(localStorage.getItem("score")) || 0;
    setUsername(""); // här tömmar jag setusername(återsäller)
    setScore(savedScore);//spara savedScore i useState (array) 
  }, []);
  const handleUserName = (e) => {
    setUsername(e.target.value);//funktion som jag ska använda för att spara username i UseState() 
    //jag använder setusername för att uppdatera värdet på username direkt
  };
  const handleSaveScore = () => {
    if(!buttonhasClicked){
      if(username.length >= 3 && username.length <= 15){
    const existingScores = JSON.parse(localStorage.getItem("scores")) || [];
    const newScore = { username, score };// här spara username och den aktuella  score med username som jag har
    const updatedScores = [...existingScores, newScore];// här förhindrar jag useState från att skriva över den gammla värdet
    updatedScores.sort((a, b) => b.score - a.score);// jag använda mig av sort för att sortera listan så den som får högre poäng hämar först. 
    console.log(updatedScores);
    localStorage.setItem("scores", JSON.stringify(updatedScores));
    setbuttonhasClicked(true);// jag disable button från att klickas på eftersom du har redan sparat ditt namn & poängen.
    onHighscoreSubmit();// här har vi fixat en funktion för att skicka tillbaka hos till start menu
    //efter att vi har skickat in rätt data med username. 
    }else{
      alert("Please enter username");
    }
  }
    setUsername("");
    setIsVisible(false);
  };
  const togglePopup = () => {
    setIsVisible(!isVisible);
    console.log("hej från tagglePopup");
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
            <ol>
              {JSON.parse(localStorage.getItem("scores") || "[]").map((entry, index) => (
                <li key={index}>{entry.username} : {entry.score}</li>
              ))}
            </ol>
            <button onClick={handleSaveScore} disabled={buttonhasClicked}>Spara HighScore</button>
            <button onClick={togglePopup}>Stäng av HighScore</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Popup;