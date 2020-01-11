var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const config = require('./config');

var app = express();
app.listen(8080);

var Twitter = require('twitter');
var client = new Twitter({
  consumer_key:         'uLPRH2Te3U08BLhrikVxZ0pWs',
  consumer_secret:      'nYcpPeyTAhKCojIFApnwHH27iH9jP9fbCvypCz07puZPsP5qEf',
  access_token_key:         '1215302417761415170-2Jj0jHJMYFSbGFbR3C4rAuipFVzKnV',
  access_token_secret:  'iQNNdLCbua57N8nyXKpx30o0VUGBRtnXHWYivaEzFW9GG',
  // auth = twitter.oauth.OAuth(access_token, access_token_secret, consumer_key, consumer_secret)
});

client.get('search/tweets', {q: 'iot'}, function(error, tweets, response) {
  console.log(tweets);
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