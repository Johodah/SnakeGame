import React from "react";

const Snake = ({ snakeDots, lightMode }) => (
  <div>
    {snakeDots.map((dot, i) => {
      const style = {
        left: `${dot[0]}%`,
        top: `${dot[1]}%`,
      };
      return (
        <div
          className={`snake ${lightMode ? "light-mode" : ""}`}
          key={i}
          style={style}
        />
      );
    })}
  </div>
);

export default Snake;