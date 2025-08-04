const express = require('express');
const path = require('path'); // Kailangan ang 'path' module
const app = express();
const port = process.env.PORT || 3000;

// I-serve ang gen.html kapag in-access ang root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'gen.html'));
});

// Serve ang static files (kung mayroon man, hal. CSS o JS files sa ibang folder)
// Kung wala, hindi na kailangan ang linyang ito.
// Pero para sa iyong kaso, okay lang na iwanan ito.
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
