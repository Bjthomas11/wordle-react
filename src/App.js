import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import Nav from "./components/Nav";
import { boardDefaultMatrix, generateWordSet } from "./Words";
import { createContext } from "react";
import GameOver from "./components/GameOver";

export const WordleContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefaultMatrix);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPosition: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [correctWord, setCorrectWord] = useState("");

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onLetterClick = (keyValue) => {
    if (currentAttempt.letterPosition > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition] = keyValue;
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition + 1,
    });
  };

  const onDeleteLetter = () => {
    if (currentAttempt.letterPosition === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition - 1,
    });
  };

  const onEnterLetter = () => {
    if (currentAttempt.letterPosition !== 5) return;
    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += board[currentAttempt.attempt][i];
    }
    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({
        attempt: currentAttempt.attempt + 1,
        letterPosition: 0,
      });
    } else {
      alert("Word not found");
    }

    if (currentWord === correctWord) {
      setGameOver({
        gameOver: true,
        guessedWord: true,
      });
      return;
    }
    if (currentAttempt.attempt === 5) {
      setGameOver({
        gameOver: true,
        guessedWord: false,
      });
    }
  };
  return (
    <div className="wordle-container">
      <Nav />
      <WordleContext.Provider
        value={{
          board,
          setBoard,
          currentAttempt,
          setCurrentAttempt,
          onDeleteLetter,
          onEnterLetter,
          onLetterClick,
          correctWord,
          setDisabledLetters,
          disabledLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
          {correctWord}
        </div>
      </WordleContext.Provider>
    </div>
  );
}

export default App;
