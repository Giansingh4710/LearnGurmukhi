import React, { useState } from "react";
import { GURMUKHI_LETTERS } from "./utils/constants.ts";

function AudioQuizPage() {
  const [currentLetter, setCurrentLetter] = useState(getRandomLetter());
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [scoreObj, setScoreObj] = useState({ correct: 0, incorrect: 0 });
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  function getRandomLetter() {
    return GURMUKHI_LETTERS[
      Math.floor(Math.random() * GURMUKHI_LETTERS.length)
    ];
  }

  function checkAnswer(selectedLetter) {
    if (selectedLetter === currentLetter.letter) {
      setMessage("Correct!");
      setIsCorrect(true);
    } else {
      setMessage("Try again!");
      setIsCorrect(false);
    }
    setShowModal(true);
  }

  function nextQuestion() {
    setMessage("");
    setShowModal(false);
    setCurrentLetter(getRandomLetter());
  }

  function showAnswer() {
    setMessage(`The correct answer is ${currentLetter.letter}`);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-50">
        Audio Quiz
      </h2>
      <audio src={currentLetter.audioSrc} controls autoPlay ref={audioRef} />
      <details className="mt-4 text-lg text-gray-700 dark:text-gray-300">
        <summary>Transliteration</summary>
        <p>{currentLetter.transliteration}</p>
      </details>
      <div>
        Correct: {scoreObj.correct} Incorrect: {scoreObj.incorrect}
      </div>
      <div className="grid grid-cols-5 gap-4 pt-6">
        {GURMUKHI_LETTERS.map((letter, index) => (
          <button
            key={index}
            onClick={() => checkAnswer(letter.letter)}
            className="p-4 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700"
          >
            {letter.letter}
          </button>
        ))}
      </div>
      <button
        onClick={nextQuestion}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded shadow-md hover:bg-green-700"
      >
        Next
      </button>
      <Modal
        show={showModal}
        message={message}
        isCorrect={isCorrect}
        tryAgain={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
          setShowModal(false);
          setScoreObj((prevScore) => {
            return {
              ...prevScore,
              incorrect: prevScore.incorrect + 1,
            };
          });
        }}
        onNextIfCorrect={() => {
          nextQuestion();
          setScoreObj((prevScore) => {
            return {
              ...prevScore,
              correct: prevScore.correct + 1,
            };
          });
        }}
        onShowAnswer={showAnswer}
      />
    </div>
  );
}

function Modal({
  show,
  message,
  isCorrect,
  tryAgain,
  onNextIfCorrect,
  onShowAnswer,
}: {
  show: boolean;
  message: string;
  isCorrect: boolean;
  tryAgain: () => void;
  onNextIfCorrect: () => void;
  onShowAnswer: () => void;
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-50">
          {message}
        </h3>
        {isCorrect ? (
          <button
            onClick={onNextIfCorrect}
            className="px-6 py-3 bg-green-600 text-white rounded shadow-md hover:bg-green-700"
          >
            Next
          </button>
        ) : (
          <div>
            <button
              onClick={onShowAnswer}
              className="px-4 py-2 bg-red-600 text-white rounded shadow-md hover:bg-red-700 mr-4"
            >
              Show Answer
            </button>
            <button
              onClick={tryAgain}
              className="px-4 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AudioQuizPage;
