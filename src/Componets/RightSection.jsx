import React, { useState, useEffect } from 'react';
import songCover from "../assets/MainContent/songCover.jfif"
import "./css/MainContent.css"
import heart from "../assets/MainContent/heart.svg"
import dots from "../assets/MainContent/dots.svg"
import play from "../assets/FooterPlayer/play.svg"
import pause from "../assets/FooterPlayer/pause.svg"
import songsDa from '../../data.json';

export default function RightSection({ isActive, songsData, toggleSong, currentSong }) {
  const songs = Object.entries(songsDa);
  return (
    <div className={isActive ? 'rightBox RB-Active' : 'rightBox'}>
      <ul className="songList">
        {songs.map(([songName, songInfo], index) => (
          <li key={index} className='songInfo2'>
            <div className='song'>
              <img src={songCover} width={50} height={50} alt="cover" />
              <div className='songDetails'>
                <div>{songName}</div>
                <div>{songInfo.Artist}</div>
              </div>
            </div>
            <div className="icon">
              <img src={currentSong.link === songInfo.Link? pause : play} width={25} height={25} alt="Play"
                onClick={() => toggleSong(songName, songInfo.Artist, songInfo.Link)} />
              <img src={heart} width={25} height={25} alt="fav" />
              <img src={dots} width={25} height={25} alt="dots" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
