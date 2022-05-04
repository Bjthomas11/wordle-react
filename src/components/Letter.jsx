import React, { useContext, useEffect } from "react";
import { WordleContext } from "../App";

const Letter = ({ letterPosition, attemptValue }) => {
  const { board, correctWord, currentAttempt, setDisabledLetters } =
    useContext(WordleContext);
  const letter = board[attemptValue][letterPosition];

  const correct = correctWord.toUpperCase()[letterPosition] === letter;
  const almost = !correctWord && letter !== "" && correctWord.includes(letter);
  const letterState =
    currentAttempt.attempt > attemptValue &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currentAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;
