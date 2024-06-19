import express from 'express';
import axios from 'axios';

const app = express();
const port = 3001;

const API_KEY = 'YOUR_VOYAGER_API_KEY';
const BASE_URL = 'https://api.voyager.online';

app.get('/api/transactions', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/transactions`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching transactions');
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
