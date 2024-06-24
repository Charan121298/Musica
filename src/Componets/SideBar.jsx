import React from 'react';
import "./css/SideBar.css"
import home from "../assets/SideBar/home.svg"
import browse from "../assets/SideBar/browse.svg"
import favorite from "../assets/SideBar/favorite.svg"
import add from "../assets/SideBar/addPlaylist.svg"
import { UserAuth } from '../firebase/AuthContext';
import { Navigate } from 'react-router-dom';


export default function SideBar({ isActive }) {

    const { user, logOut } = UserAuth()
    const handleSignOut = async () => {
        try {
            await logOut()
           { <Navigate to="/dashboard" />}
        } catch {
            console.log(error)
        }
    };
    return (
        <div className={isActive ? 'SideBar active' : 'SideBar'}>
            <ul className="menuList">
                {user ? (<li onClick={handleSignOut}><img className="Profilepic" src={user.photoURL} alt="home" height={30} />{user.displayName}</li>) :
                    (<li><img src={home} alt="home" height={30} />Log in</li>)
                }
                <li><img src={browse} alt="browse" height={30} />Browse</li>
                <li><img src={favorite} alt="favorite" height={30} />Favorite</li>
                <li><img src={add} alt="favorite" height={30} />Create Playlist</li>
            </ul>
            <div className="PlaylistBox">
                <ul className="playLists">
                    <li>1st list</li>
                    <li>2nd list</li>
                    <li>3rd list</li>
                    <li>4th list</li>
                    <li>5th list</li>
                    <li>6th list</li>
                    <li>7th list</li>
                    <li>8th list</li>
                    <li>9th list</li>
                </ul>
            </div>
        </div>
    )
}