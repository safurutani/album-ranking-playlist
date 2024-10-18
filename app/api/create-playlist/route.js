export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { accessToken, userId, playlistName } = req.body;

    if (!accessToken || !userId || !playlistName) {
        return res.status(400).json({ message: 'Access token, user ID, and playlist name are required.' });
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: playlistName,
                public: false,
            }),
        });

        if (!response.ok) {
            console.error('Error creating playlist:', response.statusText);
            return res.status(response.status).json({ message: 'Error creating playlist' });
        }

        const playlistData = await response.json();
        return res.status(200).json(playlistData);
    } catch (err) {
        console.error('Error creating playlist:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}
