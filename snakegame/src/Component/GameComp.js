import React, {  } from "react";
import Button from "./Button";
import Snake from "./Snake";
import Food from "./Food";

const GameComponent = ({
  snakeDots,
  food,
  lightMode,
  controlScheme,
  onDown,
  onLeft,
  onRight,
  onUp,
}) => {
  return (
    <div>
      <Button onDown={onDown} onLeft={onLeft} onRight={onRight} onUp={onUp} />
      <div className={`game-area ${lightMode ? "light-mode" : ""}`}>
        <Snake snakeDots={snakeDots} lightMode={lightMode} />
        <Food dot={food} lightMode={lightMode} />
      </div>
      
    </div>
  );
};

export default GameComponent;
