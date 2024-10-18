export async function GET(request) {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    const accessToken = url.searchParams.get('accessToken');
  
    if (!query || !accessToken) {
      return NextResponse.json({ error: 'Query and accessToken are required.' }, { status: 400 });
    }
  
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
  }
  