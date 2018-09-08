const express = require('express');
const debug = require('debug')('app:AuthenticationRouter');
const { MongoClient } = require('mongodb');
const passport = require('passport');
const AuthenticationRouter = express.Router();

const url = 'mongodb://localhost:27017';
const dbName = 'flickr-feed';
const colName = 'Users'


AuthenticationRouter.post('/Signup', (req,res) => {
	 const { Username, Password } = req.body;
	(async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true });
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = db.collection(colName);
          const user = { Username, Password };
          const results = await col.insertOne(user);
          debug(results);
          req.login(results.ops[0], () => {
            res.redirect('/Auth/Profile');
          });
        } catch (err) {
          debug(err);
        }
      }());
});


AuthenticationRouter.post('/Signin', (passport.authenticate('local', {
      successRedirect: '/Auth/Profile',
      failureRedirect: '/Auth/Fail'
})));



AuthenticationRouter.get('/Logout', (req,res) => {
	req.logout(req.user);
});


AuthenticationRouter.get('/Profile', (req,res) => {
		res.json(req.user);
	}).all((req, res, next) => {
		if(req.user) {
			next();
		} else {
			res.redirect('/Auth/Fail')
		}
	});

AuthenticationRouter.get('/Fail', (req,res) => {
	debug('what a fail !!')
	res.json(false);
});


module.exports = AuthenticationRouter;
