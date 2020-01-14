const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const _ = require('lodash');

require('dotenv').config()

//console.log(process.env);

const app = express();
//app.listen(8080);

const Twitter = require('twitter');

const client = new Twitter ({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


// We are searching for tweets/posts about IoT
// We are receiving a list of screen names from users that tweeted about IoT
client.get('search/tweets', {q: 'IoT'}, function(error, tweets, response) {
  console.log('Here are the most recent tweets on IoT:', tweets);
  _.forEach(tweets.statuses, (a) => {
    console.log('Here is a list of the recent users that tweeted about IoT:', a.user.screen_name);

  })
});

// We are receiving real-time/livestream of tweets about IoT
client.stream('statuses/filter', {track: 'IoT'},  function(stream) {
  stream.on('data', function(tweet) {
    console.log('Here is the livestream/real-time tweets on IoT:', tweet.text);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
