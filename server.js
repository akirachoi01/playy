const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Ginagamit ang port mula sa environment o 3000

// Serve ang static files (tulad ng index.html)
app.use(express.static('.'));

// Ang API endpoint para gumawa ng playlist link
app.get('/api/playlist', (req, res) => {
    const baseM3uUrl = 'https://player.reusora.org/ph.m3u';
    const tempToken = Math.random().toString(36).substring(2, 15);
    const playlistUrl = `${baseM3uUrl}?token=${tempToken}`;

    res.json({
        url: playlistUrl,
        filename: 'Aking-Playlist.m3u',
        expiresIn: '5 minutes'
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
