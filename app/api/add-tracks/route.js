import { NextResponse } from 'next/server';

export async function POST(req) {
    
    const body = await req.json(); 
    const { accessToken, playlistId, trackIds } = body;

    if (!accessToken || !playlistId || !Array.isArray(trackIds) || trackIds.length === 0) {
        return NextResponse.json({ error: 'Access token, playlistId, and an array of trackIds are required.' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                uris: trackIds.map(trackId => `spotify:track:${trackId}`),
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error adding tracks to playlist:', errorData);
            return NextResponse.json({ error: 'Failed to add tracks to playlist.', details: errorData }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error adding tracks:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
