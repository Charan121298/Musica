import "./css/MainContent.css"
import heart from "../assets/MainContent/heart.svg"
import play from "../assets/FooterPlayer/play.svg"
import pause from "../assets/FooterPlayer/pause.svg"
import songsDa from '../../data.json';

export default function RightSection({ isActive, songsData, toggleSong, currentSong }) {
  const songs = Object.entries(songsDa);
  return (
    <div className={isActive ? 'rightBox RB-Active' : 'rightBox'}>
      <ul className="songList">
        {songs.map(([songName, songInfo], index) => (
          <li key={index} className='songInfo2'>
            <div className='song'>
              <img src={songInfo.Cover} width={50} height={50} alt="cover" />
              <div className='songDetails'>
                <div>{songName}</div>
                <div>{songInfo.Artist}</div>
              </div>
            </div>
            <div className="icon">
              <img src={currentSong.link === songInfo.Link? pause : play} width={25} height={25} alt="Play"
                onClick={() => toggleSong(songName, songInfo.Artist, songInfo.Link,songInfo.Cover)} />
              <img src={heart} width={25} height={25} alt="fav" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
