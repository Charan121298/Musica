import React, { useState, useEffect } from 'react';
import "./css/FooterPlayer.css"
import back from "../assets/FooterPlayer/back.svg"
import next from "../assets/FooterPlayer/next.svg"
import suffle from "../assets/FooterPlayer/suffle.svg"
import repeat from "../assets/FooterPlayer/repeat.svg"

export default function FooterPlayer({muteBtn,toggleMute,currentTime, duration, playPrivSong, playNextSong, currentSong, playBtn, firstSongDetails, playSong}) {
    const [progressWidth, setProgressWidth] = useState(0);
    const secondsToTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    
    const timeToSeconds = (time) => {
        const [minutes, seconds] = time.split(':').map(Number);
        return minutes * 60 + seconds;
    };
    const handleSeek = (e) => {
        const seekLineRect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - seekLineRect.left;
        const seekLineWidth = seekLineRect.width;
        const clickPercentage = clickX / seekLineWidth;
        const newTimeSeconds = Math.floor(timeToSeconds(duration) * clickPercentage);
        playSong(newTimeSeconds);
    };
    useEffect(() => {
        const currentTimeInSeconds = timeToSeconds(currentTime);
        const durationInSeconds = timeToSeconds(duration);

        if (durationInSeconds > 0) {
            setProgressWidth((currentTimeInSeconds / durationInSeconds) * 100);
        }

    }, [currentTime, duration]);

    return (

        <div className="footerBox">
            <div className="footerPlayer">
                <div className="album">

                    <img src={currentSong.cover || firstSongDetails.cover} alt="cover" height={45} />
                    <div className="songInfo">
                        <span>{currentSong.name || firstSongDetails.name}</span>
                        <span>{currentSong.artist || firstSongDetails.artist}</span>
                    </div>
                </div>
                <div className="playerBox">
                    <div className="playerControl">
                        <img src={repeat} alt="back" height={40} />
                        <img src={suffle} alt="back" height={40} />
                        <img src={back} onClick={playPrivSong} alt="back" height={40} />
                        <img onClick={playSong} src={playBtn} alt="play" height={40} />
                        <img src={next} onClick={playNextSong} alt="next" height={40} />
                        <img src={muteBtn} onClick = {toggleMute}alt="mute" height={40} />
                    </div>
                    <div className="seekBox">
                        <span className="startTime">{currentTime}</span>
                        <div className="seekLine" onClick={handleSeek} > <div className="seekProgress" style={{ width: `${progressWidth}%` }} ></div></div>
                        <span className="endTime">{duration}</span>
                    </div>
                </div>
            </div>
        </div>

    )
}
