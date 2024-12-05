'use client';

import React, {createContext, useContext, useState} from 'react';

const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [albumId, setAlbumId] = useState("");
    const [artist, setArtist] = useState("");
    const [albumName, setAlbumName] = useState("");
    const [albumArt, setAlbumArt] = useState("");
    const [userId, setUserId] = useState("");
    return (
        <AppContext.Provider value= {{albumId, setAlbumId, artist, setArtist, albumName, setAlbumName, albumArt, setAlbumArt, userId, setUserId}} >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);