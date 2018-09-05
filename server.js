/*
This file is the app's server. Here we initialize our Express app, which runs the server
and is responisble for fetching data from the database and passing it to the client. The server
has some API endpoint which the client calls and gets back the data from the server.
*/

const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Routers and routes to handle API endpoint requests
const FavoritesRouter = require('./routes/FavoritesRoutes');
const AuthenticationRouter = require('./routes/AuthenticationRoutes');
const FeedRouter = require('./routes/FeedRoutes');

app.use('/Favorites', FavoritesRouter);
app.use('/Auth', AuthenticationRouter);
app.use('/Feed', FeedRouter);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
	debug(`App is listening on port ${chalk.green(port)}`);
});