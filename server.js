const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');


const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('tiny'));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Routes to handle API endpoint requests
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