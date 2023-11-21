import React, { Component } from "react";
import Snake from "./Snake";
import Food from "./Food";
import Menu from "./Menu";
import Button from "./Button";
import Settings from "./Settings";
import "./Settings.css";
import "./App.css";
import "./index.css";


const getRandomFood = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const initialState = {
  food: getRandomFood(),
  direction: "RIGHT",
  speed: 100,
  route: "menu",
  snakeDots: [[0, 0], [0, 2]]
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      ...initialState,
      lightMode: false,
      useWASD: false
    };

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    this.moveInterval = setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentWillUnmount() {
    clearInterval(this.moveInterval);
  }

  componentDidUpdate() {
    this.onSnakeOutOfBounds();
    this.onSnakeCollapsed();  // Fixed typo here
    this.onSnakeEats();
  }

  onKeyDown = (e) => {
    e = e || window.Event;
    const { direction } = this.state;
    let newDirection;
  
    switch (e.keyCode) {
      case 37:
        newDirection = "LEFT";
        break;
      case 38:
        newDirection = "UP";
        break;
      case 39:
        newDirection = "RIGHT";
        break;
      case 40:
        newDirection = "DOWN";
        break;
      default:
        return;
    }
  
    // Check if the new direction is opposite to the current direction
    if (
      (direction === "LEFT" && newDirection === "RIGHT") ||
      (direction === "RIGHT" && newDirection === "LEFT") ||
      (direction === "UP" && newDirection === "DOWN") ||
      (direction === "DOWN" && newDirection === "UP")
    ) {
      return;
    }
  
    this.setState({ direction: newDirection });
  };
  

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
        case "UP":
          head = [head[0], head[1] - 2];
          break;
        case "DOWN":
          head = [head[0], head[1] + 2];
          break;
        default:
          break;
      }
      dots.push(head);
      dots.shift();
      this.setState({
        snakeDots: dots
      });
    }
  };

  onSnakeOutOfBounds = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (this.state.route === "game") {
      if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
        this.gameOver();
      }
    }
  };

  onSnakeCollapsed = () => {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.gameOver();
      }
    });
  };

  onSnakeEats = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomFood()
      });
      this.increaseSnake();
      this.increaseSpeed();
    }
  };

  increaseSnake = () => {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake
    });
  };

  increaseSpeed = () => {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 20
      });
    }
  };

  onRouteChange = () => {
    this.setState({
      ...initialState,
      route: "game"
    });
  };

  gameOver = () => {
    const score = this.state.snakeDots.length - 2;
    window.alert(`GAME OVER! Your score is ${score}`);
    clearInterval(this.moveInterval);
    this.setState({
      ...initialState,
      route: "menu",
    });
    };

  onDown = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0], head[1] + 2];
    dots.push(head);
    dots.shift();
    this.setState({
      direction: "DOWN",
      snakeDots: dots
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
      snakeDots: dots
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
      snakeDots: dots
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
      snakeDots: dots
    });
  };

  toggleLightMode = () => {
    this.setState((prevState) => ({
      lightMode: !prevState.lightMode
    }));
  };

  toggleArrowKeys = () => {
    this.setState((prevState) => ({
      useWASD: !prevState.useWASD
    }));
  };

  render() {
    const { route, snakeDots, food, lightMode, useWASD } = this.state;

    return (
      <div className={lightMode ? 'light-mode' : ''}>
        {route === "menu" ? (
          <div>
            <Menu onRouteChange={this.onRouteChange} />
          </div>
        ) : (
          <div>
            <Settings
              lightMode={lightMode}
              onToggleLightMode={this.toggleLightMode}
              onToggleArrowKeys={this.toggleArrowKeys}
            />

            <div className="game-area">
              <Snake snakeDots={snakeDots} />
              <Food dot={food} />
            </div>

            {route === "game" && (
              <Button
                onDown={this.onDown}
                onLeft={this.onLeft}
                onRight={this.onRight}
                onUp={this.onUp}
                isVisible={!useWASD}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
  
export default App;
