import { useState, useEffect } from 'react';

const MusicList = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Read JSON data from file
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        // Convert JSON object to array of key-value pairs
        const songsArray = Object.entries(data);
        setSongs(songsArray);
      })
      .catch(error => console.error('Error reading data:', error));
  }, []);

  return (
    <div>
      <h2>Music List</h2>
      <ul>
        {songs.map(([title, path]) => (
          <li key={title}>
            <a href={path}>{title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicList;
