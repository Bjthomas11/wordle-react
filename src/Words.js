// words functions
import wordBank from "./wordle-bank.txt";

export const boardDefaultMatrix = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;
  await fetch(wordBank)
    .then((res) => res.text())
    .then((result) => {
      const wordArray = result.split("\n");
      todaysWord = wordArray[Math.floor(Math.random() * wordArray.length)];
      wordSet = new Set(wordArray);
      console.log(todaysWord);
    });

  return { wordSet, todaysWord };
};
