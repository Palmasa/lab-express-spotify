require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

const app = express();
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });

spotifyApi
.clientCredentialsGrant()
.then(data => spotifyApi.setAccessToken(data.body['access_token']))
.catch(error => console.log('Something went wrong when retrieving an access token', error));

// Routes
app.get('/', (req, res, next) => {
  res.render('home')
})

app.get('/artist-search', (req, res, next) => {
  spotifyApi
  .searchArtists(req.query)
  .then(data => {
    console.log('The received data from the API: ', data.body);
    res.render('artist-search-results')
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));
})

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));