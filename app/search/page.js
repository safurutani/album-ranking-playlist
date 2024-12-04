'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../AppContext';

const SearchContent = () => {
  const router = useRouter();
  const [albums, setAlbums] = useState([]);
  const [query, setQuery] = useState('');
  const {setAlbumId, setAlbumName, setArtist, setAlbumArt} = useAppContext();

  const searchAlbums = async () => {
    try {
      const response = await fetch(`/api/albums?query=${query}`);
      if (response.status === 401) {
        alert("Session Timed Out - Please log in again");
        router.push('/'); // redirect to login page if unauthorized
        return;
      }
      const albumsData = await response.json();
      if (Array.isArray(albumsData)) {
        setAlbums(albumsData);
      } else {
        console.warn('Unexpected response structure:', albumsData);
        setAlbums([]);
      }
    } catch (error) {
      console.error('Error searching albums:', error);
    }
  };
  

  const handleSearch = (e) => {
    e.preventDefault();
    searchAlbums();
  };

  const handleAlbumClick = (albumId, albumName, artist, albumArt) => {
    setAlbumId(albumId);
    setAlbumName(albumName);
    setArtist(artist);
    setAlbumArt(albumArt);
    // Redirect to the tracks page
    router.push(`/tracks`);
  };

  const handleUnauthorized = () => {
    alert("Session Timed Out - Please log in again");
    // Redirect to the login page
    router.push('/');
  };

  return (
    <div className='h-full '>
      <h1 className='text-4xl text-center mt-16'>Search Albums</h1>
      <form onSubmit={handleSearch} className='text-center align-middle'>
        <input
          type="text"
          placeholder="Enter an album"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='my-4 p-2 rounded-lg w-80 focus:outline-none border-2 border-searchOutline text-black'
        />
        <button type="submit" className='rounded-lg ml-4 border-2 border-searchOutline p-2 text-resultText hover:bg-searchHover hover:text-searchTextHover hover:border-searchHover'>Search</button>
      </form>

      <ul className='search-results grid md:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-2 gap-4 content-center max-w-5xl m-auto p-4 text-resultText'>
        {albums.map((album) => (
          <li className='album' key={album.id} onClick={() => handleAlbumClick(album.id, album.name, album.artists[0]?.name, album.images[0]?.url)} style={{ cursor: 'pointer' }}>
            <img src={album.images[0]?.url} alt={album.name} width={300} height={300} />
            <p className='max-w-[160px]'>
              {album.name} ({album.release_date.split('-')[0]}){<br></br>}{album.artists[0]?.name} 
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function SearchPage() {
  return(
      <SearchContent />
  );
};