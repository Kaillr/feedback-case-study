import app from './app.js';
import dotenv from 'dotenv';

dotenv.config()

const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL;

app.listen(PORT, () => {
    console.log(`Server running at ${API_URL || `http://localhost:${PORT}`}`);
});