import React, { useState } from "react";
import { GURMUKHI_LETTERS } from "./utils/constants.ts";

function TransliterationQuizPage() {
  const [currentLetter, setCurrentLetter] = useState(getRandomLetter());
  const [message, setMessage] = useState("");

  function getRandomLetter() {
    return GURMUKHI_LETTERS[
      Math.floor(Math.random() * GURMUKHI_LETTERS.length)
    ];
  }

  function checkAnswer(selectedTransliteration: string) {
    if (selectedTransliteration === currentLetter.transliteration) {
      setMessage("Correct!");
    } else {
      setMessage("Try again!");
    }
  }

  function nextQuestion() {
    setMessage("");
    setCurrentLetter(getRandomLetter());
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-50">
        Transliteration Quiz
      </h2>
      <p className="text-xl text-center mb-4">
        {currentLetter.transliteration}
      </p>
      <div className="grid grid-cols-4 gap-4">
        {GURMUKHI_LETTERS.map((letter, index) => (
          <button
            key={index}
            onClick={() => checkAnswer(letter.transliteration)}
            className="p-4 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700"
          >
            {letter.letter}
          </button>
        ))}
      </div>
      <p className="mt-4 text-center text-lg text-gray-900 dark:text-gray-50">
        {message}
      </p>
      <button
        onClick={nextQuestion}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded shadow-md hover:bg-green-700"
      >
        Next
      </button>
    </div>
  );
}

export default TransliterationQuizPage;
