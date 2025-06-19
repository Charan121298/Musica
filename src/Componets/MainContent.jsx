import { useState, useEffect, useMemo } from 'react';
import songsDa from "../../data.json";
import {
  MdPlayCircleFilled,
  MdStar,
  MdPerson
} from "react-icons/md";

// Song Card Component
function SongCard({ song, index, onPlay }) {
  // const cover = song[1]["Cover"] || `https://source.unsplash.com/300x300/?music,album&sig=${index}`;
  const cover = `https://placehold.co/600x400.png`;
  return (
    <div
      className="min-w-[160px] max-w-[160px] bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={onPlay}
      role="button"
      tabIndex={0}
      aria-label={`Play ${song[0]} by ${song[1].Artist}`}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg mb-3">
        <img
          src={cover}
          alt={`${song[0]} cover`}
          className="object-cover w-full h-full"
        />
        <MdPlayCircleFilled className="absolute bottom-2 right-2 text-3xl text-custom-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      <h4 className="text-sm font-medium truncate text-gray-900 dark:text-white">{song[0]}</h4>
      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{song[1]["Artist"]}</p>
    </div>
  );
}

// Artist Card Component
function ArtistCard({ song, index, onPlay }) {
  const cover = `https://placehold.co/600x400.png`;
  return (
    <div
      className="min-w-[120px] max-w-[120px] bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={onPlay}
      role="button"
      tabIndex={0}
      aria-label={`Play songs by ${song[1].Artist}`}
    >
      <div className="relative flex justify-center mb-2">
        <img
          src={cover}
          alt={`${song[1]["Artist"]} avatar`}
          className="w-14 h-14 object-cover rounded-full"
        />
        <MdPlayCircleFilled className="absolute bottom-0 right-0 text-xl text-custom-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      <p className="text-xs text-center text-gray-800 dark:text-gray-300 truncate">{song[1]["Artist"]}</p>
    </div>
  );
}

// MainContent Component
export default function MainContent({ toggleSong }) {
  const songs = useMemo(() => Object.entries(songsDa), []);
  const [selectedKey, setSelectedKey] = useState(songs[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setSelectedKey(songs[randomIndex]);
    }, 10000);
    return () => clearInterval(interval);
  }, [songs]);

  const uniqueArtists = useMemo(() => {
    const seen = new Set();
    return songs.filter(([_, song]) => {
      if (seen.has(song.Artist)) return false;
      seen.add(song.Artist);
      return true;
    });
  }, [songs]);

  // const featuredCover = selectedKey[1]["Cover"] || `https://source.unsplash.com/600x400/?concert,music&sig=999`;
  const featuredCover =  `https://placehold.co/600x400.png`;

  return (
    <div className="w-full px-6 py-8 space-y-12 overflow-y-auto bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      
      {/* Featured Banner */}
      <section>
        <div
          className="relative rounded-3xl overflow-hidden shadow-xl min-h-[300px] bg-cover bg-center flex items-end border border-gray-200 dark:border-white/10"
          style={{
            backgroundImage: `url(${featuredCover})`
          }}
        >
          <div className="absolute inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 w-full p-6 text-white space-y-3">
            <div className="flex items-center gap-2">
              <MdStar className="text-yellow-400 text-2xl" />
              <span className="text-2xl font-bold">{selectedKey[0]}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <MdPerson />
              <i>{selectedKey[1]["Artist"]}</i>
            </div>
            <button
              onClick={() =>
                toggleSong(
                  selectedKey[0],
                  selectedKey[1]["Artist"],
                  selectedKey[1]["Link"],
                  selectedKey[1]["Cover"]
                )
              }
              className="inline-flex items-center gap-2 bg-custom-primary hover:bg-custom-secondary text-white text-sm font-semibold px-5 py-2 rounded-full transition"
            >
              <MdPlayCircleFilled className="text-xl" />
              Play Now
            </button>
          </div>
        </div>
      </section>

      {/* New Releases */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">New Releases</h3>
        <div className="flex overflow-x-auto gap-5 pb-2 snap-x snap-mandatory custom-scroll">
          {songs.map((song, index) => (
            <SongCard
              key={index}
              song={song}
              index={index}
              onPlay={() =>
                toggleSong(song[0], song[1]["Artist"], song[1]["Link"], song[1]["Cover"])
              }
            />
          ))}
        </div>
      </section>

      {/* Artists */}
      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Artists You May Like</h3>
        <div className="flex overflow-x-auto gap-4 pb-2 snap-x snap-mandatory custom-scroll">
          {uniqueArtists.map((song, index) => (
            <ArtistCard
              key={index}
              song={song}
              index={index}
              onPlay={() =>
                toggleSong(song[0], song[1]["Artist"], song[1]["Link"], song[1]["Cover"])
              }
            />
          ))}
        </div>
      </section>

      {/* Custom Scrollbar */}
      <style>
        {`
          .custom-scroll {
            scrollbar-width: thin;
            scrollbar-color: rgba(100, 116, 139, 0.5) transparent;
          }
          .custom-scroll::-webkit-scrollbar {
            height: 6px;
          }
          .custom-scroll::-webkit-scrollbar-thumb {
            background-color: rgba(100, 116, 139, 0.5);
            border-radius: 8px;
          }
          .custom-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
        `}
      </style>
    </div>
  );
}
