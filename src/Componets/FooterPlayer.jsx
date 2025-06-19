import { useState, useEffect } from 'react';
import back from "../assets/FooterPlayer/back.svg";
import next from "../assets/FooterPlayer/next.svg";
import shuffle from "../assets/FooterPlayer/suffle.svg";
import repeat from "../assets/FooterPlayer/repeat.svg";

export default function FooterPlayer({
  muteBtn,
  toggleMute,
  currentTime,
  duration,
  playPrivSong,
  playNextSong,
  currentSong,
  playBtn,
  firstSongDetails,
  playSong
}) {
  const [progressWidth, setProgressWidth] = useState(0);

  const timeToSeconds = (time) => {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = clickX / rect.width;
    const newTime = Math.floor(timeToSeconds(duration) * clickPercent);
    playSong(newTime);
  };

  useEffect(() => {
    const currentSec = timeToSeconds(currentTime);
    const durationSec = timeToSeconds(duration);
    if (durationSec > 0) {
      setProgressWidth((currentSec / durationSec) * 100);
    }
  }, [currentTime, duration]);
 const cover = `https://placehold.co/600x400.png`;
  return (
    <div className="w-full bg-white dark:bg-gray-900 shadow-md border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between transition-colors">
      {/* Song info */}
      <div className="flex items-center gap-4 min-w-[220px]">
        <img
          // src={currentSong.cover || firstSongDetails.cover}
          src={cover}
          alt="Cover"
          className="w-14 h-14 rounded-lg shadow-md object-cover"
        />
        <div className="flex flex-col overflow-hidden">
          <span className="text-base font-semibold text-gray-900 dark:text-white truncate max-w-[160px]">
            {currentSong.name || firstSongDetails.name}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[160px]">
            {currentSong.artist || firstSongDetails.artist}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center flex-1 max-w-3xl">
        <div className="flex items-center gap-5 mb-2">
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Repeat"
          >
            <img src={repeat} alt="repeat" className="w-8 h-8" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Shuffle"
          >
            <img src={shuffle} alt="shuffle" className="w-8 h-8" />
          </button>
          <button
            onClick={playPrivSong}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Previous"
          >
            <img src={back} alt="previous" className="w-8 h-8" />
          </button>
          <button
            onClick={playSong}
            className="p-3 rounded-full bg-custom-primary text-white shadow-lg hover:bg-custom-secondary transition flex items-center justify-center"
            aria-label="Play/Pause"
          >
            <img src={playBtn} alt="play" className="w-8 h-8" />
          </button>
          <button
            onClick={playNextSong}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Next"
          >
            <img src={next} alt="next" className="w-8 h-8" />
          </button>
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Mute/Unmute"
          >
            <img src={muteBtn} alt="mute" className="w-8 h-8" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 w-full select-none">
          <span className="text-xs text-gray-500 dark:text-gray-400 w-12 text-right font-mono">
            {currentTime}
          </span>
          <div
            onClick={handleSeek}
            className="relative flex-1 h-2 bg-gray-300 dark:bg-gray-700 rounded-full cursor-pointer"
            role="slider"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={currentTime}
            tabIndex={0}
          >
            <div
              className="absolute top-0 left-0 h-2 bg-custom-primary rounded-full transition-all"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 w-12 font-mono">
            {duration}
          </span>
        </div>
      </div>
    </div>
  );
}
