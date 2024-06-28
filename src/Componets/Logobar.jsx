import React, { useState } from 'react';
import "./css/LogoBar.css";
import logo from "../assets/SideBar/logo.svg";
import ham from "../assets/MainContent/ham.svg";
import searchIcon from "../assets/MainContent/searchIcon.svg";
import mic from "../assets/MainContent/mic.svg";
import songs from "../../data.json"


export default function LogoBar({setCurrentSong,currentSong,toggleSong,toggleSidebar }) {
    const suggestionsArray = Object.keys(songs);
    const [query, setQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);

        if (value) {
            const filtered = suggestionsArray.filter((suggestion) =>
                suggestion.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    };
    const handleSuggestionClick = (suggestion) => {
        setCurrentSong(songs[suggestion])
        setFilteredSuggestions([]); 
        toggleSong(suggestion,songs[suggestion]["Artist"],songs[suggestion]["Link"],songs[suggestion]["Cover"])
    };
    return (
        <div className="header">
            <div className="LogoBar">
                <button className='HamMenu' onClick={toggleSidebar}>
                    <img src={ham} height={30} width={30} alt="Menu" />
                </button>
                <img src={logo} height={40} width={40} alt="logo" />
                <span>Musica</span>
            </div>
            <div className="searchBox">
                <img src={searchIcon} alt="search icon" width={20} />
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder='Search artist, songs, albums...'
                    value={query}
                    onChange={handleInputChange}
                    autoComplete="off"
                />
                {filteredSuggestions.length > 0 && (
                    <ul className="suggestions hide_scorllbar">
                        {filteredSuggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(suggestion)} >{suggestion}</li>
                        ))}
                    </ul>
                )}
                <img src={mic} alt="mic" width={20} />
            </div>
        </div>
    );
}
