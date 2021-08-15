const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const session = require('express-session')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser');
const pino = require('express-pino-logger');

const mysql = require('mysql');
const async = require('async');

const apiHandler = require('./server/apiHandler');
const dbConfig = require('./server/dbConfig');
const mailerConfig = require('./server/mailerConfig');

const port = process.env.PORT || 5001;
const __env__ = process.env.NODE_ENV;
console.log("__env__ ", __env__)

// enable bodyParser to parse content type of application/json,
// otherwise req.body is {}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// HTTP request logger
app.use(pino());
app.use(methodOverride());
// every user of your API or website will be assigned a unique session,
// allows you to store the user state
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'uwotm8',
  cookie: {
    httpOnly: true, // blocks the ability to use the document.cookie object. This prevents XSS attacks from stealing the session identifier.
    maxAge: 86400000 // expiry time (miliseconds) for variable stored in req.session (e.g. req.session.id)
  },
  name: "hyde.cookie" // change the name of cookie
}));
// Pug (a template engines) replace variables in our file with actual values, 
// and then send the resulting HTML string to the client.
app.set('view engine', 'pug');
// Node app is behind a proxy (like Nginx)
// app.set('trust proxy', 1)

function init() {
  // use: match url starts with specified path
  // "/" match "/api", "/api/get", ...
  app.use('/', apiHandler)
  app.listen(port, () => console.log(`Listening on port ${port}`));

  if (__env__ === 'prod') {
    console.log('====== Production ======')
    console.log(`serving static file from: ${__dirname}/build`)
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'build')));

    // therefore in prod mode, nodejs handle unrecognized (default) GET HTTP requests
    // as React routing, return all requests to React app
    // therefore in dev mode, nodejs can only respond to recognized api
    app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

  } else if (__env__ === 'dev') {
    console.log('====== Development ======')
    console.log('read from .env: RDS_DB_NAME = ', process.env.RDS_DB_NAME);

    app.use(errorHandler())
  }
}

// init();

app.set('connection', mysql.createConnection(dbConfig.rdsClient[__env__]));
const client = app.get('connection');

app.set('url', mailerConfig.mailingUrl[__env__]);

async.series([
  function connect(callback) {
    client.connect(callback);
  },
  function use_db(callback) {
    client.query(`USE ${dbConfig.database[__env__]}`, callback);
  },
], (err, results) => {
  if (err) {
    console.log('Exception connecting database.');
    throw err;
  } else {
    console.log('Database initialization complete.');
    init();
  }
});