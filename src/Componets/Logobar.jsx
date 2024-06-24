import React from 'react';
import "./css/LogoBar.css"
import logo from "../assets/SideBar/logo.svg"
import ham from "../assets/MainContent/ham.svg"
import searchIcon from "../assets/MainContent/searchIcon.svg"
import mic from "../assets/MainContent/mic.svg"

export default function ({ toggleSidebar }) {
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
        <input type="text" name="search" id="search" placeholder='Search artist, songs, albums...' />
        <img src={mic} alt="mic" width={20} />
      </div>
        </div>
    )
}
