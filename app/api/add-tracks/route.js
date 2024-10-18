export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { accessToken, playlistId, trackIds } = req.body;

    if (!accessToken || !playlistId || !trackIds) {
        return res.status(400).json({ message: 'Access token, playlist ID, and track IDs are required.' });
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uris: trackIds.map(id => `spotify:track:${id}`),
            }),
        });

        if (!response.ok) {
            console.error('Error adding tracks to playlist:', response.statusText);
            return res.status(response.status).json({ message: 'Error adding tracks to playlist' });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (err) {
        console.error('Error adding tracks to playlist:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}
