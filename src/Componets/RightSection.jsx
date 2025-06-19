import { useState } from "react";
import { MdChevronLeft, MdChevronRight, MdFavorite, MdPlayArrow, MdPause } from "react-icons/md";
import songsDa from '../../data.json';

export default function RightSection({ songsData = songsDa, toggleSong, currentSong }) {
  const [isActive, setIsActive] = useState(false);
  const songs = Object.entries(songsData);
  const cover = `https://placehold.co/600x400.png`;
  const toggleSidebar = () => setIsActive(!isActive);

  return (
    <>
      {/* Toggle Button */}
  <button
      aria-label={isActive ? "Close playlist" : "Open playlist"}
      onClick={toggleSidebar}
      className={`
        fixed top-1/2 z-40 p-3 rounded-l-full
        bg-custom-primary text-white dark:bg-custom-primary-dark
        hover:bg-custom-secondary dark:hover:bg-custom-secondary-dark
        transition-colors duration-300
        flex items-center justify-center
        -translate-y-1/2
        focus:outline-none focus:ring-2 focus:ring-custom-primary/70
        shadow-lg
        bg-white dark:bg-gray-800
      `}
      style={{
        right: 0,
        transform: `translateX(${isActive ? '-320px' : '0'}) translateY(-50%)`,
        transition: 'transform 300ms ease',
      }}
    >
      {isActive ? <MdChevronRight size={20} /> : <MdChevronLeft size={20} />}
    </button>



      {/* Sidebar */}
      <aside
        className={`
          fixed right-0 top-0 h-full z-30 transition-transform duration-300
          bg-white dark:bg-gray-900 shadow-lg border-l border-gray-200 dark:border-gray-800
          w-80 max-w-full
          flex flex-col
          ${isActive ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <header className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white select-none">Up Next</h2>
        </header>
        <ul className="overflow-y-auto max-h-[calc(100vh-64px)] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-custom-primary dark:scrollbar-thumb-custom-primary-dark">
          {songs.map(([songName, songInfo], idx) => {
            const isCurrent = currentSong.link === songInfo.Link;
            return (
              <li
                key={idx}
                className={`
                  flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800
                  cursor-pointer
                  hover:bg-gray-50 dark:hover:bg-gray-800 transition
                  ${isCurrent ? "bg-custom-primary/20 dark:bg-custom-primary/30" : ""}
                `}
                onClick={() => toggleSong(songName, songInfo.Artist, songInfo.Link, songInfo.Cover)}
                role="button"
                tabIndex={0}
                onKeyDown={e => (e.key === "Enter" || e.key === " ") && toggleSong(songName, songInfo.Artist, songInfo.Link, songInfo.Cover)}
                aria-current={isCurrent ? "true" : "false"}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <img
                    src={cover}
                    alt={`${songName} cover`}
                    className="w-12 h-12 rounded-lg shadow object-cover flex-shrink-0"
                    width={48}
                    height={48}
                  />
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-medium text-gray-900 dark:text-white truncate max-w-[140px]">{songName}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-300 truncate max-w-[140px]">{songInfo.Artist}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    aria-label={isCurrent ? "Pause song" : "Play song"}
                    className={`
                      p-2 rounded-full
                      ${isCurrent ? "bg-custom-primary text-white shadow-md" : "bg-gray-100 dark:bg-gray-800 hover:bg-custom-primary hover:text-white dark:hover:bg-custom-primary"}
                      transition
                      flex items-center justify-center
                    `}
                  >
                    {isCurrent ? <MdPause size={24} /> : <MdPlayArrow size={24} />}
                  </button>
                  <button
                    aria-label="Add to favorites"
                    className="p-2 rounded-full hover:bg-pink-100 dark:hover:bg-pink-900 transition flex items-center justify-center"
                  >
                    <MdFavorite size={24} className="text-pink-500" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
