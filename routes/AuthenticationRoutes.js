const express = require('express');
const debug = require('debug')('app:AuthenticationRouter');
const { MongoClient } = require('mongodb');
const passport = require('passport');
const AuthenticationRouter = express.Router();

// The default port of mongo is 27017, and we name the database 'flick-feed'.
// The collection of users' data in 'flickr-feed' is 'Users'.
const url = 'mongodb://localhost:27017';
const dbName = 'flickr-feed';
const colName = 'Users';

// We use a function which concentrates all the routes of AuthenticationRouter
function router() {
	/*
	This route is responsible for the /Auth/Signup route, which creates a user
	with the username and password that are passed within the request.
	*/
	AuthenticationRouter.post('/Signup', (req,res) => {
		const { Username, Password } = req.body;
		/* 
	    We call here an IIFE, a function that excuted immediately when read by the compiler, in order
	    to create an entry for the user in the database. First it checks whether a user with this 
	    username is already exist, if it redirects to /Auth/Fail which returns false to the client,
	    otherwise, it creates the user.
	    */
		(async function addUser() {
	        let client;
	        try {
	          client = await MongoClient.connect(url, { useNewUrlParser: true });
	          debug('Connected correctly to server');

	          const db = client.db(dbName);

	          const col = db.collection(colName);
	          const user = { Username, Password, CompletedReg: false, Interests: [] };
	          debug(`now registered ${user.Username} and his regist is ${user.CompletedReg}.`)
	          const check = await col.findOne({ Username: user.Username });
	          if(check) {
	          	res.redirect('/Auth/Fail');
	          } else {
		          const results = await col.insertOne(user);
		          debug(results);
		          req.login(results.ops[0], () => {
		            res.redirect('/Auth/Profile');
		          });
		      }
	        } catch (err) {
	          debug(err);
	        }
	      }());
	});

	/*
	This route is responsible for the /Auth/Signin route, which authenticates
	the user, and redirects to /Auth/Profile in the case of success, and to
	/Auth/Fail otherwise.
	*/
	AuthenticationRouter.post('/Signin', (passport.authenticate('local', {
	      successRedirect: '/Auth/Profile',
	      failureRedirect: '/Auth/Fail'
	})));

	/*
	This route is responsible for the /Auth/Logout route, which logs out the user.
	*/
	AuthenticationRouter.get('/Logout', (req,res) => {
		req.logout();
		res.redirect('/Auth/Fail');
	});

	/*
	This route is responsible for the /Auth/Profile route, which checks  if 
	the user is authenticated and return it data object in the response, or
	redirects to /Auth/Fail otherwise.
	*/
	AuthenticationRouter.get('/Profile', (req, res, next) => {
		if(req.user) {
			next();
			debug(`the user now is ${req.user.Username}`);
			res.json(req.user); 
		} else {
			res.redirect('/Auth/Fail')
		}
	})

	/*
	This route is responsible for the /Auth/Fail route, which responsible for
	sending false to the client in the response.
	*/
	AuthenticationRouter.get('/Fail', (req,res) => {
		res.json(false);
	});

	/*
	This route is responsible for the /Auth/Complete route, which updates in the database
	that the user completed his sign-up process.
	*/
	AuthenticationRouter.post('/Complete', (req,res) => {
		const { Username, Interests } = req.body;
		(async function complete() {
	        let client;
	        try {
	          client = await MongoClient.connect(url, { useNewUrlParser: true });
	          debug('Connected correctly to server');

	          const db = client.db(dbName);

	          const col = db.collection(colName);

	          const results = await col.updateOne({ Username }, { $set: {Interests, CompletedReg: true}});
	          res.json(results);
	        } catch (err) {
	          debug(err);
	        }
	      }());
	});

	return AuthenticationRouter;
}

module.exports = router;
