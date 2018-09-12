const express = require('express');
const debug = require('debug')('app:FeedRouter');
const { MongoClient } = require('mongodb');
const passport = require('passport');

const FeedRouter = express.Router();

const url = 'mongodb://localhost:27017';
const dbName = 'flickr-feed';
const colName = 'Users';

FeedRouter.get('/', (req,res) => {
	if(req.user) {
		debug(`HELLO ${req.user.Username} nice to see you!`)
	}
});

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
