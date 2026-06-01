require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pinoLogger = require('./logger');

const connectToDatabase = require('./models/db');

const app = express();
const port = 3060;

// CORRECT CORS
app.use(cors());

app.use(express.json());

// DB connection
connectToDatabase()
  .then(() => {
    pinoLogger.info('Connected to DB');
  })
  .catch((e) => console.error('Failed to connect to DB', e));

// Routes
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');

const pinoHttp = require('pino-http');
const logger = require('./logger');

app.use(pinoHttp({ logger }));

app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);

// Health check
app.get("/", (req, res) => {
    res.send("Inside the server");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});