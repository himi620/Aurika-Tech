const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const invoiceRoutes = require('./routes/invoices');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/invoices', invoiceRoutes);

// Connect to MongoDB
connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
