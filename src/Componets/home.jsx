import '../Componets/css/home.css'
import React, { useState } from 'react';
import FooterPlayer from './FooterPlayer'
import LogoBar from './Logobar'
import MainContent from './MainContent'
import RightSection from './RightSection'
import SideBar from './SideBar'

function Home() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isSongBarActive, setIsSongBarActive] = useState(false);
  const [isMove, setIsmove] = useState(false);
  const [isSrc, setIsSrc] = useState(false);
  

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };
  
  const toggleSongBar = () => {
    setIsSongBarActive(!isSongBarActive);
    setIsmove(!isMove);
    setIsSrc(!isSrc);
  };  

  return (
    <div className="mainBody"> 
      <LogoBar toggleSidebar={toggleSidebar}/>
      <SideBar isActive={isSidebarActive}/>
      <MainContent isSrc={isSrc} isMove = {isMove} toggleSongBar={toggleSongBar}/>
      <RightSection isActive={isSongBarActive}/>
      <FooterPlayer /> 
    </div>
  )
}

export default Home
