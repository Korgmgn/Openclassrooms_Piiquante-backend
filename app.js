const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const helmet = require('helmet');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://${process.env.mongoId}:${process.env.mongoMdp}@cluster0.ncmib.mongodb.net/${process.env.mongoDbName}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

app.disable('x-powered-by');

module.exports = app;