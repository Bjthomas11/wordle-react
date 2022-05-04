import React, { useContext } from "react";
import { WordleContext } from "../App";

const SingleKey = ({ keyValue, bigKey, disabled }) => {
  const { onDeleteLetter, onEnterLetter, onLetterClick } =
    useContext(WordleContext);

  const letterClick = () => {
    if (keyValue === "ENTER") {
      onEnterLetter();
    } else if (keyValue === "DELETE") {
      onDeleteLetter();
    } else {
      onLetterClick(keyValue);
    }
  };
  return (
    <div
      className="key"
      id={bigKey ? "big" : disabled && "disabled"}
      onClick={letterClick}
    >
      {keyValue}
    </div>
  );
};

export default SingleKey;
