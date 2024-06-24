import { useContext, createContext, useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "./config";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    };
    const logOut = () => {
        const logoutConfirmed = window.confirm('Are you sure you want to log out?');
        if (logoutConfirmed) {
          signOut(auth);
          navigate('/login');
        }
      };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}