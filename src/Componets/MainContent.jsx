import React, { useState } from 'react';
import "./css/MainContent.css"
import backgroundImage from "../assets/MainContent/backgroundImg.jpg"
import backPage from "../assets/MainContent/backPage.svg"
import nextPage from "../assets/MainContent/nextPage.svg"
import songCover from "../assets/MainContent/songCover.jfif"
import bgcover from "../assets/MainContent/bgcover.webp"
import pop from "../assets/MainContent/pop.jpg"

export default function MainContent({ toggleSongBar, isMove, isSrc }) {
  const [bgSrc, setbgSrc] = useState(backgroundImage);
  const toggleSong = () => {
    const audio = new Audio("https://cloud-object-storage-cos-standard-lgo.s3.jp-tok.cloud-object-storage.appdomain.cloud/Apna%20Bana%20Le.mp3");
    audio.play()
    setbgSrc(bgcover)
    console.log(playing)
  };



  return (
    <div className="MainContent">
      <div className="featured" style={{
        backgroundImage: `url(${bgSrc})`
      }}>
        <div className="swipe">
          <img src={backPage} className='backPage' width={40} alt="backPage" />
          <img src={nextPage} className='nextPage' width={40} alt="nextPage" />
        </div>
        <div className="playBox">
          <div>Apna bana le</div>
          <div>Arijit Singh</div>
          <button onClick={toggleSong} >Play</button>
        </div>
      </div>
      <div className={isMove ? 'SongSwipe swipe move' : 'SongSwipe swipe'} onClick={() => toggleSong}  >
        <img src={isSrc ? nextPage : backPage} width={40} height={40} alt="swipe" />
      </div>
      <div className='title'>New Realease</div>
      <div className="newRelease">
        <div className="songBox">
          <img src={songCover} width={80} height={80} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
        <div className="songBox">
          <img src={songCover} width={80} height={80} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
        <div className="songBox">
          <img src={songCover} width={80} height={80} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
        <div className="songBox">
          <img src={songCover} width={80} height={80} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
        <div className="songBox">
          <img src={songCover} width={80} height={80} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
        <div className="songBox">
          <img src={songCover} width={80} height={80} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
        <div className="songBox">
          <img src={songCover} width={80} height={80} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
        <div className="songBox">
          <img src={songCover} width={80} height={80} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
        <div className="songBox">
          <img src={songCover} width={80} height={80} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div><div className="songBox">
          <img src={songCover} width={80} height={80} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
      </div>
      <div className='title'>You may like</div>
      <div className="youMayLike">
        <div className="songBox2">
          <img src={songCover} width={55} height={55} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
        <div className="songBox2">
          <img src={songCover} width={55} height={55} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
        <div className="songBox2">
          <img src={songCover} width={55} height={55} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
        <div className="songBox2">
          <img src={songCover} width={55} height={55} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
        <div className="songBox2">
          <img src={songCover} width={55} height={55} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
        <div className="songBox2">
          <img src={songCover} width={55} height={55} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
        <div className="songBox2">
          <img src={songCover} width={55} height={55} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
        <div className="songBox2">
          <img src={songCover} width={55} height={55} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
        <div className="songBox2">
          <img src={songCover} width={55} height={55} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
        <div className="songBox2">
          <img src={songCover} width={55} height={55} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
        <div className="songBox2">
          <img src={songCover} width={55} height={55} alt="cover" />
          <div>Song Name</div>
          <div>Artist</div>
        </div>
      </div>
      <div className="title">Categories</div>
      <div className="newRelease categories">
        <ul>
          <li style={{
            backgroundImage: `url(${pop})`
          }}>Pop</li>
          <li style={{
            backgroundImage: `url(${pop})`
          }}>Chill</li>
          <li style={{
            backgroundImage: `url(${pop})`
          }}>Podcasts</li>
          <li style={{
            backgroundImage: `url(${pop})`
          }}>Jazz</li>
          <li style={{
            backgroundImage: `url(${pop})`
          }}>Romace</li>
          <li style={{
            backgroundImage: `url(${pop})`
          }}>Rock</li>
          <li style={{
            backgroundImage: `url(${pop})`
          }}>Hip Hop</li>
          <li style={{
            backgroundImage: `url(${pop})`
          }}>Sleep</li>
          <li style={{
            backgroundImage: `url(${pop})`
          }}>Sleep</li>
          <li style={{
            backgroundImage: `url(${pop})`
          }}>Sleep</li>
          <li style={{
            backgroundImage: `url(${pop})`
          }}>Sleep</li>
        </ul>
      </div>
    </div>

  )
}
