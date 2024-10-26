import { WORDS } from "../constants/words.ts";

export const generateTypingWords = (wordsCount = 100) => {
  const words = [];
  for (let i = 0; i < wordsCount; i++) {
    words.push(getRandomWord());
  }

  return words.join(" ");
};

export const getRandomWord = () => {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
};
