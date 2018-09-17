# flickr-feed

Flickr-Feed is a web app that simulates a social network, based on Flickr API.
________________________________________

I deployed Flickr-Feed to Heroku, you can visit the app at:
https://flickr-feed-app.herokuapp.com/

The app was developed in Javascript, React for the front-end, Node.js with Express for the back-end and it uses a MongoDB database. Also, it uses the passport.js middleware with a local strategy for authentication.
The client-side uses a proxy to communicate with the server.
The app interacts with a third party API - Flickr's API.
________________________________________

In order to run the app you have to run the following commands in the terminal from the the root folder: 
(I assume that you use linux, or that you run git-bash on windows)

$ npm start   
$ cd client   
$ npm start   

I pushed the app with all the dependencies installed, so it should be enough, but if you are having any problems with running the app, run the following commands from the root folder:

$ npm install   
$ npm start   
$ cd client   
$ npm install   
$ npm start   

*** Notice that the app runs on 3000 and 5000 ports, so you should validate that these ports are not in use *** 
*** Also, very important to note, in order to run the app on your PC, you need to have mongoDB installed and to have it's server running, since the app can't work without a database ***
________________________________________

The app loads with a login main page, where you have an option to sign-in or to sign-up if you don't have an account yet.

In order to sign up you have to pick an username and a password, and after submitting them, you'll get redirected to a page with a list of any kinds of topics, where you'll have to choose at least 5 of them as your interests. After submitting the interests you'll be redirected to the app as a signed in user. 
The app will store your user's session active in a cookie until you'll logout (or manually remove the cookie).

The app has the Feed, Explore, Favorites and Settings areas.

Feed - Here the app will show you the latests pictures from Flickr that match your interests. Wwhen you hover an image with the mouse you'll see an option of Expand - to view the image in a full screen view, and Like, which will save the image to your favorites.

Explore - Here you have a search bar, where you can look for any images you like. Below the search bar you already have some searching value suggestions. Here you have the Expand and Like options too. Also, after looking for some value, you'll have an option to add this value to your interests.

Favorites - Here you can see the collection of the images that you've liked. Here you also have an Expand option, and also you can un-like an image if you don't want to keep it in favorites any more.

Settings - Here you can delete from your interests the topics that don't interest you any more, but keep in mind that you should always have at least 5 interests. 
________________________________________

The app is responsive to sreen size changes, when the screen width is less then 700px, the topbar transforms to a compact form. Also, the search suggestions in Explore re-arrange to a scroll-down menu when the screen width goes under 830px. 

The number of results in Feed and in Explore is not limitted, since it loads at first 100 images, and then when you scroll to the bottom of the page, it loads the next 100 results, and so on.
________________________________________

This is a development version of the app. In order to deploy it, I followed these steps:
- I changed the proxy in package.json from localhost:port to <app-name>.herokuapp.com:port, because now the app runs on a remote host.
- I added "engines" field to server's package.json, so the deployment platform will know what versions of NPM and Node to use.
- I built the client part of the app with "npm run build" in /client directory. By the way, I configured the server to server the app from the /client/build forder.
- I added a Procfile to the root of the app, Heroku needs it.
- I added MLab MongoDB addon to the resources of the app in Heroku, and I've replaced the Mongo URL in all the plcaes I've used it from localhost:27017 to the URI I've got from MLab (there is a documentation about how to get th URI).


