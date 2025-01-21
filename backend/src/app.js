import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import routes from './routes/index.js'

const app = express();
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://case.mikaelho.land"
    ],
};
const rateLimiter = rateLimit({
    windowMs: 60 * 1000, // 60 second time window
    max: 100, // Max 100 request per time window
});

// Middleware
app.use(cors(corsOptions));
app.use(rateLimiter);
app.use(express.json());

// Use routes
app.use(routes)

export default app;