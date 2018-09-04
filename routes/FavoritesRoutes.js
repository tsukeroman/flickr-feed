const express = require('express');
const debug = require('debug')('app:FavoritesRouter');
const { MongoClient } = require('mongodb');
const FavoritesRouter = express.Router();

let list = [];

const url = 'mongodb://localhost:27017';
const dbName = 'flickr-feed';

FavoritesRouter.get('/', (req,res) => {
    (async function getFavorites() {
      let client;
      try {
        client = await MongoClient.connect(url, { useNewUrlParser: true });
        debug('Connected correctly to server');
        const db = client.db(dbName);
        const col = await db.collection('Favorites');
        const Favorites = await col.find().toArray();
        res.json(Favorites);
        debug('Sent list of favorites');
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
});


FavoritesRouter.post('/Add', (req,res) => {
  let i, flag=0;
	const Image = req.body;
  
  if (flag === 0) {
    const ImageURL = `https://farm${Image.farm}.staticflickr.com/${Image.server}/${Image.id}_${Image.secret}.jpg`;
    (async function AddImage() {
        let client;
        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true });
          debug('Connected correctly to server');
          const db = client.db(dbName);
          const col = db.collection('Favorites');
          const results = await col.insertOne(Image);
          res.json(ImageURL);
          debug(`Image of id number ${Image.id} was added to Favorites.`);
        } catch (err) {
          debug(err);
        }
        client.close();
    }());
  } else {
    res.json('');
  }
});

FavoritesRouter.post('/Remove', (req,res) => {
  const Image = req.body;
  const ImageURL = `https://farm${Image.farm}.staticflickr.com/${Image.server}/${Image.id}_${Image.secret}.jpg`;
  (async function RemoveImage() {
        let client;
        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true });
          debug('Connected correctly to server');
          const db = client.db(dbName);
          const col = db.collection('Favorites');
          const results = await col.deleteOne({"id": Image.id});
          res.json(ImageURL);
          debug(`Image of id number ${Image.id} was removed from Favorites.`);
        } catch (err) {
          debug(err);
        }
        client.close();
  }());
});

module.exports = FavoritesRouter;
