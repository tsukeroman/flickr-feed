/*
This file is the app's server. Here we initialize our Express app, which runs the server
and is responisble for fetching data from the database and passing it to the client. The server
has some API endpoint which the client calls and gets back the data from the server.
The server uses passport package for user management (authenthication, authorization,
maintaining the session in a cookie...)
*/

const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'flickrfeed', resave: true, saveUninitialized: true }));

require('./config/passport.js')(app);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Routers to handle API endpoint requests
const AuthenticationRouter = require('./routes/AuthenticationRoutes')();
const FavoritesRouter = require('./routes/FavoritesRoutes')();
const FeedRouter = require('./routes/FeedRoutes');  // without parenthesis because didn't use a function 
													// to concentrate the routes

// Configuring routes for the above routers
app.use('/Favorites', FavoritesRouter);
app.use('/Auth', AuthenticationRouter);
app.use('/Feed', FeedRouter);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Sets the server to listen to the port we initialized above, 
// a success massage appears in the terminal, decorated by chalk
app.listen(port, () => {
	debug(`App is listening on port ${chalk.green(port)}`);
});