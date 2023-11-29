import React from "react";

const Food = ({ dot, lightMode }) => {
  const style = {
    left: `${dot[0]}%`,
    top: `${dot[1]}%`,
  };
  return (
    <div className={`food ${lightMode ? "light-mode" : ""}`} style={style} />
  );
};

export default Food;