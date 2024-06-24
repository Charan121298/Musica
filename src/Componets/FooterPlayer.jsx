import React from 'react'
import "./css/FooterPlayer.css"
import cover from "../assets/FooterPlayer/cover.jpg"
import back from "../assets/FooterPlayer/back.svg"
import play from "../assets/FooterPlayer/play.svg"
import next from "../assets/FooterPlayer/next.svg"
import mute from "../assets/FooterPlayer/mute.svg"
import suffle from "../assets/FooterPlayer/suffle.svg"
import repeat from "../assets/FooterPlayer/repeat.svg"


export default function FooterPlayer() {
    return (
        <div className="footerBox">
        <div className="footerPlayer">
            <div className="album">
                <img src={cover} alt="cover" height={45} />
                <div className="songInfo">
                    <span>Name</span>
                    <span>Artist</span>
                </div>
            </div>
            <div className="playerBox">
                <div className="playerControl">
                    <img src={repeat} alt="back" height={40} />
                    <img src={suffle} alt="back" height={40} />
                    <img src={back} alt="back" height={40} />
                    <img src={play} alt="play" height={40} />
                    <img src={next} alt="next" height={40} />
                    <img src={mute} alt="mute" height={40} />  
                </div>
                <div className="seekBox">
                    <span className="startTime">00:00</span>
                    <span className="seekLine"></span>
                    <span className="endTime">03:00</span>
                </div>
            </div>
        </div>
        </div>
        


    )
}
