const express = require('express');
const debug = require('debug')('app:FeedRouter');

const FeedRouter = express.Router();

FeedRouter.get('/', (req,res) => {
	res.send('GET handler for /Feed route.');
});

FeedRouter.get('/', (req,res) => {
	res.send('POST handler for /Feed route.');
});

module.exports = FeedRouter;
