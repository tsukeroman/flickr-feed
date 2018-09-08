const express = require('express');
const debug = require('debug')('app:FeedRouter');
const passport = require('passport');

const FeedRouter = express.Router();

FeedRouter.get('/', (req,res) => {
	if(req.user) {
		debug(`HELLO ${req.user.Username} nice to see you!`)
	}
});


module.exports = FeedRouter;
