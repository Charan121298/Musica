import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/SideBar/logo.svg"
import google from "../assets/googleBtn.svg"
import "./css/LoginPage.css"
import { UserAuth } from '../firebase/AuthContext.jsx'
import Home from './home.jsx'
import play from "../assets/FooterPlayer/play.svg"
import pause from "../assets/FooterPlayer/pause.svg"

export default function LoginPage() {
  const [guest, setGuest] = useState(localStorage.getItem("guest") || "No");
  const navigate = useNavigate()
  const { googleSignIn, user } = UserAuth()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGuestSignIn = () => {
    setGuest("Yes");
    localStorage.setItem("guest", "Yes");
  };

  useEffect(() => {
    if (user !== null || guest === "Yes") {
      navigate("/");
    }

  }, [user, guest, navigate]);

  if (user || guest === "Yes") {
    return <Home />;
  }

  return (
    <div className="MainContainer">
      <div className="login-container">
        <div className="logo">
          <img src={logo} height={40} alt="Logo" />
          <span>Musica</span>
        </div>
        <form action="#" method="post" id="login-form">
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <input type="submit" value="Login" />
        </form>
        <button className="google-btn" onClick={handleGoogleSignIn}>
          <img src={google} height={30} alt="Google Logo" />
          <span>Login with Google</span>
        </button>
        <button className="google-btn skipBtn" onClick={handleGuestSignIn} >Skip Login</button>
      <div className="myName">Prakash Tapariya © 2024</div>
        <div className="error-message" id="error-message"></div>
      </div>
    </div>
  )
}
