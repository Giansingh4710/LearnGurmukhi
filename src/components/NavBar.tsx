import React, { useState } from "react";

function NavBar({ currentPage, setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentPage("/")}
          className="flex items-center"
        >
          <h1 className="text-2xl font-bold tracking-tight">Learn Gurmukhi</h1>
        </button>
        <button
          className="text-white text-2xl focus:outline-none lg:hidden"
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>
      <ul
        className={`mt-4 lg:mt-0 lg:flex lg:space-x-8 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ListItem onClick={() => setCurrentPage("/")} title="Home" />
        <ListItem onClick={() => setCurrentPage("/letters")} title="Letters" />
        <ListItem
          onClick={() => setCurrentPage("/quiz")}
          title="Audio Quiz"
        />
      </ul>
    </nav>
  );
}

function ListItem({ onClick, title }: { onClick: () => void; title: string }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded transition"
      >
        {title}
      </button>
    </li>
  );
}

export default NavBar;
