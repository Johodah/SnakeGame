import React, { Component, useRef} from "react";
import Snake from "./Snake";
import Food from "./Food";
import Button from "./Button";
import Menu from "./menu";
import Homepage from './Homepage';
// import Highscore from './Highscoreknapp';
import StartButton from './Startknapp';
import ExitButton from './Exitknapp';
import Popup from "./Popup";
import "./App.css";
import "./index.css";
import GameComponent from "./GameComp";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';




const getRandomFood = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

class App extends Component {
  loadLightModePref = () => {
    const storedPreference = localStorage.getItem("lightMode");
    return storedPreference ? JSON.parse(storedPreference) : false;
  };

  saveLightModePref = (isLightMode) => {
    localStorage.setItem("lightMode", JSON.stringify(isLightMode));
  };

  loadControls = () => {
    const storedPreference = localStorage.getItem("controlScheme");
    return storedPreference || "arrows";
  };

  saveControls = (controlScheme) => {
    localStorage.setItem("controlScheme", controlScheme);
  };

  constructor() {
    super();
    this.state = {
      food: getRandomFood(),
      direction: "RIGHT",
      speed: 100,
      route: "menu",
      snakeDots: [[0, 0], [0, 2]],
      lightMode: this.loadLightModePref(),
      controlScheme: this.loadControls(),
      score:0
    };
  }

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  componentDidUpdate() {
    this.onSnakeOutOfBounds();
    this.onSnakeCollapsed();
    this.onSnakeEats();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    const { controlScheme } = this.state;

    switch (controlScheme) {
      case "arrows":
        this.handleArrowKeys(e);
        break;
      case "wasd":
        this.handleWASDKeys(e);
        break;
      default:
        break;    
    }
  };

  handleArrowKeys = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      default:
        break;
    }
  };

  handleWASDKeys = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 65:
        this.setState({ direction: "LEFT" });
        break;
      case 87:
        this.setState({ direction: "UP" });
        break;
      case 68:
        this.setState({ direction: "RIGHT" });
        break;
      case 83:
        this.setState({ direction: "DOWN" });
        break;
      default:
        break;
    }
  };

  handleKeyPress = (e) => {
    e = e || window.event;
    const { route, controlScheme } = this.state;

    if (e.keyCode === 27) {
      this.togglePause();
    }
  

  if (e.key === 'l' || e.key === 'L') {
    this.toggleLightMode();
  }

  const validControlKeys = ['w', 'a', 's', 'd', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown'];
  
  if (validControlKeys.includes(e.key)) {
    const isOppositeControlScheme = 
      (controlScheme === 'arrows' && validControlKeys.slice(0, 4).includes(e.key.toLowerCase())) ||
      (controlScheme === 'wasd' && validControlKeys.slice(4).includes(e.key))
    
    
    if (isOppositeControlScheme) {
      this.toggleControlScheme();
    } 
  }
};/// STop

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];
    if (this.state.route === "game") {
      switch (this.state.direction) {
        case "RIGHT":
          head = [head[0] + 2, head[1]];
          break;
        case "LEFT":
          head = [head[0] - 2, head[1]];
          break;
        case "DOWN":
          head = [head[0], head[1] + 2];
          break;
        case "UP":
          head = [head[0], head[1] - 2];
          break;
        default:
          break;
      }
      dots.push(head);
      dots.shift();
      this.setState({
        snakeDots: dots,
      });
    }
  };

  onSnakeOutOfBounds() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (this.state.route === "game") {
      if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
        this.gameOver();
      }
    }
  }

  onSnakeCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.gameOver();
      }
    });
  }

  onSnakeEats() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomFood(),
      });
      this.increaseSnake();
      this.increaseSpeed();
      this.setState((prevState) => {
        let newScore = prevState.score + 10;
        if (newScore >= 100) {
          newScore -= 5;
        }
        localStorage.setItem("score", newScore);
        return {
          score: newScore,
        };
      });
      
    }
  }

  increaseSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 20,
      });
    }
  }

  onRouteChange = () => {
    this.setState({
      route: "game",
    });
  };

  gameOver() {
    this.setState({
      food: getRandomFood(),
      direction: "RIGHT",
      speed: 100,
      route: "Popup",
      snakeDots: [[0, 0], [0, 2]],
      lightMode: this.loadLightModePref(),
      
    });
  }

  onDown = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0], head[1] + 2];
    dots.push(head);
    dots.shift();
    this.setState({
      direction: "DOWN",
      snakeDots: dots,
    });
  };

  onUp = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0], head[1] - 2];
    dots.push(head);
    dots.shift();
    this.setState({
      direction: "UP",
      snakeDots: dots,
    });
  };

  onRight = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0] + 2, head[1]];
    dots.push(head);
    dots.shift();
    this.setState({
      direction: "RIGHT",
      snakeDots: dots,
    });
  };

  onLeft = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];
    head = [head[0] - 2, head[1]];
    dots.push(head);
    dots.shift();
    this.setState({
      direction: "LEFT",
      snakeDots: dots,
    });
  };

  toggleLightMode = () => {
    this.setState(
      (prevState) => ({
        lightMode: !prevState.lightMode,
      }),
      () => {
        this.saveLightModePref(this.state.lightMode);
      }
    );
  };

  toggleControlScheme = () => {
    const newScheme = this.state.controlScheme === "arrows" ? "wasd" : "arrows";
    this.setState(
      {
        controlScheme: newScheme,
      },
      () => {
        this.saveControls(newScheme);
      }
    );
  };

  togglePause = () => {
    if (this.state.route === "game") {
      this.setState({
        route: "paused",
      });
    } else if (this.state.route === "paused") {
      this.setState({
        route: "game",
      });
    }
  };

  handleHighscoreSubmit = () => {
    this.setState({
      route: "menu",
    })
  };

  render() {
    const { route, snakeDots, food, lightMode, controlScheme } = this.state;
    const LightMode = lightMode;
    const ControlButton = controlScheme === "arrows" || controlScheme === "wasd";
    const GamePaused = route === "menu" || route === "paused";

    return (
      <div className="mainContainer"> 
        <Homepage />
        <div className="Controlls">
        <button
          className={`toggle-light-mode-button ${LightMode ? "light-mode-button" : ""}`}
          id ="light" onClick={this.toggleLightMode}
        >
          Toggle Light Mode
        </button>

        <button
          className={`control-button ${ControlButton ? "" : "light-mode-button"}`} 
          id ="constrol"onClick={this.toggleControlScheme}
          >
          {controlScheme === "arrows" ? "Arrow Keys" : "WASD"}
        </button>

        <button className={`toggle-pause-button ${GamePaused && route === "game" ?  "light-mode-button" : ""}`} 
          id = "pause"onClick={this.togglePause}
          >
          {route === "game" ? "Pause" : "Resume"}
        </button>
        
        </div>

      <div id="Start-Min" className={LightMode ? "light-mode" : ""}>
        
        {route === "menu" ? (
            <div id="buttons">
            <Menu onRouteChange={this.onRouteChange} /> 
            <ExitButton/>
            </div>
          
        
        ):  route === "Popup" ? (
          <Popup score={this.state.popupScore} onHighscoreSubmit={this.handleHighscoreSubmit}/>
        // ) : route === "game" && (
          
        ) : (
            
            
          <GameComponent
          snakeDots={this.state.snakeDots}
          food={this.state.food}
          lightMode={this.state.lightMode}
          controlScheme={this.state.controlScheme}
          onDown={this.onDown}
          onLeft={this.onLeft}
          onRight={this.onRight}
          onUp={this.onUp}
        />
        
        )}
      </div>
      </div>
    );
  }
};
export default App;  
// function App() {
//   return (      
//     <main className= "main">
//   <Homepage/>
//     <div className="Menu">
//       <div id="buttons">
//       <StartButton></StartButton>
//       <Highscore/>
//       <ExitButton></ExitButton>
//       </div>
//     </div>
//     </main>
//   );
// }


