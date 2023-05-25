import classnames from "classnames";
import React from "react";

const Card = ({ value, setIdentity, index, identity }) => {
  return (
    <div
      className={classnames({
        card: true,
        activeCard: identity === index,
      })}
      onClick={() => {
        setIdentity(index);
        console.log("hey");
      }}
    >
      {value}
    </div>
  );
};

export default Card;
