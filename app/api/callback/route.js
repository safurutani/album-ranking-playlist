import { NextResponse } from 'next/server';

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Authorization code not found.' }, { status: 400 });
  }

  const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri,
      client_id: client_id,
      client_secret: client_secret,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenResponse.ok) {
    const accessToken = tokenData.access_token;

    // Redirect to the search page with the access token as a query parameter
    const searchUrl = new URL('/search', request.url);
    searchUrl.searchParams.set('accessToken', accessToken);
    
    return NextResponse.redirect(searchUrl);
  } else {
    return NextResponse.json({ error: tokenData.error || 'Failed to obtain access token.' }, { status: 400 });
  }
}
