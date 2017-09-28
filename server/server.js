// Dependencies require
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var port = 4000;
var app = express();

// cors override // NOT FOR PRODUCTION PURPOSES
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-xsrf-token");
  next();
});

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Body Parser MiddleWare (MW)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes map
app.use('/', index);
app.use('/api', tasks);

// Initializing node listening
app.listen(port, function(){
	console.log('Server started on port ' + port);
});
