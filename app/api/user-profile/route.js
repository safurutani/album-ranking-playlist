export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { accessToken } = req.query;

    if (!accessToken) {
        return res.status(400).json({ message: 'Access token is required.' });
    }

    try {
        // Fetch user's profile data from the Spotify API
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            console.error('Error fetching user profile:', response.statusText);
            return res.status(response.status).json({ message: 'Error fetching user profile from Spotify' });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}
