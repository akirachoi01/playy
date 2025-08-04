const express = require('express');
const path = require('path');
const axios = require('axios'); // Kailangan nating i-install ang axios
const app = express();
const port = process.env.PORT || 3000;

// I-serve ang gen.html kapag in-access ang root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'gen.html'));
});

// Serve ang static files (kung mayroon man, hal. CSS o JS files sa ibang folder)
app.use(express.static('.'));

// Ang API endpoint para gumawa ng playlist link.
// Ang URL na ibabalik ay gagamit ng bagong endpoint ng server.
app.get('/api/playlist', (req, res) => {
    const tempToken = Math.random().toString(36).substring(2, 15);
    // Ang URL na makikita ng user ay magiging '/get-m3u?token=...'
    const playlistUrl = `/get-m3u?token=${tempToken}`;

    res.json({
        url: playlistUrl
    });
});

// Ang bagong endpoint na magse-serve ng M3U file mula sa external source
app.get('/get-m3u', async (req, res) => {
    // Ang base M3U URL ay nakatago na sa backend.
    const baseM3uUrl = 'https://playy.onrender.com/ph.m3u';
    
    // TODO: Dito ka maaaring magdagdag ng validation logic para sa token
    // Example: const { token } = req.query;
    // if (!isValidToken(token)) { return res.status(401).send('Unauthorized'); }

    try {
        // I-fetch ang content ng M3U file gamit ang axios
        const response = await axios.get(baseM3uUrl);

        // Itakda ang headers para malaman ng browser na ito ay isang M3U file
        res.setHeader('Content-Type', 'audio/x-mpegurl');
        res.setHeader('Content-Disposition', 'inline; filename="playlist.m3u"');

        // Ibalik ang content ng M3U file sa user
        res.send(response.data);

    } catch (error) {
        console.error('Error fetching M3U file:', error);
        res.status(500).send('Error fetching playlist.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
