var express       = require('express');
var bodyParser    = require('body-parser');
var moment        = require('moment');
var app           = express();
var morgan        = require('morgan');
var path          = require('path');
var jwt           = require('jsonwebtoken');
var http          = require('http');
var formidable    = require('formidable');
var mentorsRoutes = require("./routes/mentors");
var learnerRoutes = require("./routes/learners");
var authRoutes    = require('./routes/auth')
var db            = require('./db/db.js');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var config        = require('./config/config');
// sockets
var socketIo      = require('socket.io');

var server        = http.createServer(app);
var io            = socketIo(server);
var https         = require('spdy');
var LE = require('letsencrypt');
var LEX = require('letsencrypt-express')


// Utilities
require('./config/passport')(passport);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('./'));
// app.use(session({secret: config.sessionSecret,
// 				 saveUninitialized: true,
// 				 resave: true}));

// Routing
app.use('/api', mentorsRoutes);
app.use('/api', learnerRoutes);
app.use('/api', authRoutes);


// Change these two lines!
var DOMAIN = 'getmentor.me';
var EMAIL = 'chadd.d.bennett@gmail.com';

var lex = LEX.create({
  configDir: require('os').homedir() + '/letsencrypt/etc'
, approveRegistration: function (hostname, approve) { // leave `null` to disable automatic registration
    if (hostname === DOMAIN) { // Or check a database or list of allowed domains
      approve(null, {
        domains: [DOMAIN]
      , email: EMAIL
      , agreeTos: true
      });
    }
  },
  letsencrypt: LE.create(
    // options
    { configDir: './letsencrypt/etc'
    , manual: true

    , server: LE.productionServerUrl
    , privkeyPath: LE.privkeyPath
    , fullchainPath: LE.fullchainPath
    , certPath: LE.certPath
    , chainPath: LE.chainPath
    , renewalPath: LE.renewalPath
    , accountsDir: LE.accountsDir

    , debug: false
  }

});

lex.onRequest = app;

lex.listen([80], [443, 3000], function () {
  var protocol = ('requestCert' in this) ? 'https': 'http';
  console.log("Listening at " + protocol + '://localhost:' + this.address().port);
});

http.createServer(LEX.createAcmeResponder(lex, function (req, res) {
  res.setHeader('Location', 'https://' + req.headers.host + req.url);
  res.end('<!-- Hello Mr Developer! Please use HTTPS instead -->');
}));


app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../', 'index.html'));
});


// app.set('port', 3000);
// server.listen(app.get('port'), function() {
//   // db.ensureSchema();
//   console.log(moment().format('h:mm:ss a') + ': Express Server listening on port', app.get('port'));
// });
