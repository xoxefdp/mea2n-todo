// Dependencies require
var mongoose = require('mongoose');

// schema define
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	password: String
});

// model init
var User = mongoose.model('users', userSchema);

module.exports = {
	User: User
}
