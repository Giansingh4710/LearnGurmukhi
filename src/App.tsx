import React from "react"; // removes errors for nvim lsp
import GurmukhiGrid from "./GurmukhiGridPage.tsx";
import AudioQuizPage from "./AudioQuizPage.tsx";
import NavBar from "./components/NavBar.tsx";

function App() {
  const [currentPage, setCurrentPage] = React.useState("/");
  let DisplayComponent = LandingPage;
  if (currentPage === "/") {
    DisplayComponent = LandingPage;
  } else if (currentPage === "/letters") {
    DisplayComponent = GurmukhiGrid;
  } else if (currentPage === "/quiz") {
    DisplayComponent = AudioQuizPage;
  }

  return (
    <div>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DisplayComponent setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}

function ListItem({ onClick, title }: { onClick: () => void; title: string }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700"
    >
      {title}
    </button>
  );
}

function LandingPage({
  setCurrentPage,
}: {
  setCurrentPage: (page: string) => void;
}) {
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
        <ListItem onClick={() => setCurrentPage("/letters")} title="Letters" />
        <ListItem onClick={() => setCurrentPage("/quiz")} title="Audio Quiz" />
      </main>
    </div>
  );
}

export default App;
