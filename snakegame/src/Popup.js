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
    onHighscoreSubmit();
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

/**
 * skapat en component  för popup 
 * skapa en togglepopup för att stänga och öppna popup
 * popup ska visa namnet på spelaren och dess poäng som de fick
 * import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
const superSeriousAuthentication = {
  isAuthenticated: false,
  login: () => {
    superSeriousAuthentication.isAuthenticated = true;
  },
  logout: () => {
    superSeriousAuthentication.isAuthenticated = false;
  }
};
const Home = () => <h2>Home</h2>;
const Dashboard = ({ setIsAuthenticated }) => (
  <div>
    <h2>Dashboard</h2>
    <button onClick={() => {
      superSeriousAuthentication.logout();
      setIsAuthenticated(false);
    }}>Logout</button>
  </div>
);
const Login = ({ setIsAuthenticated }) => (
  <div>
    <h2>Login</h2>
    <button
      onClick={() => {
        superSeriousAuthentication.login();
        setIsAuthenticated(true);
      }}
    >
      Login
    </button>
  </div>
);
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(superSeriousAuthentication.isAuthenticated);
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};
export default App;

 */