const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

/*
  This function is the strategy which the server uses to log-in to the app.
  First it checks whether the user with such username exists, and then whether the password
  that was passed matches the username. 
*/
module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'Username',
    passwordField: 'Password'
  }, (username, password, done) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'flickr-feed';

    (async function mongo() {
      let client;

      try {
        client = await MongoClient.connect(url, { useNewUrlParser: true });

        debug('Connected correctly to server');

        const db = client.db(dbName);
        const col = db.collection('Users');

        const user = await col.findOne({ Username: username });

        if(!user) {
        	done(null, false);
        } else if (user.Password === password) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        console.log(err.stack);
      }

      client.close();
    }());
  }));
};
