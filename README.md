# CGI
:wave: CGI! This is my submission for the Code Challenge I received on 7.1.2020.

## Twitterbot

### Assumptions
* User receives most recent tweets associated with IoT
  * According to twitter's api documentation, the rate limit is 15 requests per 15-minute window: https://developer.twitter.com/en/docs/labs/tweet-metrics/api-reference/get-tweets-metrics-v1
* User receives a list of the most recent usernames that tweeted about IoT
* User receives a livestream of real-time tweets about IoT

### Definition of Done
* Twitterbot is started with the command: npm start
* Data from twitter's api are visualized in a JSON-style objects (recent tweets)
* API and token keys are stored securely to prevent security risks

### Tech Stack
* JavaScript
* Node.js
* Express.js
* dotenv
* lodash
* Twitter API


