import logo from "../assets/SideBar/logo.svg";
import { useState } from "react";
import { UserAuth } from "../firebase/AuthContext";
import {
  MdHome,
  MdExplore,
  MdLibraryMusic,
  MdPlaylistPlay,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import LogoutModal from "./LogoutModal"; // ✅ Import the modal

const navItems = [
  { label: "Home", icon: <MdHome size={24} />, href: "/" },
  { label: "Explore", icon: <MdExplore size={24} />, href: "/explore" },
  { label: "Library", icon: <MdLibraryMusic size={24} />, href: "/library" },
  { label: "Playlists", icon: <MdPlaylistPlay size={24} />, href: "/playlists" },
  { label: "Settings", icon: <MdSettings size={24} />, href: "/settings" },
];

export default function SideBar({ isActive, toggleSidebar }) {
  const { user, requestLogout, confirmLogout, cancelLogout, isLogoutModalOpen } = UserAuth();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = async () => {
    try {
      await logOut();
      setShowLogoutModal(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <aside
        className={`
          fixed left-0 top-0 h-full z-30 transition-transform duration-300
          bg-white dark:bg-gray-900 shadow-md border-r border-gray-200 dark:border-gray-800
          w-64 max-w-full flex flex-col
          ${isActive ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between gap-2 px-6 py-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">Musica</span>
          </div>
          <button
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-3xl font-bold leading-none"
          >
            &times;
          </button>
        </div>

        <ul className="flex flex-col gap-2 mt-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-6 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-custom-primary/10 dark:hover:bg-custom-primary/20 font-medium transition"
            >
              {item.icon}
              {item.label}
            </a>
          ))}

          {user && (
            <>
              <li className="flex items-center gap-3 px-6 py-3 mt-2 text-gray-700 dark:text-gray-200">
                <img src={user.photoURL} className="h-8 w-8 rounded-full" alt="profile" />
                <span>{user.displayName}</span>
              </li>
              <li
                onClick={requestLogout}
                className="flex items-center gap-3 px-6 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-800/20 font-medium cursor-pointer transition"
              >
                <MdLogout size={24} />
                Log Out
              </li>
            </>
          )}
        </ul>

        <div className="mt-auto px-6 py-4 text-xs text-gray-400 dark:text-gray-500">
          © 2024 Prakash Tapariya
        </div>
      </aside>

      {/* ✅ Logout confirmation modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />

    </>
  );
}
