import React, { useCallback, useContext, useEffect } from "react";
import SingleKey from "./SingleKey";
import { WordleContext } from "../App";

const Keyboard = () => {
  const { onDeleteLetter, onEnterLetter, onLetterClick, disabledLetters } =
    useContext(WordleContext);

  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback((event) => {
    if (event.key === "Enter") {
      onEnterLetter();
    } else if (event.key === "Backspace") {
      onDeleteLetter();
    } else {
      keys1.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onLetterClick(key);
        }
      });
      keys2.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onLetterClick(key);
        }
      });
      keys3.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onLetterClick(key);
        }
      });
    }
  });

  useEffect(() => {
    // detect keyboard events in react
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keys1.map((key, index) => {
          return (
            <SingleKey
              keyValue={key}
              key={index}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
      </div>
      <div className="line2">
        {keys2.map((key, index) => {
          return (
            <SingleKey
              keyValue={key}
              key={index}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
      </div>
      <div className="line3">
        <SingleKey keyValue={"ENTER"} bigKey />
        {keys3.map((key, index) => {
          return (
            <SingleKey
              keyValue={key}
              key={index}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
        <SingleKey keyValue={"DELETE"} bigKey />
      </div>
    </div>
  );
};

export default Keyboard;
