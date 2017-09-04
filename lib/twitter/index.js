const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.TOKEN_KEY,
  access_token_secret: process.env.TOKEN_SECRET,
});

module.exports = () =>
  new Promise((resolve, reject) => {
    client.get('search/tweets', { q: '#dsm17' }, (err, tweets, response) => {
      if (err) reject(err);
      return resolve(tweets);
    });
  });
