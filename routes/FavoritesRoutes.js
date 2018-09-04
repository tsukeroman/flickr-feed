const express = require('express');
const debug = require('debug')('app:FavoritesRouter');
const { MongoClient } = require('mongodb');
const FavoritesRouter = express.Router();

var list = [];

FavoritesRouter.get('/', (req,res) => {
    res.json(list);
    debug('Sent list of items');
});

FavoritesRouter.post('/Add', (req,res) => {
  let i, flag=0;
	const Image = req.body;
  for(i=0; i<list.length ;i++) {
    if(list[i].id === Image.id) {
      flag = 1;
      break;
    }
  }
  if (flag === 0) {
    list = list.concat(Image);
    const url = `https://farm${Image.farm}.staticflickr.com/${Image.server}/${Image.id}_${Image.secret}.jpg`
    res.json(url);
    debug(`Image of id number ${Image.id} was added to Favorites.`);
  } else {
    res.json('');
  }
});

FavoritesRouter.post('/Remove', (req,res) => {
  const Image = req.body;
  const id = Image.id;
  const result = list.filter(image => (image.id !== id))
  list = result;
  res.json(id);
  debug(`Image of id number ${id} was removed from Favorites.`);
});

module.exports = FavoritesRouter;

/*
const url = 'mongodb://localhost:27017';
const dbName = 'Favorites';
const dbName = 'flickr-feed'

FavoritesRouter.get('/', (req,res) => {
	const { ImageURL } = req.body;
	(async function AddImage() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');
          const db = client.db(dbName);
          const col = db.collection('Favorites');
          const results = await col.insertOne(ImageURL);
          res.json(results);
          debug(results);
        } catch (err) {
          debug(err);
        }

        client.close();
	}());
});*/


