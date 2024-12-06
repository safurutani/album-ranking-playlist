# 🎵 Album Track Ranking Web App

This web app allows users to find an album on Spotify, view its tracks, rearrange the order using drag-and-drop, and create a custom Spotify playlist based on their preferred track ranking. It’s built using Next.js and Spotify’s Web API.

## 🚀 Features

- **User Authentication:** Authenticate with your Spotify account through OAuth 2.0 to create custom playlists.
- **Drag-and-Drop Track Reordering:** Easily rearrange the order of tracks from any album.
- **Custom Playlist Creation:** Save your reordered tracks into a new Spotify playlist directly from the app.
- **Download Track Order as an Image:** Download a snapshot of your ordered track list as a `.png` file.

## 🛠️ Built With

- **Frontend:** React, Next.js, Tailwind CSS, dynamic page routing
- **Backend:** Serverless functions for handling API requests
- **API Integration:** Spotify Web API for user authentication and data retrieval
- **State Management:** Utilizes cookies for session management, including access tokens for API requests.
- **Deployment:** Vercel ([Live Demo](https://album-ranking-playlist.vercel.app))

## 🖼️ Screenshots

| Main Interface | Drag-and-Drop Reordering | Custom Playlist Creation |
|:--------------:|:-----------------------:|:------------------------:|
| ![Main Interface](public/screenshots/main-interface.png) | ![Search Albums](public/screenshots/search-albums.png) | ![Reordering](public/screenshots/reordering.png) |
