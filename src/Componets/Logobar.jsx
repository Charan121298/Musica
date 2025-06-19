import { useState } from 'react';
import songs from "../../data.json";
import { MdMenu, MdSearch, MdMic, MdDarkMode, MdLightMode, MdMusicNote } from "react-icons/md";

export default function LogoBar({ setCurrentSong, currentSong, toggleSong, toggleSidebar, dark, setDark }) {
  const suggestionsArray = Object.keys(songs);
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    setFilteredSuggestions(
      value
        ? suggestionsArray.filter((suggestion) =>
            suggestion.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setCurrentSong(songs[suggestion]);
    setFilteredSuggestions([]);
    toggleSong(
      suggestion,
      songs[suggestion]["Artist"],
      songs[suggestion]["Link"],
      songs[suggestion]["Cover"]
    );
  };

  return (
    <header className="w-full px-6 py-3 flex items-center justify-between bg-white dark:bg-gray-950 shadow-sm border-b border-gray-200 dark:border-gray-800">
      
      {/* Left: Logo & Menu */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="Toggle sidebar"
        >
          <MdMenu className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <div className="flex items-center gap-2">
          <MdMusicNote className="w-7 h-7 text-custom-primary" />
          <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Musica
          </span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="relative w-full max-w-md mx-6">
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-custom-primary transition-all">
          <MdSearch className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Search songs, artists..."
            value={query}
            onChange={handleInputChange}
            className="w-full bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none"
          />
          <MdMic className="w-5 h-5 ml-2 text-gray-500 dark:text-gray-300" />
        </div>

        {filteredSuggestions.length > 0 && (
          <ul className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-y-auto max-h-48 z-20 border border-gray-200 dark:border-gray-800">
            {filteredSuggestions.map((suggestion, idx) => (
              <li
                key={idx}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right: Theme Toggle */}
      <button
        onClick={() => setDark((d) => !d)}
        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        aria-label="Toggle dark mode"
      >
        {dark ? (
          <MdDarkMode className="text-xl text-white" />
        ) : (
          <MdLightMode className="text-xl text-yellow-500" />
        )}
      </button>
    </header>
  );
}
