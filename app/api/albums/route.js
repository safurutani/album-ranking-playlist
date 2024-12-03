import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function GET(request) {
    const cookies = request.cookies;
    const accessToken = cookies.get('accessToken');
  
    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized - no token.' }, { status: 401 });
    }
    /*
    try {
      
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        console.error('Error fetching albums from Spotify:', response.statusText);
        return NextResponse.json({ error: 'Error fetching albums from Spotify' }, { status: response.status });
      }
  
      
      const data = await response.json();
      console.log('Spotify API Response:', data);
      return NextResponse.json(data.albums.items, { status: 200 });
    } catch (err) {
      console.error('Error fetching albums:', err);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
      */
    const response = await fetch(`https://api.spotify.com/v1/albums`, {
      headers: {
        Authorization: `Bearer: ${accessToken}`
      }
      });
      if (!response.ok) {
        return NextResponse.json({error: 'Failed to fetch albums'}, {status: 400});
      }
      const data = await response.json();
      return NextResponse.json(data.albums.items, {status: 200});
  }
  