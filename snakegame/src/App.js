import React, { Component } from "react";
import Snake from "./Snake";
import Food from "./Food";
import Menu from "./Menu";
import Button from "./Button";
import Settings from "./Settings";

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
      darkMode: false,
      useWASD: false
    };
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
      route: "game"
    });
  };

  gameOver = () => {
    const score = this.state.snakeDots.length - 2;
    window.alert(`GAME OVER! Your score is ${score}`);
    clearInterval(this.moveInterval);
    this.setState(initialState);
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

  toggleDarkMode = () => {
    this.setState((prevState) => ({
      darkMode: !prevState.darkMode
    }));
  };

  toggleArrowKeys = () => {
    this.setState((prevState) => ({
      useWASD: !prevState.useWASD
    }));
  };

  render() {
    const { route, snakeDots, food, darkMode, useWASD } = this.state;
    return (
      <div>
        {route === "menu" ? (
          <div>
            <Menu onRouteChange={this.onRouteChange} />
          </div>
        ) : (
          <div>
            <div className={darkMode ? "dark-game-area" : "game-area"}>
              <Snake snakeDots={snakeDots} />
              <Food dot={food} />
            </div>
            {/* Conditionally render buttons only when the game is being played */}
            {route === "game" && (
              <Button
                onDown={this.onDown}
                onLeft={this.onLeft}
                onRight={this.onRight}
                onUp={this.onUp}
                isVisible={!useWASD}
              />
            )}
            {/* Add the Settings component */}
            <Settings
              darkMode={darkMode}
              onToggleDarkMode={this.toggleDarkMode}
              onToggleArrowKeys={this.toggleArrowKeys}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
