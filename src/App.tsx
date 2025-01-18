import React from "react"; // removes errors for nvim lsp
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import GurmukhiGrid from "./GurmukhiGridPage.tsx";
import AudioQuizPage from "./AudioQuizPage.tsx";
import TransliterationQuizPage from "./TransliterationQuizPage.tsx";
import NavBar from "./components/NavBar.tsx";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/letters" element={<GurmukhiGrid />} />
          <Route path="/audio-quiz" element={<AudioQuizPage />} />
          <Route
            path="/transliteration-quiz"
            element={<TransliterationQuizPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

function ListItem({ path, title }: { path: string; title: string }) {
  return (
    <Link
      to={path}
      className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700"
    >
      {title}
    </Link>
  );
}

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="w-full py-6 bg-gray-100 dark:bg-gray-800 shadow-md">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-50">
          Welcome to Learn Gurmukhi
        </h1>
      </header>
      <main className="flex flex-col items-center mt-12 space-y-8">
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl text-center">
          Explore various resources and tools to help you learn Gurmukhi. Choose
          an option below to get started.
        </p>
        <ListItem path="/letters" title="Letters" />
        <ListItem path="/audio-quiz" title="Audio Quiz" />
        <ListItem path="/transliteration-quiz" title="Transliteration Quiz" />
      </main>
    </div>
  );
}

export default App;
