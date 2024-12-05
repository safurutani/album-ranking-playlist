import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function POST(req) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const body = await req.json(); 
    const { playlistId, trackIds } = body;


    if (!playlistId) {
        return NextResponse.json({ error: 'Playlist id required' }, { status: 400 });
    }
    if (!Array.isArray(trackIds) || trackIds.length === 0) {
        return NextResponse.json({error: 'Invalid track ids'});
    }
    if (!accessToken) {
        return NextResponse.json({error: 'Missing access token'});
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
            return NextResponse.json({ error: 'Failed to add tracks to playlist.', details: errorData }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error adding tracks:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
