const express = require('express');
const axios = require('axios'); // Kailangan nating i-install ang axios
const app = express();
const port = process.env.PORT || 3000;

// Serve ang static files mula sa root directory
app.use(express.static('.'));

// Ang API endpoint para gumawa ng playlist link
app.get('/api/playlist', (req, res) => {
    // I-generate ang temporary token
    const tempToken = Math.random().toString(36).substring(2, 15);
    
    // Ang URL na makikita ng user ay ang iyong server domain
    // Ito ang temporary link na ibibigay sa frontend
    const playlistUrl = `/get-m3u?token=${tempToken}`;

    res.json({
        url: playlistUrl
    });
});

// Ang bagong endpoint na magse-serve ng M3U file
app.get('/get-m3u', async (req, res) => {
    // Kunin ang token mula sa URL query
    const { token } = req.query;

    // TODO: Maglagay ng logic dito para i-validate ang token.
    // Halimbawa: I-check kung ang token ay valid at hindi pa expired.
    // Kung walang token o invalid, magpadala ng error.
    if (!token) {
        return res.status(401).send('Unauthorized: Invalid or missing token.');
    }

    const baseM3uUrl = 'https://player.reusora.org/ph.m3u';
    
    try {
        // I-fetch ang M3U file mula sa original source
        const response = await axios.get(baseM3uUrl);

        // Itakda ang headers para maging M3U file ang response
        res.setHeader('Content-Type', 'audio/x-mpegurl');
        res.setHeader('Content-Disposition', 'inline; filename="playlist.m3u"');

        // Ipadala ang content ng M3U file sa user
        res.send(response.data);

    } catch (error) {
        console.error('Error fetching M3U file:', error);
        res.status(500).send('Error fetching playlist.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
