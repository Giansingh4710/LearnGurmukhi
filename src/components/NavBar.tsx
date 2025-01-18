import React, { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tight">Learn Gurmukhi</h1>
        </Link>
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
        <ListItem path="/" title="Home" />
        <ListItem path="/letters" title="Letters" />
        <ListItem path="/audio-quiz" title="Audio Quiz" />
      </ul>
    </nav>
  );
}

function ListItem({ path, title }) {
  return (
    <li>
      <Link
        to={path}
        className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded transition"
      >
        {title}
      </Link>
    </li>
  );
}

export default NavBar;
