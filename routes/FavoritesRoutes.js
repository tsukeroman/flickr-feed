const express = require('express');
const debug = require('debug')('app:FavoritesRouter');

const FavoritesRouter = express.Router();

FavoritesRouter.get('/', (req,res) => {
	const list = ['Favorite1', 'Favorite2', 'Favorite3'];
	res.json(list);
	debug('Sent list');
});

module.exports = FavoritesRouter;
