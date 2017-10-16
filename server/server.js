// Dependencies require
var express = require('express');
var expressJwt = require('express-jwt');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var tasks = require('./routes/tasks');
var users = require('./routes/users');
var auth = require('./routes/auth');

var port = 3000;
var app = express();

// cors override
app.use(cors());

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Body Parser MiddleWare (MW)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
// app.use(expressJwt({
//   secret: 'qwerasdfzxcv',
//   getToken: function (req) {
//     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//       return req.headers.authorization.split(' ')[1];
//     } else if (req.query && req.query.token) {
//       return req.query.token;
//     }
//     return null;
//   }
// }).unless({ path: ['/login', '/register'] }));

// Routes map
app.use('/', index);
app.use('/', auth);
app.use('/api', tasks);
app.use('/api', users);

// Initializing node listening
app.listen(port, function(){
	console.log('*** Server started on port ' + port + ' ***');
});
