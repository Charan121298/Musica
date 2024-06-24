import mysql from 'mysql';
import fs from 'fs';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Gadhavi@123',
  database: 'music'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to the MySQL database');

  const query = 'SELECT Title, path FROM musica'; // Adjust query to select desired columns

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      return;
    }
    
    const jsonData = {};
    result.forEach(row => {
      // Assuming the first column is the key and the second column is the value
      jsonData[row.Title] = row.path;
    });
console.log(jsonData)
    fs.writeFile('data.json', JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error('Error writing data to file:', err);
        return;
      }
      console.log('Data written to file successfully');
    });
  });
});
