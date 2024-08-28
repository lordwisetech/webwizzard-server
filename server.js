const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;
// use cors
app.use(cors());

app.get('/api/videos', async (req, res) => {
  const tag = req.query.tag;
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${tag}&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
