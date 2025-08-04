const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve ang static files mula sa root directory.
// Kasama na rito ang gen.html file mo.
app.use(express.static('.'));

// I-redirect ang root URL sa gen.html
app.get('/', (req, res) => {
    res.redirect('/gen.html');
});

// Ang API endpoint para gumawa ng playlist link
app.get('/api/playlist', (req, res) => {
    // Ang M3U link na ibinigay mo
    const baseM3uUrl = 'https://player.reusora.org/ph.m3u';
    
    // Simpleng pag-generate ng token para sa temporary link
    const tempToken = Math.random().toString(36).substring(2, 15);
    
    // Ang final URL na may kasamang temporary token
    const playlistUrl = `${baseM3uUrl}?token=${tempToken}`;

    // Magpadala ng JSON response sa frontend
    res.json({
        url: playlistUrl,
        filename: 'Aking-Playlist.m3u',
        expiresIn: '5 minutes'
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
