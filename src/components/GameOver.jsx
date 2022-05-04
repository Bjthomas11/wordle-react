import React, { useContext } from "react";
import { WordleContext } from "../App";

const GameOver = () => {
  const { gameOver, correctWord, currentAttempt } = useContext(WordleContext);
  return (
    <div className="gameOver">
      <h3>
        {gameOver.guessedWord
          ? "You guessed right! YAY!"
          : "You failed to guess the word. Game Over!"}
      </h3>
      <h1>Correct Word: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>You guessed in {currentAttempt.attempt} attempts</h3>
      )}
    </div>
  );
};

export default GameOver;
