import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET(req) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
        return NextResponse.json({ error: 'Access token is required.' }, { status: 400 });
    }

    try {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch user profile.' }, { status: response.status });
        }

        const userData = await response.json();
        cookieStore.set('userProfile', userData.id, {
            httpOnly: true,
            secure: true
        });
        return NextResponse.json(userData.id);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}