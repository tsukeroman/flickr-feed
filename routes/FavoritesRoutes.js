const express = require('express');
const debug = require('debug')('app:FavoritesRouter');
const { MongoClient } = require('mongodb');
const FavoritesRouter = express.Router();

let list = [];

const url = 'mongodb://localhost:27017';
const dbName = 'flickr-feed';

(async function getFavorites() {
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    debug('Connected correctly to server');
    const db = client.db(dbName);
    const col = await db.collection('Favorites');
    const Favorites = await col.find().toArray();
    list = Object.keys(Favorites).map(key => {
      return Favorites[key];
    })
  } catch (err) {
    debug(err.stack);
  }
  client.close();
}());

FavoritesRouter.get('/', (req,res) => {
    res.json(list);
    debug('Sent list of favorites');
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
    const ImageURL = `https://farm${Image.farm}.staticflickr.com/${Image.server}/${Image.id}_${Image.secret}.jpg`;
    res.json(ImageURL);
    (async function AddImage() {
        let client;
        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true });
          debug('Connected correctly to server');
          const db = client.db(dbName);
          const col = db.collection('Favorites');
          const Favorites = await col.find().toArray();
          const results = await col.insertOne(Image);
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
  const id = Image.id;
  const ImageURL = `https://farm${Image.farm}.staticflickr.com/${Image.server}/${Image.id}_${Image.secret}.jpg`;
  list = list.filter(image => (image.id !== id));
  res.json(ImageURL);
  (async function RemoveImage() {
        let client;
        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true });
          debug('Connected correctly to server');
          const db = client.db(dbName);
          const col = db.collection('Favorites');
          const Favorites = await col.find().toArray();
          const results = await col.deleteOne({"id": Image.id});
          debug(`Image of id number ${Image.id} was removed from Favorites.`);
        } catch (err) {
          debug(err);
        }
        client.close();
  }());
});

module.exports = FavoritesRouter;
