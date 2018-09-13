const express = require('express');
const debug = require('debug')('app:FeedRouter');
const { MongoClient } = require('mongodb');
const passport = require('passport');

const FeedRouter = express.Router();

// The default port of mongo is 27017, and we name the database 'flick-feed'.
// The collection of users' data in 'flickr-feed' is 'Users'.
const url = 'mongodb://localhost:27017';
const dbName = 'flickr-feed';
const colName = 'Users';

/*
  This route is responsible for the /Feed route, which I used just for debuggins purposes.
*/
FeedRouter.get('/', (req,res) => {
	if(req.user) {
		debug(`HELLO ${req.user.Username} nice to see you!`)
	}
});

/*
  This route is responsible for the /Feed/Interest/:Username route, which get an
  username is a parameter, and retrieves it's object in the response.
  It is imposible that the user doesn't exist in the database, because the app on 
  the fornt-end side calls this endpoint from an area which is accessible only
  for a logged-in user.
*/
FeedRouter.get('/Interests/:Username', (req,res) => {
	const { Username } = req.params;
	(async function complete() {
        let client;
        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true });
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = db.collection(colName);

          const results = await col.findOne({ Username });
          
          res.json(results);
        } catch (err) {
          debug(err);
        }
	}());
})

/*
  This route is responsible for the /Feed/Interests/Add route, which addes a new
  interest to user's interests list in the database. 
*/
FeedRouter.post('/Interests/Add', (req,res) => {
  const { Username, newInterest } = req.body;

  (async function addInterest() {
    let client;
    try {
      client = await MongoClient.connect(url, { useNewUrlParser: true });
      debug('Connected correctly to server');

      const db = client.db(dbName);

      const col = db.collection(colName);

      const user = await col.findOne({ Username });

      if(user.Interests.indexOf(newInterest) === -1) {
        const Interests = user.Interests.concat(newInterest);

        const results = await col.updateOne({ Username }, { $set: { Interests }});
        
        res.json(results);
      } else {
        res.json(false);
      }
    } catch (err) {
      debug(err);
    }
  }());

})

/*
  This route is responsible for the /Feed/Interests/Delete route, which deletes an 
  interest from user's interests list in the database. 
*/
FeedRouter.post('/Interests/Delete', (req,res) => {
  const { Username, Interests } = req.body;

  (async function deleteInterest() {
    let client;
    try {
      client = await MongoClient.connect(url, { useNewUrlParser: true });
      debug('Connected correctly to server');

      const db = client.db(dbName);

      const col = db.collection(colName);

      const results = await col.updateOne({ Username }, { $set: { Interests }});

      res.json(results);
    } catch (err) {
      debug(err);
    }
  }());

})

module.exports = FeedRouter;
