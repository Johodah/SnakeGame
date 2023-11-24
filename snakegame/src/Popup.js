import React, { useState, useEffect, Context } from "react";
import "./Popup.css";
const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);// en useState för popup 
  const [username, setUsername] = useState("");// en useState för username
  const [score, setScore] = useState(0);// en useState för score
  useEffect(() => { // här använder jag useEffect function för att hämta username och score  
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const savedScore = JSON.parse(localStorage.getItem("score")) || 0;
    // setUsername(savedUser);// sätta det hämtade datan i setUsername i useState[skicka in den till setUsername]
    // const isUsernameExists  = existingUsers.some(user => user.username === username);
    // if (isUsernameExists) {
      
    // } else {
    //   // Lägg till det nya 
    //   const newUser = { username };// här skapar jag en variable som sparar username
    //   const updatedUsers = [...existingUsers, newUser]; // och sedan updatera user 
    //   // Spara den uppdaterade användarlistan i localStorage
    //   localStorage.setItem('users', JSON.stringify(updatedUsers));
    //   // Återställ inputfälten
    //   setUsername('');
    // }
    // console.log(setUsername);
    // setScore(savedScore);// samma sak
  }, []);
  const handleUserName = (e) => {
    const value = e.target.value; // handleusername för att hämta den värdet som användaren skirver
    const existingUsers = JSON.parse(localStorage.getItem('users')) || "";
    const isUsernameExists  = existingUsers.some(user => user.username === username);
    if (isUsernameExists) {
      
    } else {
      // Lägg till det nya 
      const newUser = { username };// här skapar jag en variable som sparar username
      const updatedUsers = [...existingUsers, newUser]; // och sedan updatera user 
      // Spara den uppdaterade användarlistan i localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      // Återställ inputfälten
      setUsername('updatedUsers');
      console.log(setUsername);
    }
    setUsername();
  };
  const togglePopup = () => {
    setIsVisible(!isVisible) //popup  e aktiv 
  };
// här så använder jag en handle för att spara score i lokal storage, sedan ska jag skapa en knapp som tar den function som onClick för att spara score
  const handleSaveScore = () => {
    const savedScore = JSON.parse(localStorage.getItem("score")) || 0;// Hämta det nuvarande poäng värdet från localStorage
    localStorage.setItem("username", JSON.stringify( username)) ;
    
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
            <ul>
              {username} : {score}{/* hämtar username och score från lokal lagring   */}
            </ul>
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