import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req) {
  const cookiesInstance = cookies();
  const accessToken = cookiesInstance.get('accessToken')?.value;
  const albumId = await req.json();
  
  if (!accessToken) {
    return NextResponse.json({error: 'Unauthroized token'}, {status: 401});
  }
  if (!albumId) {
    return NextResponse.json({ error: 'albumId not found' }, { status: 400 });
  }
  try {
    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.error('Error fetching tracks from Spotify:', response.statusText);
      return NextResponse.json({ error: 'Error fetching tracks from Spotify' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data.items);
  } catch (err) {
    console.error('Error fetching tracks:', err.message);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
