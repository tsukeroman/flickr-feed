const express = require('express');
const debug = require('debug')('app:AuthenticationRouter');

const AuthenticationRouter = express.Router();

AuthenticationRouter.get('/', (req,res) => {
	res.send('GET handler for /Auth route.');
});

AuthenticationRouter.get('/', (req,res) => {
	res.send('POST handler for /Auth route.');
});

module.exports = AuthenticationRouter;
