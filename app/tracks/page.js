'use client';
import { useState, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import { useRouter } from 'next/navigation';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAppContext } from '../AppContext';
const TracksContent = () => {
  const trackListRef = useRef(null);
  const [tracks, setTracks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [orderedTracks, setOrderedTracks] = useState([]);
  const router = useRouter();

  const [albumId, albumName, artist, albumArt] = useAppContext();

  const loadFont = async () => {
    const font = new FontFace(
      'Fredoka',
      'url(/fonts/Fredoka-Regular.ttf)',
      { style: 'normal', weight: '400' }
    );
  
    font.load()
      .then((loadedFont)=> {
        document.fonts.add(loadedFont);
        console.log('Font loaded successfully:', loadedFont);
      })
      .catch((error) => {
        console.error('Failed to load font:', error);
      });
    
  };

  useEffect(() => {
    if (!albumId) return;
    const fetchTracks = async () => {
      try {
        // Fetch the tracks first
        const response = await fetch(`/api/tracks?albumId=${albumId}`);
        if (!response.ok) {
          console.error('Error fetching tracks:', response.statusText);
          return;
        }
        const tracksData = await response.json();
        console.log('Tracks data:', tracksData);
        setTracks(tracksData);
        
        const userResponse = await fetch(`/api/user-profile`);
        if (!userResponse.ok) {
          console.error('Error fetching user profile:', userResponse.statusText);
          return;
        }
        const userData = await userResponse.json();
        console.log(`User ID: ${userData.id}`);
        setUserId(userData.id);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    loadFont();
    fetchTracks();
  }, [albumId]);

  // Updates order after track is moved
  const handleOnDragEnd = (result) => {
    console.log('Drag Result:', result);
    if (!result.destination) return;

    const reorderedTracks = Array.from(tracks);
    const [removed] = reorderedTracks.splice(result.source.index, 1);
    reorderedTracks.splice(result.destination.index, 0, removed);

    setNewOrderSaved(false);
    setTracks(reorderedTracks);
  };

  const saveOrder = () => {
    const updatedTracks = [...tracks];
    setOrderedTracks(updatedTracks);

    setOrderedTracks(tracks.map((track) => track.id));
    setNewOrderSaved(true);
    console.log('Saving order:', orderedTracks);
  };

  const createPlaylist = async () => {
    // Prevent empty playlist
    if (!newOrderSaved) {
      alert("Please save order before creating the playlist");
      return;
    }

    try {
      const response = await fetch(`/api/create-playlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          playlistName: `My '${albumName}' Ranking`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create playlist');
      }

      const playlistData = await response.json();
      console.log('Playlist created:', playlistData);

      await addTracksToPlaylist(playlistData.id, orderedTracks);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const addTracksToPlaylist = async (playlistId, orderedTracks) => {
    try {
      const response = await fetch(`/api/add-tracks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playlistId: playlistId,
          trackIds: orderedTracks,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add tracks to playlist');
      }

      const data = await response.json();
      console.log('Tracks added to playlist:', data);
    } catch (error) {
      console.error('Error adding tracks to playlist:', error);
    }
  };

  const downloadImg = async () => {
    if (trackListRef.current === null) {
      return;
    }

    toPng(trackListRef.current, { 
      backgroundColor: '#364b45', 
      style: { fontFamily: 'Fredoka, sans-serif' },  
      useCORS: true 
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${albumName} ranking.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.error('Failed to capture track list:', err);
      });
  }

  const backToSearch = () => {
    e.preventDefault();
    router.push(`/search`);
  }

  return (
    <div className='m-auto align-center content-center min-w-96'>
      <div ref={trackListRef} className='h-full font-fredoka'>
        <h1 className='text-center text-4xl mt-16'>{decodeURIComponent(albumName)} - {decodeURIComponent(artist)}</h1>
        <img className='mx-auto my-4' src={albumArt} alt='Album cover art' width={160}></img>
        {tracks.length > 0 ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <ul className='my-8 mx-auto w-6/12 max-w-3xl'{...provided.droppableProps} ref={provided.innerRef}>
                  {tracks.map((track, index) => (
                    <Draggable key={track.id} draggableId={String(track.id)} index={index}>
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: '10px 20px',
                            margin: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            backgroundColor: snapshot.isDragging ? 'var(--accent)' : '#f9f9f9',
                            ...provided.draggableProps.style,
                            userSelect: 'none',
                            color: 'black',
                          }}
                        >
                          {track.name}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <p className='mx-auto'>Loading tracks...</p>
        )}
        <br></br>
        <br></br>
        </div>
        <div className='button-container flex justify-between w-6/12 max-w-3xl mx-auto max-sm:text-center max-sm:flex-col -my-8'>
          <button className='group primary-btns w-10' onClick={downloadImg}>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'viewBox='-2 -1 20 20' className='group-hover:fill-secondary fill-searchOutline'>
              <path d="M15 16H1L1 9H3L3 14H13V9H15L15 16Z" />
              <path d="M12 6L9 6L9 1.74846e-07L7 0V6L4 6L4 7L8 11L12 7L12 6Z"/>
            </svg>
          </button>
          <button className='primary-btns w-32' onClick={saveOrder}>Save Order</button>
          <button className='primary-btns w-32' onClick={createPlaylist}>Create Playlist</button>             
        </div>
        <div className='max-w-3xl m-1 my-8 mx-auto w-6/12 max-sm:text-center'>
          <button className='rounded-full bg-backBg p-2 w-40 hover:bg-gray-200 hover:text-secondary my-3 outline outline-backOutline hover:outline-buttonHoverOutline -outline-offset-2' onClick={backToSearch}>Back to search</button>
        </div>
    </div>
  );
};

export default function TracksPage() {
  return(
      <TracksContent />
  );
};
