import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiGoogle } from 'react-icons/si';

import { UserAuth } from '../firebase/AuthContext.jsx';
import Home from './home.jsx';

export default function LoginPage() {
  const [guest, setGuest] = useState(localStorage.getItem("guest") || "No");
  const navigate = useNavigate();
  const { googleSignIn, user } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error(error);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">Welcome to Musica</h1>

        <form className="space-y-5" autoComplete="off">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 w-full py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 transition font-medium"
          aria-label="Login with Google"
        >
          <SiGoogle size={24} />
          <span>Continue with Google</span>
        </button>

        <button
          onClick={handleGuestSignIn}
          className="w-full py-3 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition"
        >
          Continue as Guest
        </button>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6">
          &copy; 2024 Prakash Tapariya
        </p>
      </div>
    </div>
  );
}
