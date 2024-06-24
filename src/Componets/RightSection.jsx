import React, { useState, useEffect } from 'react';
import songCover from "../assets/MainContent/songCover.jfif"
import "./css/MainContent.css"
import heart from "../assets/MainContent/heart.svg"
import dots from "../assets/MainContent/dots.svg"
import play from "../assets/FooterPlayer/play.svg"
import pause from "../assets/FooterPlayer/pause.svg"

export default function RightSection({ isActive }) {
  const [songs, setSongs] = useState([]);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [PlaySrc, setPlaySrc] = useState(play);

  useEffect(() => {
    // Read JSON data from file
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        // Convert JSON object to array of key-value pairs
        const songsArray = Object.entries(data);
        setSongs(songsArray);
      })
      .catch(error => console.error('Error reading data:', error));
  }, []);

  useEffect(() => {
    // Create audio player
    const audio = new Audio();
    setAudioPlayer(audio);

    // Listen for audio ended event to reset current song
    audio.addEventListener('ended', () => {
      setCurrentSong(null);
    });

    return () => {
      // Cleanup listener
      audio.removeEventListener('ended', () => {});
    };
  }, []);

  const toggleSong = (artistName) => {
    // Find the song path based on the artist name
    const songPath = songs.find(([songName, path]) => path === artistName)?.[1];
    if (songPath) {
      // If the clicked song is already playing, pause it
      if (currentSong === songPath) {
        audioPlayer.pause();
        setCurrentSong(null);
        setPlaySrc(play)
      } else { // Otherwise, play the clicked song
        // Pause the current song if it's playing
        if (audioPlayer && !audioPlayer.paused) {
          audioPlayer.pause();
          setPlaySrc(play)
        }
        // Play the new song
        audioPlayer.src = songPath;
        audioPlayer.play();
        setPlaySrc(pause)
        setCurrentSong(songPath);
      }
    } else {
      console.error('Song path not found for:', artistName);
    }
  };

  return (
    <div className={isActive ? 'rightBox RB-Active' : 'rightBox'}>
      <ul className="songList">
        {songs.map(([songName, artistName], index) => (
          <li key={index} className='songInfo2'>
            <div className='song'>
              <img src={songCover} width={50} height={50} alt="cover" />
              <div className='songDetails'>
                <div>{songName}</div>
                <div>Artist</div>
              </div>
            </div>
            <div className="icon">
              <img src={PlaySrc} width={25} height={25} alt="Play" onClick={() => toggleSong(artistName)} />
              <img src={heart} width={25} height={25} alt="fav" />
              <img src={dots} width={25} height={25} alt="dots" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
