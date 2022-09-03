const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const authRoute = require('./routes/auth.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
mongoose.connect(process.env.DATABASE_URL, () => console.log('Connected...'));

// Config
app.set('port', process.env.PORT || 5000);
app.use(express.json());

// Middlewares
app.use('/api/user', authRoute);

app.get('/', (req, res) => res.send("check '/api/user' for the user API"));

app.listen(app.get('port'));
