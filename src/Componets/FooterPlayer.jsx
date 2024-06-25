import React, { useState, useEffect } from 'react';
import "./css/FooterPlayer.css"
import cover from "../assets/FooterPlayer/cover.jpg"
import back from "../assets/FooterPlayer/back.svg"
import next from "../assets/FooterPlayer/next.svg"
import mute from "../assets/FooterPlayer/mute.svg"
import suffle from "../assets/FooterPlayer/suffle.svg"
import repeat from "../assets/FooterPlayer/repeat.svg"

export default function FooterPlayer({currentTime, duration, playPrivSong, playNextSong ,currentSong, playBtn, firstSongDetails,playSong}) {

    return (
        <div className="footerBox">
            <div className="footerPlayer">
                <div className="album">
                    <img src={cover} alt="cover" height={45} />
                    <div className="songInfo">
                        <span>{currentSong.name || firstSongDetails.name}</span>
                        <span>{currentSong.artist || firstSongDetails.artist}</span>
                    </div>
                </div>
                <div className="playerBox">
                    <div className="playerControl">
                        <img src={repeat} alt="back" height={40} />
                        <img src={suffle} alt="back" height={40} />
                        <img src={back}  onClick={playPrivSong }  alt="back" height={40} />
                        <img onClick={playSong} src={playBtn} alt="play" height={40} />
                        <img src={next} onClick={playNextSong } alt="next" height={40} />
                        <img src={mute} alt="mute" height={40} />
                    </div>
                    <div className="seekBox">
                        <span className="startTime">{currentTime}</span>
                        <span className="seekLine"></span>
                        <span className="endTime">{duration}</span>
                    </div>
                </div>
            </div>
        </div>



    )
}
