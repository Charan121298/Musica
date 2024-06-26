import React, { useState, useEffect } from 'react';
import "./css/MainContent.css"
import backgroundImage from "../assets/MainContent/backgroundImg.jpg"
import backPage from "../assets/MainContent/backPage.svg"
import nextPage from "../assets/MainContent/nextPage.svg"
import songCove from "../assets/MainContent/songCover.jfif"
import songsDa from "../../data.json"

export default function MainContent({ toggleSong, toggleSongBar, isMove, isSrc }) {
  const songs = Object.entries(songsDa);
  const [bgSrc, setbgSrc] = useState(backgroundImage);
  const [selectedKey, setSelectedKey] = useState(songs[0])

  const getRandomKey = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    setSelectedKey(songs[randomIndex]);
  };
  useEffect(() => {
    const interval = setInterval(getRandomKey, 10000);
    getRandomKey();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="MainContent">
      <div className="featured" style={{
        backgroundImage: `url(${bgSrc})`
      }}>
        <div className="swipe">
          {/* <img src={backPage} className='backPage' width={40} alt="backPage" />
          <img src={nextPage} className='nextPage' width={40} alt="nextPage" /> */}
        </div>
        <div className="playBox">
          <div>{selectedKey[0]}</div>
          <div>{selectedKey[1]["Artist"]}</div>
          <button  onClick={() => toggleSong(selectedKey[0], selectedKey[1]["Artist"], selectedKey[1]["Link"])} >Play Now</button>
        </div>
      </div>
      <div className={isMove ? 'SongSwipe swipe move' : 'SongSwipe swipe'}   >
        <img onClick={toggleSongBar} src={isSrc ? nextPage : backPage} width={40} height={40} alt="swipe" />
      </div>
      <div className='title'>New Realease</div>
      <div className="newRelease">
        {songs.map((song, index) => {
          return (
            <div key={index} className="songBox" >
              <img src={songCove} onClick={() => toggleSong(song[0], song[1]["Artist"], song[1]["Link"])} width={80} height={80} alt="cover" />
              <div className='songName'>{song[0]}</div>
              <div className='artistName'>{song[1]["Artist"]}</div>
            </div>
          );
        })}
      </div>
      <div className='title'>Artist you may like</div>
      <div className="youMayLike">
        {songs.map((song, index) => {
          return (
            <div key={index} className="songBox2" >
              <img src={songCove}  onClick={() => toggleSong(song[0], song[1]["Artist"], song[1]["Link"])} 
              width={55} height={55} alt="cover" />
              <div className='songName artist'>{song[1]["Artist"]}</div>
            </div>
          );
        })}

      </div>

    </div>

  )
}
