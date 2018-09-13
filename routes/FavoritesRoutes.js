const express = require('express');
const debug = require('debug')('app:FavoritesRouter');
const { MongoClient } = require('mongodb');
const passport = require('passport');
const FavoritesRouter = express.Router();


/* 
Instead of waiting for every response of the database, we maintain list, which is an array of the 
images in Favorites, and every time we add/remove image, we do on list and pass a response to the 
client, and then we talk to the database.
It is a kind of optimistic updating, since we can't be sure that the call to the database will
succes, but we earn a great improvement of the performance, since MongoDB is pretty slow.
*/
let list = [];

// The default port of mongo is 27017, and we name the database 'flick-feed'
const url = 'mongodb://localhost:27017';
const dbName = 'flickr-feed';

// We use a function which concentrates all the routes of FavoritesRouter
function router() {
  /* 
  This route is responsible for the /Favorites route, passes the favorites from the database
  to the client
  */
  FavoritesRouter.get('/', (req,res) => {
    let currentUser = req.user.Username;
    debug(`checking what user ${currentUser} of type ${typeof currentUser}`);
     /* 
    We call here an IIFE, a function that excuted immediately when read by the compiler, in order
    to get the favorites from the database.
    */
    (async function getFavorites() {
      let client;
      try {
        client = await MongoClient.connect(url, { useNewUrlParser: true });
        debug('Connected correctly to server');
        const db = client.db(dbName);
        const col = await db.collection('Favorites'+'_'+currentUser);
        const Favorites = await col.find().toArray();
        res.json(Favorites);

        list = Object.keys(Favorites).map(key => {
          return Favorites[key];
        })
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
    debug('Sent list of favorites');
  });

  // This route is responsible for the /Favorites/Add route, addes a new favorite to the database
  FavoritesRouter.post('/Add', (req,res) => {
    let i, flag=0;
  	const Image = req.body; 
    let currentUser = req.user.Username;
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
            const col = db.collection('Favorites'+'_'+currentUser);
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

  // This route is responsible for the /Favorites/Remove route, removes a favorite from the database
  FavoritesRouter.post('/Remove', (req,res) => {
    let currentUser = req.user.Username;
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
            const col = db.collection('Favorites'+'_'+currentUser);
            const Favorites = await col.find().toArray();
            const results = await col.deleteOne({"id": Image.id});
            debug(`Image of id number ${Image.id} was removed from Favorites.`);
          } catch (err) {
            debug(err);
          }
          client.close();
    }());
  });

  return FavoritesRouter;
}

module.exports = router;
