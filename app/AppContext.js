'use client';

import React, {createContext, useContext, useState} from 'react';

const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [albumId, setAlbumId] = useState(null);
    const [artist, setArtist] = useState(null);
    const [albumName, setAlbumName] = useState(null);
    const [albumArt, setAlbumArt] = useState(null);
    const [userId, setUserId] = useState(null);
    return (
        <AppContext.Provider value= {{albumId, setAlbumId, artist, setArtist, albumName, setAlbumName, albumArt, setAlbumArt, userId, setUserId}} >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);