import '../Componets/css/home.css'
import React, { useState, useRef, useEffect } from 'react';
import FooterPlayer from './FooterPlayer'
import LogoBar from './Logobar'
import MainContent from './MainContent'
import RightSection from './RightSection'
import SideBar from './SideBar'
import songsData from '../../data.json';
import play from "../assets/FooterPlayer/play.svg"
import pause from "../assets/FooterPlayer/pause.svg"

function Home() {
  const firstSongKey = Object.keys(songsData)[0];
  const firstSong = songsData[firstSongKey];
  const firstSongDetails = { name: firstSongKey, artist: firstSong.Artist, link: firstSong.Link };

  const [currentSong, setCurrentSong] = useState({firstSongDetails});
  const audioPlayer = useRef(null);
  const [playBtn, setPlayBtn] = useState(play);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isSongBarActive, setIsSongBarActive] = useState(false);
  const [isMove, setIsmove] = useState(false);
  const [isSrc, setIsSrc] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const toggleSongBar = () => {
    setIsSongBarActive(!isSongBarActive);
    setIsmove(!isMove);
    setIsSrc(!isSrc);
  };
  const toggleSong = (songName,artistName, songPath) => {
    if (songPath) {
      if (currentSong.link === songPath) {

        audioPlayer.current.pause();
        setCurrentSong({});
      } else {
        // Pause the current song if it's playing
        if (audioPlayer.current && !audioPlayer.current.paused) {
          audioPlayer.current.pause();

        }
        // Play the new song
        audioPlayer.current.src = songPath;
        audioPlayer.current.play();
        setCurrentSong({ name: songName, artist: artistName, link: songPath });

      }
    } else {
      console.error('Song path not found for:', artistName);
    }
  };
  
  const playNextSong = () => {
    const nextIndex = currentSongIndex + 1;
    if (nextIndex < Object.keys(songsData).length) {
        const nextSongKey = Object.keys(songsData)[nextIndex];
        const nextSong = songsData[nextSongKey];
        audioPlayer.current.src = nextSong.Link;
        audioPlayer.current.play();
        setCurrentSongIndex(nextIndex);
        setCurrentSong({ name: nextSongKey, artist: nextSong.Artist, link: nextSong.Link });
    } else {
        // Reached the end of the list, optionally loop back to the beginning
        // For example, you could set setCurrentSongIndex(0) to loop back to the first song
        console.log('End of song list');
    }
};
const playPrivSong = () => {
  const nextIndex = currentSongIndex - 1;
  if (nextIndex < Object.keys(songsData).length) {
      const nextSongKey = Object.keys(songsData)[nextIndex];
      const nextSong = songsData[nextSongKey];
      audioPlayer.current.src = nextSong.Link;
      audioPlayer.current.play();
      setCurrentSongIndex(nextIndex);
      setCurrentSong({ name: nextSongKey, artist: nextSong.Artist, link: nextSong.Link });
  } else {
      // Reached the end of the list, optionally loop back to the beginning
      // For example, you could set setCurrentSongIndex(0) to loop back to the first song
      console.log('End of song list');
  }
};

  useEffect(() => {
    if (currentSong.link) {
        setPlayBtn(pause);
    } else {
        setPlayBtn(play);
    }
}, [currentSong]);

  return (
    <div className="mainBody">
      <LogoBar toggleSidebar={toggleSidebar} />
      <SideBar isActive={isSidebarActive} />
      <MainContent isSrc={isSrc} isMove={isMove}/>
      <RightSection isActive={isSongBarActive}  toggleSongBar={toggleSongBar} songsData={songsData} toggleSong={toggleSong} currentSong={currentSong} />
      <audio ref={audioPlayer} />
      <FooterPlayer playSong = {toggleSong} playPrivSong = {playPrivSong} playNextSong = {playNextSong } firstSongDetails = {firstSongDetails} playBtn={playBtn} songsData={songsData}  currentSong={currentSong}  />
    </div>
  )
}

export default Home
