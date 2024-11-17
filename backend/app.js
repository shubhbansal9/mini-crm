require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const audienceRoutes = require('./routes/audienceRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use('/api/audience', audienceRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/campaigns', campaignRoutes);

module.exports = app;
