export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { albumId, accessToken } = req.query;

    if (!albumId || !accessToken) {
        return res.status(400).json({ message: 'Album ID and access token are required.' });
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            console.error('Error fetching tracks:', response.statusText);
            return res.status(response.status).json({ message: 'Error fetching tracks from Spotify' });
        }

        const data = await response.json();
        return res.status(200).json(data.items);
    } catch (err) {
        console.error('Error fetching tracks:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}
