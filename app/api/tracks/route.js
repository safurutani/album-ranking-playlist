import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const albumId = searchParams.get('albumId');
  const accessToken = searchParams.get('accessToken');

  if (!albumId || !accessToken) {
    console.error('Album ID or accessToken is missing');
    return NextResponse.json({ error: 'Album ID and accessToken are required.' }, { status: 400 });
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
