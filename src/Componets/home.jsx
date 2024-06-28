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
import mute from "../assets/FooterPlayer/mute.svg"
import unmute from "../assets/FooterPlayer/unmute.svg"

function Home() {
  const firstSongKey = Object.keys(songsData)[0];
  const firstSong = songsData[firstSongKey];
  const firstSongDetails = { name: firstSongKey, artist: firstSong.Artist, link: firstSong.Link, cover :firstSong.Cover};
  const [currentSong, setCurrentSong] = useState({ firstSongDetails });
  const audioPlayer = useRef(null);
  const [playBtn, setPlayBtn] = useState(play);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isSongBarActive, setIsSongBarActive] = useState(false);
  const [isMove, setIsmove] = useState(false);
  const [isSrc, setIsSrc] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [muted, setMuted] = useState(false); 
  const [muteBtn, SetMuteBtn] = useState(unmute)
  
  const toggleMute = () => {
    setMuted(!muted); 
  if(muted ){
    SetMuteBtn(unmute)
  }else{
    SetMuteBtn(mute)
  }
  };

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const toggleSongBar = () => {
    setIsSongBarActive(!isSongBarActive);
    setIsmove(!isMove);
    setIsSrc(!isSrc);
  };
  const toggleSong = (songName, artistName, songPath,Cover) => {
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
        setCurrentSong({ name: songName, artist: artistName, link: songPath, cover: Cover });

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
  const timeToSeconds = (time) => {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
  };
  const playSong = (startTime = currentTime) => {

    if (isFinite(startTime)) {
      audioPlayer.current.currentTime = startTime;
      if (!currentSong.link) {
        audioPlayer.current.src = firstSongDetails.link;
        setCurrentSong(firstSongDetails);
      }
    } else {
      if (!currentSong.link) {
        audioPlayer.current.src = firstSongDetails.link;
        setCurrentSong(firstSongDetails)
      }
      else {
        if (isPlaying) {
          audioPlayer.current.pause();
          setPlayBtn(play);
          setIsPlaying(false);
        } else {
          audioPlayer.current.play();
          setPlayBtn(pause);
          setIsPlaying(true);
        }
      }}};

      const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };
      const updateTrackTime = () => {

        if (audioPlayer.current) {
          setCurrentTime(formatTime(audioPlayer.current.currentTime));
          setDuration(formatTime(audioPlayer.current.duration));
        }
      };


      useEffect(() => {
        const audio = audioPlayer.current;

        const handleTimeUpdate = () => {
          setCurrentTime(formatTime(audio.currentTime));
        };

        const handleLoadedMetadata = () => {
          setDuration(formatTime(audio.duration));
        };

        if (currentSong.link) {
          audio.play();
          setPlayBtn(pause);
          setIsPlaying(true);
        } else {
          setPlayBtn(play);
          audio.pause();
          setIsPlaying(false);
        }


        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
          audio.removeEventListener('timeupdate', handleTimeUpdate);
          audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
      }, [currentSong]);


      return (
        <div className="mainBody">
          <LogoBar  playSong={playSong} setCurrentSong = {setCurrentSong} currentSong = {currentSong} toggleSong ={toggleSong} toggleSidebar={toggleSidebar} />
          <SideBar  isActive={isSidebarActive} />
          <MainContent toggleSongBar={toggleSongBar} toggleSong={toggleSong}   isSrc={isSrc} isMove={isMove} />
          <RightSection isActive={isSongBarActive} toggleSongBar={toggleSongBar} songsData={songsData} toggleSong={toggleSong} currentSong={currentSong} />
          <audio ref={audioPlayer} muted={muted}/>
          <FooterPlayer muteBtn = { muteBtn} toggleMute ={toggleMute} currentTime={currentTime} duration={duration} playSong={playSong} playPrivSong={playPrivSong} playNextSong={playNextSong} firstSongDetails={firstSongDetails} playBtn={playBtn} songsData={songsData} currentSong={currentSong} />
        </div>
      )
    }

    export default Home
