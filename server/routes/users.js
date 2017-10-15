// Dependencies require
var express = require('express');
var mongoose = require('mongoose');

/* ************************* MONGOOSE ************************* */
// connection
var uri = 'mongodb://localhost/tasklist';
mongoose.connect(uri, { useMongoClient:true });

var connection = mongoose.connection;

connection.on('error', console.error.bind(console, '*** Connection to MongoDB returned error: '));

connection.once('open', function(){
	console.log('*** Connected to MongoDB on ' + uri + ' ***');
});

mongoose.Promise = global.Promise;

// schema define
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	password: String
});

// model init
var User = mongoose.model('users', userSchema);
/* ************************************************************ */

// routes
var router = express.Router();

router.get('/users', getUsers);
router.post('/user', saveUser);

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

// Save User
function saveUser(request, response, next) {

	var user = request.body;

	if (!user.username || !user.password) {
		response.status(400);
		response.json({ 'error': 'Bad Data' });
	} else {
		var newUser = new User(user);
		newUser.save( function(error, user) {
			if (error) {
				response.send(error);
				console.log(error);
			} else {
				response.json(user);
			}
		});
	}
}
