import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3001;
app.use(cors());
// const bodyParser = require('body-parser');
// Middleware to parse JSON
app.use(express.json());

// Route to search for albums
app.get('/api/albums', async (req, res) => {
    const { query, accessToken } = req.query;
  
    if (!query || !accessToken) {
      return res.status(400).send('Query and accessToken are required.');
    }
  
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        console.error('Error fetching albums from Spotify:', response.statusText);
        return res.status(response.status).send('Error fetching albums from Spotify');
      }
  
      const data = await response.json();
      console.log('Spotify API Response:', data); // Log the full response data for debugging
      res.json(data.albums.items);
    } catch (err) {
      console.error('Error fetching albums:', err);
      res.status(500).send('Server error');
    }
  });
  

// Route to fetch tracks for a given album
app.get('/api/tracks', async (req, res) => {
  const { albumId, accessToken } = req.query;

  if (!albumId || !accessToken) {
    return res.status(400).send('Album ID and accessToken are required.');
  }

  try {
    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return res.status(response.status).send('Error fetching tracks from Spotify');
    }

    const data = await response.json();
    res.json(data.items);
  } catch (err) {
    console.error('Error fetching tracks:', err);
    res.status(500).send('Server error');
  }
});

// Route to get user profile
app.get('/api/user-profile', async (req, res) => {
    const { accessToken } = req.query;

    if (!accessToken) {
        return res.status(400).send('Access token is required.');
    }

    try {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            console.error('Error fetching user profile from Spotify:', response.statusText);
            return res.status(response.status).send('Error fetching user profile');
        }

        const userData = await response.json();
        res.json(userData); // Return the user data, including userId
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).send('Server error');
    }
});

// Route to create a new playlist
app.post('/api/create-playlist', async (req, res) => {
    const { accessToken, userId, playlistName } = req.body;
  
    if (!accessToken || !userId || !playlistName) {
      return res.status(400).send('Access token, user ID, and playlist name are required.');
    }
  
    try {
      const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playlistName,
          public: false, // You can change this to true if you want the playlist to be public
        }),
      });
  
      if (!response.ok) {
        console.error('Error creating playlist:', response.statusText);
        return res.status(response.status).send('Error creating playlist');
      }
  
      const playlistData = await response.json();
      res.json(playlistData);
    } catch (err) {
      console.error('Error creating playlist:', err);
      res.status(500).send('Server error');
    }
  });

// Route to add tracks to a playlist
app.post('/api/add-tracks', async (req, res) => {
    const { accessToken, playlistId, trackIds } = req.body;

    if (!accessToken || !playlistId || !trackIds) {
    return res.status(400).send('Access token, playlist ID, and track IDs are required.');
    }

    try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        uris: trackIds.map(id => `spotify:track:${id}`), // Format as Spotify track URIs
        }),
    });

    if (!response.ok) {
        console.error('Error adding tracks to playlist:', response.statusText);
        return res.status(response.status).send('Error adding tracks to playlist');
    }

    const data = await response.json();
    res.json(data);
    } catch (err) {
    console.error('Error adding tracks to playlist:', err);
    res.status(500).send('Server error');
    }
});
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
