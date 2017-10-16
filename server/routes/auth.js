// Dependencies require
var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var User = require('../models/users').User;

/* ************************* MONGOOSE ************************* */
connection
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
router.post('/register', register);
router.post('/login', login);

module.exports = router;


// user register
function register(request, response, next) {

	var user = request.body;

	if (user.username != '' && user.password != '') {

		User.findOne({ 'username': user.username }, function(error, requestedUser) {
			if (error) {
				response.send(error);
				console.log(error);
			} else {
				if (requestedUser) {
					response.status(400);
					response.json({ 'error': 'username already exist' });
				} else {

					let entryUser = user;

					entryUser.password = bcrypt.hashSync(user.password, 10);

					let newUser = new User(entryUser);

					newUser.save(function(err, insertedUser) {
						if (err) {
							response.send(err);
							console.log(err);
						} else {
							response.json(insertedUser);
						}
					});
				}
			}
		});
	} else {
		response.status(400);
		response.json({ 'error': 'username or password cannot be empty' });
	}
}

// user authorize
function login(request, response, next) {

	var user = request.body;

	if (user.username != '' && user.password != '') {

		User.findOne({ 'username': user.username }, function (error, requestedUser) {
			if (error) {
				response.send(error);
				console.log(error);
			} else {
				if (requestedUser && bcrypt.compareSync(user.password, requestedUser.password)) {
					response.json({
						username: requestedUser.username,
						token: jwt.sign({ sub: requestedUser._id }, 'qwerasdfzxcv')
					});
				} else {
					response.status(400);
					response.json({ 'error': 'user not found' });
				}
			}
		});
	} else {
		response.status(400);
		response.json({ 'error': 'username or password cannot be empty' });
	}
}
