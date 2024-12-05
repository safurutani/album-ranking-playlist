import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function POST(req) {
    const body = await req.json();
    const { playlistName } = body;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const userId = cookieStore.get('userProfile')?.value;
    if (!accessToken) {
        return NextResponse.json({ error: 'Access token is required.' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                name: playlistName,
                public: false,
            }),
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to create playlist.' }, { status: response.status });
        }

        const playlistData = await response.json();
        return NextResponse.json(playlistData);
    } catch (error) {
        console.error('Error creating playlist:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}