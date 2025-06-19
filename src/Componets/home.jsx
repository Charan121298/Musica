import { useState, useRef, useEffect } from 'react';
import FooterPlayer from './FooterPlayer';
import LogoBar from './Logobar';
import MainContent from './MainContent';
import RightSection from './RightSection';
import SideBar from './SideBar';
import songsData from '../../data.json';
import play from "../assets/FooterPlayer/play.svg";
import pause from "../assets/FooterPlayer/pause.svg";
import mute from "../assets/FooterPlayer/mute.svg";
import unmute from "../assets/FooterPlayer/unmute.svg";
import LogoutModal from './LogoutModal';
import { UserAuth } from '../firebase/AuthContext';

function Home() {
  const firstSongKey = Object.keys(songsData)[0];
  const firstSong = songsData[firstSongKey];
  const firstSongDetails = { name: firstSongKey, artist: firstSong.Artist, link: firstSong.Link, cover: firstSong.Cover };
  const { logOut } = UserAuth();
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
  const [muteBtn, SetMuteBtn] = useState(unmute);
  const [dark, setDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleMute = () => {
    setMuted(!muted);
    SetMuteBtn(!muted ? mute : unmute);
  };

  const toggleSidebar = () => {
    setIsSidebarActive((prev) => !prev);
  };

  const toggleSongBar = () => {
    setIsSongBarActive(!isSongBarActive);
    setIsmove(!isMove);
    setIsSrc(!isSrc);
  };

  const toggleSong = (songName, artistName, songPath, Cover) => {
    if (songPath) {
      if (currentSong.link === songPath) {
        audioPlayer.current.pause();
        setCurrentSong({});
      } else {
        if (audioPlayer.current && !audioPlayer.current.paused) {
          audioPlayer.current.pause();
        }
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
      console.log('End of song list');
    }
  };

  const playPrivSong = () => {
    const prevIndex = currentSongIndex - 1;
    if (prevIndex >= 0) {
      const prevSongKey = Object.keys(songsData)[prevIndex];
      const prevSong = songsData[prevSongKey];
      audioPlayer.current.src = prevSong.Link;
      audioPlayer.current.play();
      setCurrentSongIndex(prevIndex);
      setCurrentSong({ name: prevSongKey, artist: prevSong.Artist, link: prevSong.Link });
    } else {
      console.log('Start of song list');
    }
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
        setCurrentSong(firstSongDetails);
      } else {
        if (isPlaying) {
          audioPlayer.current.pause();
          setPlayBtn(play);
          setIsPlaying(false);
        } else {
          audioPlayer.current.play();
          setPlayBtn(pause);
          setIsPlaying(true);
        }
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const requestLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = async () => {
    setIsLogoutModalOpen(false);
    try {
      await logOut();
      // navigate('/login'); -- if using react-router-dom, do this here
    } catch (error) {
      console.error(error);
    }
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };
  return (
    <div className="w-full flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <LogoBar
        playSong={playSong}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        toggleSong={toggleSong}
        toggleSidebar={toggleSidebar}
        dark={dark}
        setDark={setDark}
      />
      <div className="flex flex-1 relative">
        {/* Sidebar Slide-in/out */}
        <SideBar
          isActive={isSidebarActive}
          toggleSidebar={toggleSidebar}
          requestLogout={requestLogout}  // pass logout trigger here
        />
        <main className="flex-1 w-full">
          <MainContent
            toggleSongBar={toggleSongBar}
            toggleSong={toggleSong}
            isSrc={isSrc}
            isMove={isMove}
          />
        </main>
        <RightSection
          isActive={isSongBarActive}
          toggleSongBar={toggleSongBar}
          songsData={songsData}
          toggleSong={toggleSong}
          currentSong={currentSong}
        />
      </div>
      <audio ref={audioPlayer} muted={muted} />
      <FooterPlayer
        muteBtn={muteBtn}
        toggleMute={toggleMute}
        currentTime={currentTime}
        duration={duration}
        playSong={playSong}
        playPrivSong={playPrivSong}
        playNextSong={playNextSong}
        firstSongDetails={firstSongDetails}
        playBtn={playBtn}
        songsData={songsData}
        currentSong={currentSong}
      />
    </div>
  );
}

export default Home;
