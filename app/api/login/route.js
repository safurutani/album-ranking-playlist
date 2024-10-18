import { NextResponse } from 'next/server';

export async function GET() {
  const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
  const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;

  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(
    scope
  )}&redirect_uri=${encodeURIComponent(redirect_uri)}`;

  return NextResponse.redirect(authUrl);
}
