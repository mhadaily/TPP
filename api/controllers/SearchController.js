/**
 * SearchController
 *
 * @description :: Server-side logic for managing searches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const Twitter = require('twitter');
const token = require('../../token');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY || token.consumer_key,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET || token.consumer_secret,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY || token.access_token_key,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || token.access_token_secret
});

module.exports = {
  q(req, res) {
    client.get('search/tweets', {q: req.params.id}, function (error, tweets, response) {
      sails.models.twitter.create({rawData: response.body}).exec((err, record) => {
        if (err) {
          return res.serverError(err);
        }
        sails.log(record.id);
      });
      return res.json(tweets);
    });
  }
};

