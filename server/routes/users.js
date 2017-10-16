// Dependencies require
var express = require('express');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var User = require('../models/users').User;

/* ************************* MONGOOSE ************************* */
// connection
var collection = 'users';
var uri = 'mongodb://localhost/tasklist';
mongoose.connect(uri, { useMongoClient:true });

var connection = mongoose.connection;

connection.on('error', console.error.bind(console, '*** Connection to MongoDB returned error: '));

connection.once('open', function(){
	console.log('*** Connected to MongoDB on ' + uri + '/'+collection+' ***');
});

mongoose.Promise = global.Promise;
/* ************************************************************ */

// routes
var router = express.Router();
router.get('/users', getUsers);

module.exports = router;


// Get All Users
function getUsers(request, response, next) {

	User.find({}, function(error, users) {
		if (error) {
			response.send(error);
			console.log(error);
		} else {
			response.json(users);
		}
	});
}
